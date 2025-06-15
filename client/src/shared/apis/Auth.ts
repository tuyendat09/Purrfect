const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

import { ParamsRegister, ParamsVerifyOTP, RegisterResponse } from "../types/AuthAPI";

export const register = async (
  params: ParamsRegister
): Promise<RegisterResponse> => {
  const response = await fetch(`${DOMAIN_API}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "Something wrong :(";
    throw new Error(errorMessage);
  }

  return response.json();
};

export const verifyOTP = async (
  params: ParamsVerifyOTP
): Promise<RegisterResponse> => {
  const response = await fetch(`${DOMAIN_API}/api/auth/verifyOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "Something wrong :(";
    throw new Error(errorMessage);
  }

  return response.json();
};
