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
  sm: "size-8",
  md: "w-[96px] h-[96px]",
  lg: "w-[128px] h-[128px]",
};

export default function UserProfilePicture({
  userProfilePicture,
  size = "sm",
}: UserProfilePictureProps) {
  const profilePicture =
    userProfilePicture === "default-user-profile" || !userProfilePicture
      ? UserDefaultPicture
      : userProfilePicture;

  const sizeClass = sizeClasses[size];

  return (
    <div
      className={clsx(
        sizeClass,
        "relative rounded-full overflow-hidden" // quan trọng để clip ảnh tròn + fill
      )}
    >
      <Image
        src={profilePicture}
        fill
        className="object-cover"
        alt="User profile"
        priority
      />
    </div>
  );
}
