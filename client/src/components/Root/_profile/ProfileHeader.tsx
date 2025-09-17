import { PublicUser } from "@/shared/types/User";
import Image from "next/image";
import UserDefaultPicture from "@@/images/default-user.webp";
import Button from "@/shared/components/Button";

type ProfileHeaderProps = {
  user?: PublicUser;
};

function UserProfilePicture({
  userProfilePicture,
}: {
  userProfilePicture?: string;
}) {
  const profilePicture = userProfilePicture || UserDefaultPicture;

  return (
    <div className="mt-14">
      <Image
        className="w-[90px] h-[90px] rounded-full"
        src={profilePicture}
        width={100}
        height={100}
        alt="nenene"
      />
    </div>
  );
}
export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div>
      <div className="flex flex-col items-center">
        <UserProfilePicture userProfilePicture={user?.profilePicture} />
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-serif">{user?.userFullname}</h1>
          <div className="text-sm text-gray-neutral-600 flex gap-2 items-center font-semibold mt-2 mb-5 ">
            <p>@{user?.username}</p>
            <div className="size-1 bg-gray-neutral-600 rounded-full"></div>
            <p className="hover:underline cursor-pointer">00 Following</p>
          </div>
        </div>
        <Button variant="gray" size="md">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
