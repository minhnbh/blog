import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeAuthUser,
  removeRefreshToken,
  setAccessToken
} from './../../pages/Auth/helpers';
import { apiService, ServiceSingletonType } from 'app/utils/api.service';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const isGettingRefData = (url: string) => {
  return /refData/i.test(url);
};

export const handleResponseSuccess = (
  response: AxiosResponse
): Promise<AxiosResponse> => {
  return Promise.resolve(response);
};

export const handleResponseFailure = async (
  error: AxiosError
): Promise<AxiosError | AxiosRequestConfig | any> => {
  if (error.response?.status !== 401) return Promise.reject(error);
  const originalConfig = error.config;
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('');
    const { data } = await apiService.post(
      `${process.env.REACT_APP_API}users/me/accessToken`,
      null,
      {
        headers: {
          ...error.config.headers,
          Authorization: `TEA ${refreshToken}`
        }
      }
    );
    setAccessToken(data.data.accessToken);
    return Promise.resolve(originalConfig);
  } catch (error) {
    removeAuthUser();
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/';
  }
};

export const getCurrentToken: AppThunk<string> = () => () => {
  const token = getAccessToken();
  return `TEA ${token || ''}`;
};

export function handleRequestSuccess(
  this: ServiceSingletonType,
  config: any
): Promise<AxiosRequestConfig> {
  const {
    url = '',
    headers: { Authorization: existingAuthorization }
  } = config;
  if (isGettingRefData(url)) {
    config.baseURL = process.env.PUBLIC_URL || '/';
  } else {
    config.baseURL = process.env.REACT_APP_API;
  }

  return Promise.resolve({
    ...config,
    headers: {
      ...config.headers,
      Authorization:
        existingAuthorization ||
        this.dispatch<ReturnType<any>>(getCurrentToken())
    }
  });
}

export const handleRequestFailure = (error: AxiosError): Promise<Error> => {
  return Promise.reject(error.request);
};
