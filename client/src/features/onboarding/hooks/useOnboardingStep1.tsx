import { register } from "@/shared/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useOnboardingStepContext } from "../context/OnboardingStepContext";
import { toast } from "react-hot-toast";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useOnboardingStep1() {
  const { setStep, setEmail } = useOnboardingStepContext();
  const [isButtonHidden, setIsButtonHidden] = useState<boolean>(false);
  const [isFormHidden, setIsFormHidden] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setIsButtonHidden(true);

      setTimeout(() => {
        setIsFormHidden(true);
      }, 300);

      setTimeout(() => {
        setEmail(formik.values.email);
        setStep(2);
      }, 2000);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const promise = mutation.mutateAsync(values);

      await toast.promise(promise, {
        loading: "Đang đăng ký...",
        success: "Đăng ký thành công!",
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
    mutation,
    isFormHidden,
    isButtonHidden,
  };
}
