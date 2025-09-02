import { PublicUser } from "./User";

export interface ParamsRegister {
  email: string;
  userFullname: string;
  password: string;
}

export interface ParamsVerifyOTP {
  email: string;
  OTP: number;
}

export interface ParamsLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: PublicUser;
}
