import { login } from "@/shared/apis/Auth";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
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
