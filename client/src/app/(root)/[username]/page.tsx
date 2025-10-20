import Profile from "@/components/Root/_profile/Profile";
import { getUserByUsernameServer } from "@/components/Root/_profile/utils/GetUser";
import type { Metadata } from "next";
import NotFoundPage from "@/shared/components/NotFoundPage/NotFoundPage";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { username } = await params;
    const user = await getUserByUsernameServer(username);

    if (!user?.user) {
      return {
        title: "User not found",
        description: "Trang này không tồn tại hoặc đã bị xoá.",
      };
    }

    return {
      title: `${user.user.userFullname} (@${user.user.username})`,
      description: `Profile ${user.user.userFullname}.`,
      openGraph: {
        title: `${user.user.userFullname} (@${user.user.username})`,
      },
    };
  } catch {
    return {
      title: "Page not found / Purrfect",
      description: "Page not found.",
    };
  }
}

export default async function Page({ params }: Props) {
  const { username } = await params;

  try {
    const { user } = await getUserByUsernameServer(username);

    return <Profile user={user} />;
  } catch {
    return <NotFoundPage />;
  }
}
