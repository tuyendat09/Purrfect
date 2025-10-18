import ProfileHeader from "./ProfileHeader";
import ProfileClusterServer from "./ProfileClusterServer";
import { PublicUser } from "@/shared/types/User";

interface ProfileProps {
  user: PublicUser;
}

export default async function Profile({ user }: ProfileProps) {
  return (
    <>
      <ProfileHeader user={user} />
      <ProfileClusterServer />
    </>
  );
}
