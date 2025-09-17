import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { handleGetElement } from "@/shared/apis/Element";
import { GetElementQuery } from "@/shared/types/ElementAPI";

export function useInfiniteElements(
  extraQuery?: Omit<GetElementQuery, "page" | "limit">
) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const query = useInfiniteQuery({
    queryKey: ["masonryImages", extraQuery],
    queryFn: async ({ pageParam = 1 as number }) => {
      return handleGetElement({
        page: pageParam,
        limit: 10,
        ...extraQuery,
      });
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

  const allImages = query.data?.pages.flatMap((page) => page.element) ?? [];

  return {
    ...query,
    allImages,
    loadMoreRef,
  };
}
