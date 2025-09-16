export interface PublicUser {
  id: string;
  email: string;
  userFullname: string;
  username: string;
  profilePicture: string;
  role: string;
}

export interface GetUserResponse {
  success: true;
  user: PublicUser;
}
