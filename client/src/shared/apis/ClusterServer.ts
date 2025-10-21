"use server";

import { cookies } from "next/headers";
import { createRequest } from "../utils/httpRequestBuilder";
import { GetClusterQueryResponse, ParamsQueryCluster } from "../types/Cluster";

const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const handleGetClusterServer = async (
  params: ParamsQueryCluster
): Promise<GetClusterQueryResponse> => {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value || "";

  const response = await createRequest<undefined, ParamsQueryCluster>(
    DOMAIN_API
  )
    .setPath("/api/cluster")
    .setMethod("GET")
    .setQuery(params)
    .setHeaders({
      Cookie: `sid=${sid}`,
    })
    .setCache(10)
    .send<GetClusterQueryResponse>();
  return response;
};
