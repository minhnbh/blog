import { AppState } from './../../storeConfigs';
import { AxiosError } from 'axios';

declare global {
  interface RootState extends AppState { }

  interface Window {
    appConfig: AppConfiguration;
  }

  interface MagicKeyValue {
    [ky: string]: any;
  }

  interface RefDataValue {
    id: number;
    value?: string;
    description?: string;
    show?: boolean;
  }

  type RejectValue = {
    errorMessage?: string;
    response?: Partial<AxiosError>;
    others?: any;
  };

  type ThunkAPIConfig = {
    rejectValue: RejectValue;
    state: RootState;
  };

  interface AppConfiguration {
    api: {
      common: {
        getCities: string;
      };
      auth: {
        signIn: string;
        getProfile: string;
        updateProfile: string;
        changePassword: string;
      };
      sim: {
        searchSim: string;
        getMySim: string;
        saveSims: string;
        approveSim: string;
        hideSim: string;
        rejectSim: string;
      };
      user: {
        getBuyerList: string;
        getSellerList: string;
        getAdminList: string;
        addAdmin: string;
        updateAdmin: string;
        upgrade: string;
        deactivateBuyer: string;
        deactivateSeller: string;
        deactivateAdmin: string;
      };
      order: {
        getOrderList: string;
        finishOrder: string;
        cancelOrder: string;
      };
      news: {
        getNews: string;
        addNews: string;
        updateNews: string;
        deleteNews: string;
      };
      ads: {
        getAdsList: string;
        addAds: string;
        updateAds: string;
        deleteAds: string;
      };
      collaborator: {
        getGroups: string;
        saveGroup: string;
        updateGroup: string;
        getGroupById: string;
        getCollaboratorsByGroup: string;
        deleteCollaborator: string;
      };
      dashboard: {
        getTotalView: string;
        getSimStatistics: string;
      };
      notification: {
        getNotifications: string;
        pushNotification: string;
      };
      discount: {
        getMyDiscount: string;
        saveRangeDiscount: string;
        saveAllDiscount: string;
      };
      userExchange: {
        getContacts: string;
        approve: string;
        reject: string;
      };
      appVersion: {
        getAndroidAppVersion: string;
        getIosAppVersion: string;
        saveAndroidAppVersion: string;
        saveIosAppVersion: string;
      };
      feedback: {
        getFeedbacks: string;
        removeFeedback: string;
      },
      bankAccount: {
        getBankAccounts: string;
        getBankAccountOrders: string;
        removeBankAccount: string;
        updateBankAccount: string;
      }
    };
  }

  interface HttpResponseSuccess {
    success: true;
  }

  interface HttpResponseError { }

  type HttpResponse = HttpResponseSuccess | HttpResponseError;

  type IFormName<T> = {
    [ky in keyof T]: {
      name: string;
      label?: string;
      placeholder?: string;
    };
  };

  interface FormError {
    status: boolean;
    message: string;
  }

  type AppThunk<T = void> = ActionCreator<AppThunkAction<T>>;

  interface PaginationData {
    page?: number;
    totalPages?: number;
    totalItems?: number;
    totalDocs?: number;
  }

  interface IGetDataArgs {
    limit?: number;
    page?: number;
    createdAt?: number;
  }

  interface IPlace {
    code: number;
    name: string;
  }

  interface ICity extends IPlace {
    districts: IDistrict[];
  }

  interface IDistrict extends IPlace {
    wards: IWard[];
  }

  interface IWard extends IPlace { }
}
