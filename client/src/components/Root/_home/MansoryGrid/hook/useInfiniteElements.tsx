/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion"; // hoặc @mantine/hooks, tuỳ bạn đang dùng
import { handleGetElement } from "@/shared/apis/Element";

export function useInfiniteElements() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const query = useInfiniteQuery({
    queryKey: ["masonryImages"],
    queryFn: async ({ pageParam = 1 as any }) => {
      return handleGetElement({ page: pageParam, limit: 20 });
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Gom tất cả images
  const allImages = query.data?.pages.flatMap((page) => page.element) ?? [];

  return {
    ...query, // giữ nguyên để lấy isLoading, error, v.v.
    allImages,
    loadMoreRef,
  };
}
