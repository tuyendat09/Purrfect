import { useProfile } from "@/components/Root/_profile/store/ProfileContext";
import Button from "@/shared/components/Button";
import FloatingInput from "@/shared/components/Input/FloatingInput";
import FloatingTextarea from "@/shared/components/Input/FloatingTextarea";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProfileSetting() {
  const user = useProfile();
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
      <Button size="md" className="absolute bottom-6 right-8">
        Save
      </Button>
    </div>
  );
}
