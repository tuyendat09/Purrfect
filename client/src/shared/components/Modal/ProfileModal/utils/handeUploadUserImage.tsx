import { handleUpdateUserPicture as handleUpdateUserPictureServer } from "@/shared/apis/User";
import { toast } from "react-hot-toast";

export async function handleUpdateUserPicture(
  e: React.ChangeEvent<HTMLInputElement>
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

  e.target.value = "";
}
