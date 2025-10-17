import { createRequest } from "../utils/httpRequestBuilder";
import { withAuthRetry } from "../utils/withAuthRetry";
import { APIResponseType } from "./../types/APIResponseType";

const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export const handleUpdateUserPicture = async (
  data: FormData
): Promise<APIResponseType> => {
  return withAuthRetry(() =>
    createRequest(DOMAIN_API)
      .setPath("/api/user/change-profile-picture")
      .setBody(data)
      .setMethod("POST")
      .send<APIResponseType>()
  );
};
