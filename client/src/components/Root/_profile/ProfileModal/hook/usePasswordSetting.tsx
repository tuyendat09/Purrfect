import { ParamsEditUserData } from "@/shared/types/User";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

export default function usePasswordSetting() {
  const mutation = useMutation({
    mutationFn: async (values: ParamsEditUserData) => {
      const { handleUpdateUserData } = await import("@/shared/apis/User");
      return handleUpdateUserData(values);
    },
    onMutate: () => {
      const toastId = toast.loading("Login");
      return { toastId };
    },
    onError: (error, _variables, context) => {
      toast.dismiss(context?.toastId);
      toast.error(error.message);
    },
    onSuccess: async (error, _variables, context) => {
      toast.dismiss(context?.toastId);
      toast.success(error.message);
    },
  });

  const validate = (values: { password: string; confirmPassword: string }) => {
    const errors: { [key: string]: string } = {};

    if (!values.password.trim()) {
      errors.password = "New password is required!";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password not match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },

    onSubmit: async (values) => {
      const errors = validate(values);

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => toast.error(msg));
        return;
      }

      const promise = mutation.mutate(values);
      return promise;
    },
  });
  return { formik };
}
