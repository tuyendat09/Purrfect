"use client";

import Button from "@/shared/components/Button";
import Link from "next/link";

import {
  DropMenu,
  DropMenuTrigger,
  DropDown,
  DropMenuItem,
} from "@/shared/components/DropMenu";
import FlagElement from "../Icon/FlagIcon";
import { ChevronDown } from "../Icon";

export default function SiteLink() {
  return (
    <div className="flex items-center gap-2">
      <DropMenu className="mr-4">
        <DropMenuTrigger>
          <Button size="sm" variant="black">
            Create
          </Button>
        </DropMenuTrigger>

        <DropDown position="center">
          <DropMenuItem>Profile</DropMenuItem>
          <DropMenuItem>Settings</DropMenuItem>
          <DropMenuItem className="text-red-500">Logout</DropMenuItem>
        </DropDown>
      </DropMenu>

      <Link href="/your-collection">
        <div className="hover:bg-gray-neutral-300 p-2 rounded-full">
          <FlagElement />
        </div>
      </Link>

      <Link href="/profile">
        <div className="hover:bg-gray-neutral-300  p-2 rounded-full">
          <div className="bg-red-300 size-6 rounded-full"></div>
        </div>
      </Link>

      <DropMenu>
        <DropMenuTrigger>
          <button className="hover:bg-gray-neutral-300 rounded-full p-2">
            <ChevronDown className="size-3 mt-1" />
          </button>
        </DropMenuTrigger>

        <DropDown className="p-2">
          <div className="bg-red-500">
            <DropMenuItem>Profile</DropMenuItem>
            <DropMenuItem>Settings</DropMenuItem>
            <DropMenuItem className="text-red-500">Logout</DropMenuItem>
          </div>
        </DropDown>
      </DropMenu>
    </div>
  );
}
