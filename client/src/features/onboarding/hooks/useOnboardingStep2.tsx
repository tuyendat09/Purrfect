import { verifyOTP } from "@/shared/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useOnboardingStepContext } from "../context/OnboardingStepContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useOnboardingStep2() {
  const router = useRouter();

  const { email } = useOnboardingStepContext();
  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
  });

  const formik = useFormik({
    initialValues: {
      otp: 0,
    },
    onSubmit: async (values) => {
      const { otp } = values;
      const promise = mutation.mutateAsync({ email: email, OTP: otp });

      await toast.promise(promise, {
        loading: "Đang đăng ký...",
        success: "Đăng ký thành công chuẩn bị quay về trang chủ!",
        error: (err) => err.message || "Đăng ký thất bại",
      });

      return promise;
    },
    validate: (values) => {
      const errors: Partial<errorsValues> = {};
      console.log(values);

      return errors;
    },
  });

  return {
    formik,
  };
}
