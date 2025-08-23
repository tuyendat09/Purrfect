import { handleLikeElement } from "@/shared/apis/Element";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLikeElement() {
  const mutation = useMutation({
    mutationFn: handleLikeElement,
  });

  async function likeElement(elementId: string) {
    if (elementId) {
      const promise = mutation.mutateAsync(elementId);

      await toast.promise(promise, {
        loading: "Just a second...",
        success: (succ) => succ.message,
        error: (err) => err.message,
      });

      return (await promise).success;
    }
  }

  return {
    likeElement,
  };
}
