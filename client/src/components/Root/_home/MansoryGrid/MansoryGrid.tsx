"use client";

import MansoryItem from "./MansoryItem";
import { lazy } from "react";
import { Masonry } from "react-plock";
import { useInfiniteElements } from "./hook/useInfiniteElements";
import { GetElementQuery } from "@/shared/types/ElementAPI";

const DotLottieReact = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((mod) => ({
    default: mod.DotLottieReact,
  }))
);

interface MasonryInfiniteGalleryProps {
  query?: Omit<GetElementQuery, "page" | "limit">;
}

export default function MasonryInfiniteGallery({
  query,
}: MasonryInfiniteGalleryProps) {
  const { allImages, loadMoreRef, isLoading, isFetchingNextPage } =
    useInfiniteElements(query);

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

      {isLoading && <LoadingIndicator />}
      {isFetchingNextPage && <FetchingNextPage />}
    </div>
  );
}

const LoadingIndicator = () => (
  <DotLottieReact
    className=" -translate-y-1/2 -translate-x-1/2 h-10 left-1/2 fixed top-1/2 translate"
    src="https://lottie.host/211fb592-99fb-48c3-83ce-5938a5692053/qeSfsN5Gb5.lottie"
    loop
    autoplay
  />
);

const FetchingNextPage = () => <p>Loading...</p>;
