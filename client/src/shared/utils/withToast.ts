import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const withToast = <T>(promise: Promise<T>) =>
  toast.promise(promise, {
    loading: "Đang xử lý...",
    success: (data) => (data as any).message || "Thành công!",
    error: (err) => err.message || "Lỗi xảy ra!",
  });
