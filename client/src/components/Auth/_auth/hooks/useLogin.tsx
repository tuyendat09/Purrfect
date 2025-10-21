import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ParamsLogin } from "@/shared/types/AuthAPI";

export default function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ParamsLogin) => {
      const { login } = await import("@/shared/apis/Auth");
      return login(values);
    },
    onMutate: () => {
      const toastId = toast.loading("Login");
      return { toastId };
    },
    onError(error, _variables, context) {
      toast.dismiss(context?.toastId);
      toast.error(error.message);
    },
    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context?.toastId);
      toast.success("You're all set!");
      setTimeout(() => {
        router.push("/");
      }, 300);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const promise = mutation.mutate(values);
      return promise;
    },
  });

  return {
    formik,
    mutation,
  };
}
