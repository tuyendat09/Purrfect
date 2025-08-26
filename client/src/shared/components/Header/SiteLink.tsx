"use client";

import Button from "@/shared/components/Button";
import Link from "next/link";

import {
  DropMenu,
  DropMenuTrigger,
  DropMenuItem,
  DropDown,
} from "@/shared/components/DropMenu";

import UserDefaultPicture from "@@/images/default-user.jpg";

import FlagElement from "../Icon/FlagIcon";
import { ChevronDown, NewCluster, NewImage } from "../Icon";
import { lazy, useRef, useState } from "react";
import NormalInput from "../Input/NormalInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, logout } from "@/shared/apis/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Modal = lazy(() => import("@/shared/components/Modal/Modal"));
const ModalContent = lazy(
  () => import("@/shared/components/Modal/ModalContent")
);
const ModalBody = lazy(() => import("@/shared/components/Modal/ModalBody"));
const ModalFooter = lazy(() => import("@/shared/components/Modal/ModalFooter"));
const ModalHeader = lazy(() => import("@/shared/components/Modal/ModalHeader"));

function UserProfilePicture({
  userProfilePicture,
}: {
  userProfilePicture?: string;
}) {
  const profilePicture = userProfilePicture || "/images/default-user.jpg"; // Dùng đường dẫn trực tiếp

  return (
    <div>
      <Image
        className="size-10 rounded-full"
        src={UserDefaultPicture}
        width={100}
        height={100}
        alt="nenene"
      />
    </div>
  );
}

export default function SiteLink() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function handleToggleModal(): void {
    setIsOpenModal((prevState) => !prevState);
  }

  async function handleAsyncImportCreateCluster() {
    const { handleCreateCluster } = await import("./utils/handleCreateCluster");
    if (inputRef.current) {
      handleCreateCluster(inputRef.current.value);
    }
  }

  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: logout,
  });

  function handleLogout() {
    mutation.mutateAsync();
    router.push("/auth");
  }

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
            onClick={handleToggleModal}
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

      <Link href="/profile">
        <div className="hover:bg-gray-neutral-300  p-2 rounded-full">
          <UserProfilePicture userProfilePicture={data?.profilePicture} />
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

      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={handleToggleModal} size="md">
          <ModalContent>
            <ModalHeader>
              <div className="text-center font-normal">
                <h1 className="font-serif">New Cluster</h1>
                <p className="text-sm">A colection of elements</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <NormalInput
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAsyncImportCreateCluster();
                  }
                }}
                ref={inputRef}
                borderRadius="full"
                placeholder="Cluster name"
                name="cluster-name"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleAsyncImportCreateCluster}
                fullWidth
                size="lg"
                variant="black"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
