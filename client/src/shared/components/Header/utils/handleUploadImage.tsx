import { uploadElement } from "@/shared/apis/Element";
import { toast } from "react-hot-toast";

export async function handleChooseImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const uploadPromise = uploadElement(formData);

  console.log(uploadPromise);

  await toast.promise(uploadPromise, {
    loading: "Loading...",
    success: (succ) => succ.message,
    error: (err) => err.message,
  });

  e.target.value = "";
}
