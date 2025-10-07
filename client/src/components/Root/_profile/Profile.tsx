import { PublicUser } from "@/shared/types/User";
import ProfileHeader from "./ProfileHeader";
import ProfileClusterServer from "./ProfileClusterServer";

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
