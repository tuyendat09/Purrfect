export interface ParamsCreateCluster {
  clusterName: string;
}

export interface ParamsQueryCluster {
  page?: number;
  limit?: number;
  elementId?: string;
  name?: string;
  byUserId?: string;
  id?: string;
  exceptId?: string;
  userFullname?: string;
}

export interface ParamsAddToCluster {
  elementId: string;
  clusterId: string;
}

export interface GetClusterQueryResponse {
  success: boolean;
  result: {
    clusters: Cluster[];
    total: number;
    currentPage: string;
    nextPage?: string;
    hasNextPage: boolean;
  };
}

export interface Cluster {
  _id: string;
  clusterName: string;
  createdBy: {
    userId: string;
    userPicture: string;
    userFullname: string;
  };
  elementIds: string[];
  createdAt: string;
}
