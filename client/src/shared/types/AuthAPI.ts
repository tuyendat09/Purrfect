export interface ParamsRegister {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
export interface ParamsVerifyOTP {
  email: string;
  OTP: number;
}
