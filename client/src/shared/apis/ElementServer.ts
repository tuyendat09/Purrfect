"use server";

import { cookies } from "next/headers";
import { GetElementQuery, GetELementQueryResponse } from "../types/ElementAPI";
import { createRequest } from "../utils/httpRequestBuilder";

const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const handleGetElementServer = async (
  params: GetElementQuery
): Promise<GetELementQueryResponse> => {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value || "";

  const response = await createRequest<undefined, GetElementQuery>(DOMAIN_API)
    .setPath("/api/element")
    .setMethod("GET")
    .setQuery(params)
    .setHeaders({
      Cookie: `sid=${sid}`,
    })
    .setCache(10)
    .send<GetELementQueryResponse>();
  return response;
};
