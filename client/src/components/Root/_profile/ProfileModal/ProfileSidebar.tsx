import { Icon } from "@iconify/react/dist/iconify.js";
import UserProfilePicture from "../../../../shared/components/User/UserProfilePicture";

const SIDEBAR_ITEMS = [
  { label: "Profile", state: "profile" },
  { label: "Password", state: "password" },
];

interface ProfileSidebarProps {
  userProfilePicture?: string;
  handleChangeContent: (changeContent: string) => void;
  content: string;
}

export default function ProfileSidebar({
  handleChangeContent,
  userProfilePicture,
  content,
}: ProfileSidebarProps) {
  const activeClass = "bg-gray-neutral-300 !text-black";

  return (
    <div className="shrink-0 min-w-[180px] max-w-[250px] w-[34.25%]  pr-5  flex flex-col gap-8">
      <div className="relative  w-fit">
        <label
          htmlFor="image"
          className="absolute z-10 glass p-1 rounded-full cursor-pointer right-0"
        >
          <Icon icon="mynaui:edit" width="16" height="16" />
          <input
            onChange={async (e) => {
              const { handleUpdateUserPicture } = await import(
                "./utils/handeUploadUserImage"
              );
              handleUpdateUserPicture(e);
            }}
            id="image"
            className="hidden"
            type="file"
            name="image"
          />
        </label>
        <UserProfilePicture userProfilePicture={userProfilePicture} size="md" />
      </div>
      <ul className="space-y-1 text-sm ">
        {SIDEBAR_ITEMS.map((item) => (
          <li
            onClick={() => handleChangeContent(item.state)}
            className={`pl-4 py-3 rounded-full font-medium hover:text-black transition cursor-pointer text-gray-neutral-600 ${
              content == item.state && activeClass
            }`}
            key={item.state}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
