import { handleUpdateUserPicture as handleUpdateUserPictureServer } from "@/shared/apis/User";
import { toast } from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import { revalidateUsersTag } from "@/shared/utils/revalidateTags";

export async function handleUpdateUserPicture(
  e: React.ChangeEvent<HTMLInputElement>,
  queryClient: QueryClient
) {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const uploadPromise = handleUpdateUserPictureServer(formData);

  await toast.promise(uploadPromise, {
    loading: "Loading...",
    success: (succ) => succ.message,
    error: (err) => err.message,
  });

  queryClient.invalidateQueries({ queryKey: ["users"] });
  await revalidateUsersTag("users");

  e.target.value = "";
}
