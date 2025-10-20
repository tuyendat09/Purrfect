import ProfileHeader from "./ProfileHeader";
import ProfileClusterServer from "./ProfileClusterServer";
import { User } from "@/shared/types/User";

interface ProfileProps {
  user: User;
}

export default async function Profile({ user }: ProfileProps) {
  return (
    <>
      <ProfileHeader user={user} />
      <ProfileClusterServer />
    </>
  );
}
