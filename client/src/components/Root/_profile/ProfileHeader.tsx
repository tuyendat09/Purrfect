"use client";

import { PublicUser } from "@/shared/types/User";
import Button from "@/shared/components/Button";
import UserProfilePicture from "@/shared/components/User/UserProfilePicutre";
import useToggle from "@/shared/hook/useToggle";
import ProfileModal from "@/shared/components/Modal/ProfileModal/ProfileModal";

type ProfileHeaderProps = {
  user?: PublicUser;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <UserProfilePicture
            size="md"
            userProfilePicture={user?.profilePicture}
          />
          <div className="mt-5 text-center">
            <h1 className="text-2xl font-serif">{user?.userFullname}</h1>
            <div className="text-sm text-gray-neutral-600 flex gap-2 items-center font-semibold mt-2 mb-5 ">
              <p>@{user?.username}</p>
              <div className="size-1 bg-gray-neutral-600 rounded-full"></div>
              <p className="hover:underline cursor-pointer">00 Following</p>
            </div>
          </div>
          <Button onClick={handleToggle} variant="gray" size="md">
            Edit Profile
          </Button>
        </div>
      </div>
      <ProfileModal
        userProfilePicture={user?.profilePicture}
        handleToggleModal={handleToggle}
        isOpenModal={toggle}
      />
    </>
  );
}
