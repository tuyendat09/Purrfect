/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Masonry } from "react-plock";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleGetElement } from "@/shared/apis/Element";
import { GetELementQueryResponse } from "@/shared/types/ElementAPI";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { sleep } from "@/shared/utils/sleep";
import MansoryItem from "./MansoryItem";
import { lazy } from "react";

const DotLottieReact = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((mod) => ({
    default: mod.DotLottieReact,
  }))
);

export default function MasonryInfiniteGallery() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GetELementQueryResponse, Error>({
      queryKey: ["masonryImages"],
      queryFn: async ({ pageParam = 1 as any }) => {
        await sleep(1000);
        return handleGetElement({ page: pageParam, limit: 5 });
      },
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasNextPage ? pages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const allImages = data?.pages.flatMap((page) => page.element) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <Masonry
        items={allImages}
        config={{
          columns: [1, 2, 5],
          gap: [24, 12, 60],
          media: [640, 768, 1024],
        }}
        render={(item) => <MansoryItem Element={item} />}
      />

      <div ref={loadMoreRef} style={{ height: 1 }} />

      {isLoading && (
        <DotLottieReact
          className=" -translate-y-1/2 -translate-x-1/2 h-10 left-1/2 fixed top-1/2 translate"
          src="https://lottie.host/211fb592-99fb-48c3-83ce-5938a5692053/qeSfsN5Gb5.lottie"
          loop
          autoplay
        />
      )}
      {isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
}
