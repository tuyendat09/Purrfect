"use server";

import { cookies } from "next/headers";

async function fetchUserByUsername(username: string, sid: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/auth/by-username?username=${username}`,
    {
      method: "GET",
      headers: {
        Cookie: `sid=${sid}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function getUserByUsernameServer(username: string) {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value || "";
  return fetchUserByUsername(username, sid);
}
