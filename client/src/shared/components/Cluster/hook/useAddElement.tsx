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
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: (_data) => {
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
