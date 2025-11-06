"use client";

import { getUserServer } from "@/components/Root/_profile/utils/GetUser";
import { ParamsChangeUsername } from "@/shared/types/AuthAPI";
import { sleep } from "@/shared/utils/sleep";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useClaimUsername() {
  const [username, setUsername] = useState<string>("");
  const [oldUsername, setOldUsername] = useState<string>("");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUserServer,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUsername(data?.user.username);
      setOldUsername(data?.user.username);
    }
  }, [data]);

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
    oldUsername,
    handleInputChange,
    handleChangeUsername: () => {
      mutation.mutate({ username });
    },
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
