import Button from "@/shared/components/Button";
import FloatingInput from "@/shared/components/Input/FloatingInput";
import FloatingTextarea from "@/shared/components/Input/FloatingTextarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import useProfileSetting from "../hook/useProfileSetting";
import { useProfile } from "../../store/ProfileContext";
import Link from "next/link";

export default function ProfileSetting() {
  const { formik } = useProfileSetting();
  const user = useProfile();
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="font-serif mb-5 text-xl">Profile</h1>
      <FloatingInput
        value={user?.username as never}
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
        readOnly
        endContent={
          <Link href="/claim-username">
            <Icon icon="ri:edit-line" width="20" height="20" />
          </Link>
        }
      />
      <FloatingInput
        value={formik.values.userFullname}
        overrideClass="!rounded-2xl"
        clearBackground
        label="Fullname"
        name="userFullname"
        onChange={formik.handleChange}
      />

      <FloatingTextarea
        value={formik.values.userBio}
        name="userBio"
        clearBackground
        label="Bio"
        onChange={formik.handleChange}
      />
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
    </form>
  );
}
