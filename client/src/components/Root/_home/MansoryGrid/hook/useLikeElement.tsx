import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLikeElement() {
  const mutation = useMutation({
    mutationFn: async (elementId: string) => {
      const { handleLikeElement } = await import("@/shared/apis/Element");
      return handleLikeElement(elementId);
    },

    onError(error, _variables) {
      toast.error(error.message);
    },
    onSuccess: (_data, _variables) => {
      toast.success(_data.message);
    },
  });

  async function likeElement(elementId: string) {
    if (elementId) {
      const promise = mutation.mutateAsync(elementId);

      return (await promise).success;
    }
  }

  return {
    likeElement,
  };
}
