/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";
import { useElementQuery } from "./hook/useQueryElement";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ThreeDots } from "@/shared/components/Icon";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDateToCustomString } from "@/shared/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { clsx } from "clsx";
import { useGSAP } from "@gsap/react";
import MasonryInfiniteGallery from "../_home/MansoryGrid/MansoryGrid";

export default function Element({ id }: { id: string }) {
  const { element } = useElementQuery(id);
  const imageUrl: string | StaticImport = element?.imageUrl ?? "/default.jpg";
  const elementTags: string[] | undefined = element?.autoTags;
  const formattedDate = formatDateToCustomString(element?.createdAt as any);
  const elementDetailRef = useRef<HTMLDivElement>(null);

  const endOfCommentsRef = useRef(null);

  const isInView = useInView(endOfCommentsRef, {
    margin: "0px 0px -100% 0px",
  });

  console.log(elementTags);

  const [isScrollable, setIsScrollable] = useState(true);

  useEffect(() => {
    if (isInView) {
      setIsScrollable(false);
    }
  }, [isInView]);

  useGSAP(() => {
    gsap.to(elementDetailRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: elementDetailRef.current,
        start: "top 0%",
        end: "bottom 70%",
        scrub: true,
        markers: true,
      },
    });
  }, {});

  return (
    <div className=" absolute left-0 w-screen h-screen ">
      <div className="w-full min-h-screen flex flex-col">
        <div
          ref={elementDetailRef}
          className="  flex justify-between h-screen "
        >
          <div className="flex justify-center items-center w-full">
            <Image
              className=" h-3/4 object-contain"
              height={500}
              width={500}
              src={imageUrl}
              alt=""
            />
          </div>
          <div className="w-1/4 h-full flex items-center">
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
              <div
                className={clsx(
                  "mt-[40px] flex-1 pr-2 no-scrollbar ",
                  isScrollable ? "overflow-y-auto" : "overflow-visible"
                )}
              >
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

                  {/* 🔽 Đây là phần tử dùng để detect scroll cuối comment */}
                  <div ref={endOfCommentsRef} className="h-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Images */}
        <div className="mt-10 px-10 pb-10">
          {element && (
            <MasonryInfiniteGallery
              query={{ tag: JSON.stringify(elementTags), exceptId: id }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
