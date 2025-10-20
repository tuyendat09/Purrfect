export interface PublicUser {
  id: string;
  email: string;
  userFullname: string;
  username: string;
  profilePicture: string;
  role: string;
}

export interface User {
  googleId?: string | null;
  email: string;
  username?: string | null;
  userBio?: string | null;
  userCountry?: string | null;
  userBirthdate?: Date | null;
  userFullname?: string | null;
  profilePicture?: string;
  userRole?: "admin" | "user" | "moderator";
  createdAt: Date;
}

export interface GetUserResponse {
  success: true;
  user: PublicUser;
}

export interface GetUserByUsernameResponse {
  success: true;
  user: User;
}
