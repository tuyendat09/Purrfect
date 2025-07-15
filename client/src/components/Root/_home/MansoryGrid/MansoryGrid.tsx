"use client";

import { Masonry } from "react-plock";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";

interface MasonryImage {
  id: string;
  src: string;
  width: number;
  height: number;
}

// Giả API
const fetchImages = async ({ pageParam = 1 }): Promise<MasonryImage[]> => {
  await new Promise((r) => setTimeout(r, 1000));

  return Array.from({ length: 10 }).map((_, i) => {
    const width = 250;
    // Chiều cao random từ 200 tới 700 để khác biệt rõ
    const height = 200 + Math.floor(Math.random() * 300);

    return {
      id: `img-${pageParam}-${i}`,
      src: `https://picsum.photos/${width}/${height}?random=${
        pageParam * 10 + i
      }`,
      width,
      height,
    };
  });
};

export default function MasonryInfiniteGallery() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["masonryImages"],
    queryFn: fetchImages,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length >= 5) return undefined; // max 5 pages
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  const allImages = data?.pages.flat() ?? [];

  return (
    <InfiniteScroll
      dataLength={allImages.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={"Loading..."}
    >
      <Masonry
        items={allImages}
        config={{
          columns: [1, 2, 5],
          gap: [24, 12, 60],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => (
          <img
            key={idx}
            src={item.src}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      />
    </InfiniteScroll>
  );
}
