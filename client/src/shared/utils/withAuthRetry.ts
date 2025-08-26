/* eslint-disable @typescript-eslint/no-explicit-any */
import { refreshToken } from "../apis/Auth";

/**
 * Wrap một API call để tự refresh token khi gặp lỗi 401
 */
export const withAuthRetry = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    if (error?.status === 401) {
      try {
        await refreshToken();

        return await apiCall();
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);
        throw refreshError;
      }
    }

    throw error;
  }
};
