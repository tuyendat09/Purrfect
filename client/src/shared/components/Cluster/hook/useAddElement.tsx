import { ParamsAddToCluster } from "@/shared/types/Cluster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function useAddElement() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: ParamsAddToCluster) => {
      const { handleAddElementToCluster } = await import(
        "@/shared/apis/Cluster"
      );
      return handleAddElementToCluster(values);
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
      queryClient.invalidateQueries({ queryKey: ["cluster"] });
    },
  });

  function handleAddElement(elementId: string, clusterId: string) {
    const data = { elementId: elementId, clusterId: clusterId };
    return mutation.mutate(data);
  }

  return { handleAddElement };
}
