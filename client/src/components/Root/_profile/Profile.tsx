import Link from "next/link";
import ProfileCluster from "./ProfileCluster";
import ProfileHeader from "./ProfileHeader";
import { getUserByUsernameServer } from "./utils/GetUser";
import { Suspense } from "react";
import Button from "@/shared/components/Button";

interface ProfileProps {
  username: string;
}

export default async function ProfileContent({ username }: ProfileProps) {
  try {
    const user = await getUserByUsernameServer(username);

    return (
      <>
        <ProfileHeader user={user.user} />
        <ProfileCluster />
      </>
    );
  } catch (error) {
    return <PageNotFound />;
  }
}

function PageNotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-extralight font-serif">
          This page isn&apos;t available
        </h1>
        <p className="text-gray-neutral-600 text-sm my-2">
          Sorry, you can&apos;t access this.
        </p>
        <Button className="mt-3" variant="black" size="md">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
