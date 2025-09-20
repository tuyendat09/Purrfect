import UserDefaultPicture from "@@/images/default-user.webp";
import clsx from "clsx";
import Image from "next/image";

interface UserProfilePictureProps {
  userProfilePicture?: string;
  variant?: "sm" | "md" | "lg";
}

const variantClasses: Record<
  NonNullable<UserProfilePictureProps["variant"]>,
  string
> = {
  sm: "size-6",
  md: "w-[96px] h-[96px]",
  lg: "w-[128px] h-[128px]",
};

export default function UserProfilePicture({
  userProfilePicture,
  variant = "sm",
}: UserProfilePictureProps) {
  const profilePicture =
    userProfilePicture !== undefined &&
    userProfilePicture !== "default-user-picture"
      ? userProfilePicture
      : UserDefaultPicture;

  return (
    <div>
      <Image
        className={clsx(variantClasses[variant], "rounded-full")}
        src={profilePicture}
        width={100}
        height={100}
        alt="nenene"
      />
    </div>
  );
}
