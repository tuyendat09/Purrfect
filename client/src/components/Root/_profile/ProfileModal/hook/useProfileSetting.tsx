import { useFormik } from "formik";
import { useProfile } from "@/components/Root/_profile/store/ProfileContext";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ParamsEditUserData } from "@/shared/types/User";
import { revalidateTagAPI } from "@/shared/utils/revalidateTags";

export default function useProfileSetting() {
  const user = useProfile();

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
      await revalidateTagAPI("publicUser");
      await revalidateTagAPI("users");
    },
  });

  const validate = (values: { userFullname: string; userBio: string }) => {
    const errors: { [key: string]: string } = {};

    if (!values.userFullname.trim()) {
      errors.userFullname = "Full name is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userFullname: user?.userFullname ?? "",
      userBio: user?.userBio ?? "",
    },

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
