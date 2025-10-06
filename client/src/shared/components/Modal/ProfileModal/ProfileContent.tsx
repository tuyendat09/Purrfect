import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../Button";
import FloatingInput from "../../Input/FloatingInput";
import FloatingTextarea from "../../Input/FloatingTextarea";
import { JSX } from "react";

interface ProfileContentProps {
  contentState: string;
}

export default function ProfileContent({ contentState }: ProfileContentProps) {
  let content: JSX.Element;

  switch (contentState) {
    case "profile":
      content = <ProfileSetting />;
      break;
    case "account":
      content = <AccountSetting />;
      break;
    case "password":
      content = <PasswordSetting />;
      break;
    default:
      content = <div>Invalid section</div>;
  }

  return <div className="w-full h-full px-4 relative">{content}</div>;
}

function ProfileSetting() {
  return (
    <div>
      <h1 className="font-serif mb-5 text-xl">Profile</h1>
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Fullname"
        name="fullname"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Email"
        name="321"
      />
      <FloatingTextarea name="userBio" clearBackground label="Bio" />
      <Button
        fullWidth
        size="lg"
        variant="black"
        className="flex gap-1 items-center justify-center "
      >
        <Icon icon="material-icon-theme:google" width="16" height="16" />
        Connect to Google
      </Button>
    </div>
  );
}

function AccountSetting() {
  return (
    <div>
      <h1 className="font-serif mb-5 text-xl">Account</h1>
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Fullname"
        name="fullname"
      />
    </div>
  );
}

function PasswordSetting() {
  return (
    <div>
      <h1 className="font-serif mb-5 text-xl">Password</h1>
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Fullname"
        name="fullname"
      />
    </div>
  );
}
