const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

import {
  ParamsRegister,
  ParamsVerifyOTP,
  RegisterResponse,
  ParamsLogin,
} from "../types/AuthAPI";
import { createRequest } from "../utils/httpRequestBuilder";

export const login = async (data: ParamsLogin): Promise<RegisterResponse> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/login")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(data)
      .send<RegisterResponse>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const register = async (
  params: ParamsRegister
): Promise<RegisterResponse> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/register")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(params)
      .send<RegisterResponse>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const verifyOTP = async (
  params: ParamsVerifyOTP
): Promise<RegisterResponse> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/verifyOTP")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(params)
      .send<RegisterResponse>();
      
    return response;

  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};
