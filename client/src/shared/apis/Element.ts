import {
  GetElementQuery,
  GetELementQueryResponse,
} from "./../types/ElementAPI";
import { APIResponseType } from "./../types/APIResponseType";
import { createRequest } from "../utils/httpRequestBuilder";
const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const uploadElement = async (
  data: FormData
): Promise<APIResponseType> => {
  const response = await createRequest(DOMAIN_API)
    .setPath("/api/element/upload")
    .setMethod("POST")
    .setBody(data)
    .send<APIResponseType>();

  return response;
};

export const handleGetElement = async (
  params: GetElementQuery
): Promise<GetELementQueryResponse> => {
  const response = await createRequest<undefined, GetElementQuery>(DOMAIN_API)
    .setPath("/api/element")
    .setMethod("GET")
    .setQuery(params)
    .send<GetELementQueryResponse>();
  return response;
};

export const handleLikeElement = async (
  elementId: string
): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/element/like")
      .setBody({ elementId: elementId })
      .setMethod("POST")
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};
