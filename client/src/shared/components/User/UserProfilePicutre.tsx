import { useAuthStore } from "@/shared/store/authStore";
import UserDefaultPicture from "@@/images/default-user.webp";
import clsx from "clsx";
import Image from "next/image";

interface UserProfilePictureProps {
  userProfilePicture?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<
  NonNullable<UserProfilePictureProps["size"]>,
  string
> = {
  sm: "size-6",
  md: "w-[96px] h-[96px]",
  lg: "w-[128px] h-[128px]",
};

export default function UserProfilePicture({
  userProfilePicture,
  size = "sm",
}: UserProfilePictureProps) {

  const profilePicture =
    userProfilePicture !== undefined &&
    userProfilePicture !== "default-user-picture"
      ? userProfilePicture
      : UserDefaultPicture;

  return (
    <div>
      <Image
        className={clsx(sizeClasses[size], "rounded-full")}
        src={profilePicture}
        width={100}
        height={100}
        alt="nenene"
      />
    </div>
  );
}
