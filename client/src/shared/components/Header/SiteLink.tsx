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
import { lazy } from "react";
import useToggle from "@/shared/hook/useToggle";
import UserProfilePicture from "../User/UserProfilePicutre";
import useUser from "@/shared/hook/useAuth";

const CreateClusterModal = lazy(
  () => import("../Modal/CreateClustserModal/CreateClusterModal")
);

export default function SiteLink() {
  const { handleLogout, data } = useUser();
  const { toggle, handleToggle } = useToggle();

  return (
    <div className="flex items-center gap-2">
      <DropMenu className="mr-4">
        <DropMenuTrigger>
          <Button size="sm" variant="black">
            Create
          </Button>
        </DropMenuTrigger>

        <DropDown className="px-2 py-4" position="center">
          <DropMenuItem
            onClick={handleToggle}
            className="py-4 flex items-center gap-3"
          >
            <div className="rounded-full bg-gray-neutral-400 p-2 ">
              <NewCluster className="size-6" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">New Cluster</h4>
              <p className="text-[12px]">A collection of elements</p>
            </div>
          </DropMenuItem>
          <DropMenuItem className="py-4 flex items-center gap-3 relative">
            <div className="rounded-full bg-gray-neutral-400 p-3 ">
              <NewImage className="size-4" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">New Image</h4>
              <p className="text-[12px]">Create a new Image</p>
            </div>
            <input
              onChange={async (e) => {
                const { handleChooseImage } = await import(
                  "./utils/handleUploadImage"
                );
                handleChooseImage(e);
              }}
              id="image-input"
              className="hidden"
              type="file"
              name="image"
            />
            <label
              className="bg-red-500 absolute w-full h-full top-0  left-0 opacity-0"
              htmlFor="image-input"
            />
          </DropMenuItem>
        </DropDown>
      </DropMenu>

      <Link href="/your-collection">
        <div className="hover:bg-gray-neutral-300 p-2 rounded-full">
          <FlagElement />
        </div>
      </Link>

      <Link href={data?.user.username || ""}>
        <div className="hover:bg-gray-neutral-300  p-2 rounded-full">
          <UserProfilePicture
            userProfilePicture={data && data?.user.profilePicture}
          />
        </div>
      </Link>

      <DropMenu>
        <DropMenuTrigger>
          <button className="hover:bg-gray-neutral-300 rounded-full p-2">
            <ChevronDown className="size-3 mt-1" />
          </button>
        </DropMenuTrigger>

        <DropDown className="p-2">
          <div className="">
            <DropMenuItem>Profile</DropMenuItem>
            <DropMenuItem>Settings</DropMenuItem>
            <DropMenuItem
              onClick={() => handleLogout()}
              className="text-red-500"
            >
              Logout
            </DropMenuItem>
          </div>
        </DropDown>
      </DropMenu>

      {toggle && (
        <CreateClusterModal
          isOpenModal={toggle}
          handleToggleModal={handleToggle}
        />
      )}
    </div>
  );
}
