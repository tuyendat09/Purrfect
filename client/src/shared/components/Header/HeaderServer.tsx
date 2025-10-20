import Header from "./Header";
import { getUserServer } from "@/components/Root/_profile/utils/GetUser";

export default async function HeaderServer() {
  const { user } = await getUserServer();

  return <Header user={user} />;
}
