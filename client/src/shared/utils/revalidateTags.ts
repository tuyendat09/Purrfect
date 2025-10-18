"use server";

import { revalidateTag } from "next/cache";

export async function revalidateUsersTag(tag: string) {
  revalidateTag(tag);
}
