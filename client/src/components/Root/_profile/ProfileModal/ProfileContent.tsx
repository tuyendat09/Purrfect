import { JSX, lazy } from "react";

const ProfileSetting = lazy(() => import("./ProfileSetting/ProfileSetting"));
const PasswordSetting = lazy(() => import("./ProfileSetting/PasswordSetting"));

interface ProfileContentProps {
  contentState: string;
}

export default function ProfileContent({ contentState }: ProfileContentProps) {
  let content: JSX.Element;

  switch (contentState) {
    case "profile":
      content = <ProfileSetting />;
      break;
    case "password":
      content = <PasswordSetting />;
      break;
    default:
      content = <div>Invalid section</div>;
  }

  return <div className="w-full h-full px-4">{content}</div>;
}
