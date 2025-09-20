import {
  GetClusterQueryResponse,
  ParamsAddToCluster,
  ParamsCreateCluster,
  ParamsQueryCluster,
} from "./../types/Cluster";

import { APIResponseType } from "./../types/APIResponseType";

import { createRequest } from "../utils/httpRequestBuilder";
import { withAuthRetry } from "../utils/withAuthRetry";
const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const createCluster = async (
  data: ParamsCreateCluster
): Promise<APIResponseType> => {
  const response = await createRequest(DOMAIN_API)
    .setPath("/api/cluster/create")
    .setMethod("POST")
    .setBody(data)
    .send<APIResponseType>();

  return response;
};

export const handleQueryClutser = async (
  query: ParamsQueryCluster
): Promise<GetClusterQueryResponse> => {
  return withAuthRetry(() =>
    createRequest(DOMAIN_API)
      .setPath("/api/cluster/")
      .setMethod("GET")
      .setQuery(query)
      .send<GetClusterQueryResponse>()
  );
};

export const handleAddElementToCluster = async (
  data: ParamsAddToCluster
): Promise<APIResponseType> => {
  return withAuthRetry(() =>
    createRequest(DOMAIN_API)
      .setPath("/api/cluster/add-to-cluster")
      .setMethod("POST")
      .setBody(data)
      .send<APIResponseType>()
  );
};
