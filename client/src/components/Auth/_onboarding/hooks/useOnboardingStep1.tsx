import { register } from "@/shared/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useOnboardingStepContext } from "../context/OnboardingStepContext";
import { toast } from "react-hot-toast";

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
      userFullname: "",
      password: "",
    },
    onSubmit: async (values) => {
      const promise = mutation.mutateAsync(values);

      await toast.promise(promise, {
        loading: "Hold on",
        success: "Complete!",
        error: (err) => err.message,
      });

      return promise;
    },
  });

  return {
    formik,
    mutation,
    isFormHidden,
    isButtonHidden,
  };
}
