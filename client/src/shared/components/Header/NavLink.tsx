import { LogoIcon } from "@/shared/components/Icon";
import Link from "next/link";

export default function NavLink() {
  return (
    <div className="flex items-center gap-4">
      <Link className="text-xl font-semibold" href="/">
        <LogoIcon />
      </Link>
      <Link
        className="text-sm text-gray-neutral-600 font-medium"
        href="/discover"
      >
        Discover
      </Link>
    </div>
  );
}
