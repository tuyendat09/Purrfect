import { ParamsCreateCluster } from "./../types/Cluster";

import { APIResponseType } from "./../types/APIResponseType";

import { createRequest } from "../utils/httpRequestBuilder";
const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const createCluster = async (
  data: ParamsCreateCluster
): Promise<APIResponseType> => {
  try {
    const response = await createRequest(DOMAIN_API)
      .setPath("/api/cluster/create")
      .setMethod("POST")
      .setBody(data)
      .send<APIResponseType>();

    return response;
  } catch (error) {
    console.error("Create Cluster Failed:", error);
    throw error;
  }
};
