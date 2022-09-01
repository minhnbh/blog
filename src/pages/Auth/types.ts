export interface IAuthState {
  loading: boolean;
  authUser: IAuthUser | null;
  updateProfile: IUpdateProfileState;
  changePassword: IChangePasswordState;
}

export interface ISignInPayload {
  data: IAuthUser;
}

export interface ISignInArgs {
  phoneNumber: string;
  password: string;
}

export interface IAuthUser {
  _id?: string;
  address?: {
    city?: string | null;
    detail?: string | null;
  };
  totalsView?: number;
  totalsViewDetail?: number;
  fullName?: string;
  gender?: 'male' | 'female';
  birthday?: string;
  phoneNumber?: string;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
  statusMessage?: string | null;
  role?: string[];
  about?: string;
  totalsRating?: number;
  totalsSim?: number;
  totalsPrice?: number;
  refUser?: string;
}

export interface IGetProfilePayload {
  data: IAuthUser;
}

export interface IUpdateProfileState {
  loading: boolean;
  data: IUpdateProfileData;
}

export interface IUpdateProfileData {
  fullName?: string;
  birthday?: string;
  email?: string;
  about?: string;
  website?: string;
}

export interface IUpdateProfileArgs {
  data: FormData;
}

export interface IChangePasswordState {
  loading: boolean;
  data: IChangePasswordData;
}

export interface IChangePasswordData {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface IChangePasswordArgs extends IChangePasswordData {}
