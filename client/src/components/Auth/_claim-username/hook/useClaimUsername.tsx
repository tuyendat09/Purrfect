"use client";

import { ParamsChangeUsername } from "@/shared/types/AuthAPI";
import { sleep } from "@/shared/utils/sleep";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function useClaimUsername() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ParamsChangeUsername) => {
      await sleep(150);
      const { changeUsername } = await import("@/shared/apis/Auth");
      return changeUsername(values);
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
      toast.success(_data.message);
      router.push("/");
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  return {
    username,
    handleInputChange,
    handleChangeUsername: () => {
      mutation.mutate({ username }); // 👈 Gửi API với username hiện tại
    },
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
