"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTagAPI(tag: string) {
  revalidateTag(tag);
}
