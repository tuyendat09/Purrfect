"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import SearchBar from "./Search/SearchBar";
import SiteLink from "./SiteLink";
import { PublicUser } from "@/shared/types/User";

interface HeaderProps {
  user: PublicUser;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const shouldRenderHeader = !["auth", "element", "onboarding"].some(
    (segment) => pathname.includes(segment)
  );

  return (
    shouldRenderHeader && (
      <header className="bg-[#f5f4f2] sticky top-0 py-4 flex justify-between z-[9999]">
        <NavLink />
        <SearchBar />
        <SiteLink user={user} />
      </header>
    )
  );
}
