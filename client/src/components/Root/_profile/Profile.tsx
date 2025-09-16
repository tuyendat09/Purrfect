"use client";

import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { getUser } = await import("@/shared/apis/Auth"); // path tới file chứa getUser
      return getUser();
    },
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <ProfileHeader user={data?.user} />
    </>
  );
}
