import { handleUpdateUserPicture as handleUpdateUserPictureServer } from "@/shared/apis/User";
import { toast } from "react-hot-toast";
import { revalidateUsersTag } from "@/shared/utils/revalidateTags";

export async function handleUpdateUserPicture(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const uploadPromise = handleUpdateUserPictureServer(formData);

  await toast.promise(uploadPromise, {
    loading: "Uploading",
    success: (succ) => succ.message,
    error: (err) => err.message,
  });

  await revalidateUsersTag("publicUser");
  await revalidateUsersTag("users");

  e.target.value = "";
}
