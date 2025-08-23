import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ParamsLogin } from "@/shared/types/AuthAPI";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ParamsLogin) => {
      const { login } = await import("@/shared/apis/Auth");
      return login(values);
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const promise = mutation.mutateAsync(values);

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
  };
}
