export interface GetElementQuery {
  id?: string;
  page?: number | undefined;
  limit?: number;
  tag?: string;
  lastest?: boolean;
  oldest?: boolean;
  popular?: boolean;
}

export interface Element {
  _id: string;
  imageUrl: string;
  previewImageUrl: string;
  uploadBy: string;
  like: number;
  autoTags: string[];
  embedding: string[];
  createdAt: string;
  isLiked?: boolean;
}

export interface GetELementQueryResponse {
  success: boolean;
  element: Element[];
  hasNextPage: boolean;
  total: number;
}
