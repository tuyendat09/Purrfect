const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

import { APIResponseType } from "./../types/APIResponseType";
import {
  ParamsRegister,
  ParamsVerifyOTP,
  ParamsLogin,
  LoginResponse,
} from "../types/AuthAPI";

import { createRequest } from "../utils/httpRequestBuilder";
import { PublicUser } from "../types/User";

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

export const getUser = async (): Promise<PublicUser> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/auth/")
      .setMethod("GET")
      .setHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .setBody(null)
      .send<PublicUser>();

    return response;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};
