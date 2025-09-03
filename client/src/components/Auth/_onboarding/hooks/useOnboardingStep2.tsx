import { verifyOTP } from "@/shared/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useOnboardingStepContext } from "../context/OnboardingStepContext";
import { toast } from "react-hot-toast";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useOnboardingStep2() {
  const { setStep } = useOnboardingStepContext();

  const { email } = useOnboardingStepContext();
  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      setTimeout(() => {
        setStep(3);
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
        loading: "Hold on",
        success: "Just one more step!.",
        error: (err) => err.message,
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
