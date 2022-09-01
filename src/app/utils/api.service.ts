import {
  handleRequestFailure,
  handleResponseSuccess,
  handleResponseFailure
} from './../helpers/setupInterceptor';
import { handleRequestSuccess } from 'app/helpers/setupInterceptor';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { Dispatch } from 'redux';
import store from 'app/components/core/redux/createAppStore';

const { dispatch } = store;

export interface ServiceSingletonInstance extends AxiosInstance {
  setupAxiosInterceptors?: <T = any>(
    interceptors?: InterceptorsInstance<T>
  ) => void;
}

export interface InterceptorsInstance<T = any> {
  request: {
    success?: (
      value: AxiosRequestConfig & T
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    failure?: (error: AxiosError) => Promise<Error>;
  };
  response: {
    success?: (
      value: AxiosResponse & T
    ) => AxiosResponse | Promise<AxiosResponse>;
    failure?: (error: AxiosError) => Promise<Error>;
  };
}

export class ServiceSingleton {
  public static instance: ServiceSingletonInstance;
  public static dispatch: Dispatch<any> = dispatch;
  private static interceptorsRequestNumber: number;
  private static interceptorsResponseNumber: number;

  private constructor() {}

  public static getInstance(): ServiceSingletonInstance {
    if (ServiceSingleton.instance) return ServiceSingleton.instance;

    ServiceSingleton.instance = axios.create({
      withCredentials: true
    });

    ServiceSingleton.instance.setupAxiosInterceptors =
      ServiceSingleton.setupAxiosInterceptors;

    ServiceSingleton.setupAxiosInterceptors();

    return ServiceSingleton.instance;
  }

  private static setupAxiosInterceptors(interceptors?: InterceptorsInstance) {
    if (interceptors) {
      ServiceSingleton.instance.interceptors.request.eject(
        ServiceSingleton.interceptorsRequestNumber
      );
      ServiceSingleton.instance.interceptors.response.eject(
        ServiceSingleton.interceptorsResponseNumber
      );

      (
        ServiceSingleton.instance.interceptors.request as MagicKeyValue
      ).handlers = [];
      (
        ServiceSingleton.instance.interceptors.response as MagicKeyValue
      ).handlers = [];

      ServiceSingleton.interceptorsRequestNumber =
        ServiceSingleton.instance.interceptors.request.use(
          interceptors.request.success?.bind(ServiceSingleton),
          interceptors.request.failure
        );
      ServiceSingleton.interceptorsResponseNumber =
        ServiceSingleton.instance.interceptors.response.use(
          interceptors.response.success,
          interceptors.response.failure
        );

      return;
    }

    ServiceSingleton.interceptorsRequestNumber =
      ServiceSingleton.instance.interceptors.request.use(
        handleRequestSuccess.bind(this),
        handleRequestFailure
      );

    ServiceSingleton.interceptorsResponseNumber =
      ServiceSingleton.instance.interceptors.response.use(
        handleResponseSuccess,
        handleResponseFailure
      );
  }
}

export type ServiceSingletonType = typeof ServiceSingleton;

export const apiService = ServiceSingleton.getInstance();
