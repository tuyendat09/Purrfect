"use client";

import Button from "@/shared/components/Button";
import useToggle from "@/shared/hook/useToggle";
import { lazy } from "react";
import UserProfilePicture from "@/shared/components/User/UserProfilePicture";
import { ProfileContext, useProfile } from "./store/ProfileContext";
import { User } from "@/shared/types/User";

const ProfileModal = lazy(
  () => import("@/shared/components/Modal/ProfileModal/ProfileModal")
);

type ProfileHeaderProps = {
  user?: User;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { toggle, handleToggle } = useToggle();

  return (
    <ProfileContext.Provider value={user}>
      <div>
        <div className="flex flex-col items-center">
          <UserProfilePicture
            userProfilePicture={user?.profilePicture}
            size="md"
          />
          <UserInfo />
          <Button onClick={handleToggle} variant="gray" size="md">
            Edit Profile
          </Button>
        </div>
      </div>
      {toggle && (
        <ProfileModal handleToggleModal={handleToggle} isOpenModal={toggle} />
      )}
    </ProfileContext.Provider>
  );
}

function UserInfo() {
  const user = useProfile();
  return (
    <div className="mt-5 text-center">
      <h1 className="text-2xl font-serif">{user?.userFullname}</h1>
      <div className="text-sm text-gray-neutral-600 flex gap-2 items-center font-semibold mt-2 mb-5 ">
        <p>@{user?.username}</p>
        <div className="size-1 bg-gray-neutral-600 rounded-full"></div>
        <p className="hover:underline cursor-pointer">00 Following</p>
      </div>
    </div>
  );
}
