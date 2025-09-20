// app/[username]/page.tsx
import Profile from "@/components/Root/_profile/Profile";
import { getUserByUsernameServer } from "@/components/Root/_profile/utils/GetUser";
import type { Metadata } from "next";

type Props = {
  params: { username: string };
};

// Metadata động
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const user = await getUserByUsernameServer(params.username);

    if (!user?.user) {
      return {
        title: "🐾 User not found",
        description: "Trang này không tồn tại hoặc đã bị xoá.",
      };
    }

    return {
      title: `${user.user.userFullname} (@${user.user.username})`,
      description: `Xem profile của ${user.user.userFullname} trên Petz.`,
      openGraph: {
        title: `${user.user.userFullname} (@${user.user.username})`,
        images: [user.user.profilePicture || "/default-avatar.png"],
      },
    };
  } catch {
    return {
      title: "Page not found / Purrfect",
      description: "Page not found.",
    };
  }
}

// Page chính
export default function Page({ params }: Props) {
  return <Profile username={params.username} />;
}
