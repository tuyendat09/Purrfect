import UserProfilePicture from "../../User/UserProfilePicutre";

const SIDEBAR_ITEMS = [
  { label: "Profile", state: "profile" },
  { label: "Account", state: "account" },
  { label: "Password", state: "password" },
];

interface ProfileSidebarProps {
  userProfilePicture?: string;
  handleChangeContent: (changeContent: string) => void;
}

export default function ProfileSidebar({
  userProfilePicture,
  handleChangeContent,
}: ProfileSidebarProps) {
  // const activeClass = "";

  return (
    <div className="shrink-0 min-w-[180px] max-w-[250px] w-[34.25%]  pr-5     flex flex-col gap-8">
      <UserProfilePicture size="md" userProfilePicture={userProfilePicture} />
      <ul className="space-y-3 text-sm ">
        {SIDEBAR_ITEMS.map((item) => (
          <li
            onClick={() => handleChangeContent(item.state)}
            className="pl-4 py-3 rounded-full font-semibold cursor-pointer hover:bg-gray-neutral-400"
            key={item.state}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
