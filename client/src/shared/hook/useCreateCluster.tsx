/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCluster } from "../apis/Cluster";
import toast from "react-hot-toast";
import { revalidateTagAPI } from "../utils/revalidateTags";

export function useCreateCluster() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCluster,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cluster"] });
      await revalidateTagAPI("cluster");
    },
  });

  const handleCreateCluster = async (clusterName: string) => {
    if (!clusterName) {
      return toast.error(
        "Looks like you missed a spot — album name can’t be empty!"
      );
    }

    const promise = mutation.mutateAsync({ clusterName });

    await toast.promise(promise, {
      loading: "Loading...",
      success: (succ: any) => succ.message,
      error: (err) => err.message,
    });
  };

  return { handleCreateCluster, ...mutation };
}
