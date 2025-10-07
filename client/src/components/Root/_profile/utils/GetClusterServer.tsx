"use server";

import { ParamsQueryCluster } from "@/shared/types/Cluster";
import { cookies } from "next/headers";

async function handleQueryClusterServer(
  params: ParamsQueryCluster,
  sid: string
) {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const url = `${process.env.NEXT_PUBLIC_DOMAIN_API}/api/cluster${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `sid=${sid}`,
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  return res.json();
}

export async function getClusterServer(params: ParamsQueryCluster) {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value || "";
  return handleQueryClusterServer(params, sid);
}
