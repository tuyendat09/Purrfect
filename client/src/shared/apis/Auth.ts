const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

import { APIResponseType } from "./../types/APIResponseType";
import {
  ParamsRegister,
  ParamsVerifyOTP,
  ParamsLogin,
  LoginResponse,
  ParamsChangeUsername,
} from "../types/AuthAPI";

import { createRequest } from "../utils/httpRequestBuilder";
import { GetUserResponse } from "../types/User";
import { withAuthRetry } from "../utils/withAuthRetry";

export const login = async (data: ParamsLogin): Promise<LoginResponse> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/login")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(data)
      .send<LoginResponse>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const register = async (
  params: ParamsRegister
): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/register")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(params)
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const verifyOTP = async (
  params: ParamsVerifyOTP
): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/verifyOTP")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(params)
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const getUser = async (): Promise<GetUserResponse> => {
  return withAuthRetry(() =>
    createRequest(DOMAIN_API)
      .setPath("/api/auth/")
      .setMethod("GET")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(null)
      .send<GetUserResponse>()
  );
};

export const refreshToken = async (): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/refresh-token")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(null)
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const logout = async (): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/logout")
      .setMethod("POST")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(null)
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

export const changeUsername = async (
  params: ParamsChangeUsername
): Promise<APIResponseType> => {
  return withAuthRetry(() =>
    createRequest(DOMAIN_API)
      .setPath("/api/auth/changeUserName")
      .setMethod("PUT")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(params)
      .send<APIResponseType>()
  );
};
