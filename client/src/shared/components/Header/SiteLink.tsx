"use client";

import Button from "@/shared/components/Button";
import Link from "next/link";

import {
  DropMenu,
  DropMenuTrigger,
  DropMenuItem,
  DropDown,
} from "@/shared/components/DropMenu";

import FlagElement from "../Icon/FlagIcon";
import { ChevronDown, NewCluster, NewImage } from "../Icon";

export default function SiteLink() {
  return (
    <div className="flex items-center gap-2">
      <DropMenu className="mr-4">
        <DropMenuTrigger>
          <Button size="sm" variant="black">
            Create
          </Button>
        </DropMenuTrigger>

        <DropDown className="px-2 py-4" position="center">
          <DropMenuItem className="py-4 flex items-center gap-3">
            <div className="rounded-full bg-neutral-400 p-2 ">
              <NewCluster className="size-6" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">New Cluster</h4>
              <p className="text-[12px]">A collection of elements</p>
            </div>
          </DropMenuItem>
          <DropMenuItem className="py-4 flex items-center gap-3">
            <div className="rounded-full bg-gray-neutral-400 p-2 ">
              <NewImage className="size-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">New Element</h4>
              <p className="text-[12px]">Create a new Image</p>
            </div>
          </DropMenuItem>
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
