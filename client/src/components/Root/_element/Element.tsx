/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useElementQuery } from "./hook/useQueryElement";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ThreeDots } from "@/shared/components/Icon";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDateToCustomString } from "@/shared/utils/formatDate";

export default function Element({ id }: { id: string }) {
  const { element, isLoading } = useElementQuery(id);

  const imageUrl: string | StaticImport = element?.imageUrl ?? "/default.jpg";

  const formattedDate = formatDateToCustomString(element?.createdAt as any);

  return (
    <div className="absolute left-0 w-screen h-screen ">
      <div className="w-full h-full flex justify-between">
        <div className="flex justify-center items-center w-full">
          <Image height={500} width={500} src={imageUrl} alt="" />
        </div>
        <div className=" w-1/4 h-full flex items-center">
          <div className="w-full h-[95%] bg-gray-neutral-200 rounded-3xl mr-4 p-4 flex flex-col">
            {/* Header */}
            <div className="flex justify-between">
              <div className="cursor-pointer w-fit p-4 hover:bg-gray-neutral-400 transition bg-gray-neutral-300 rounded-full">
                <ThreeDots className="size-4" />
              </div>
              <button className="bg-black text-white p-3 rounded-full cursor-pointer hover:bg-[#393939] transition">
                <Icon icon="basil:heart-solid" className="size-6" />
              </button>
            </div>

            {/* Date */}
            <div>
              <p className="text-sm text-gray-neutral-700 mt-[40px]">
                {formattedDate}
              </p>
            </div>

            {/* Comment */}
            <div className="mt-[40px] flex-1 overflow-y-auto pr-2 no-scrollbar">
              <h3 className="font-serif font-light">242 Comments</h3>

              <div className="mt-4 space-y-2">
                {Array.from({ length: 40 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-3 bg-gray-neutral-300 hover:bg-gray-neutral-400 transition rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-sm text-gray-neutral-900">
                      User123
                    </p>
                    <p className="text-gray-neutral-700 text-sm">
                      This is a dummy comment.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
