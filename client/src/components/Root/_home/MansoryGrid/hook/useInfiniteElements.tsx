import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { GetElementQuery } from "@/shared/types/ElementAPI";
import useDebounce from "@/shared/hook/useDebouce";
import { handleGetElementServer } from "@/shared/apis/ElementServer";

export function useInfiniteElements(
  extraQuery?: Omit<GetElementQuery, "page" | "limit">
) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const query = useInfiniteQuery({
    queryKey: ["masonryGrid"],
    queryFn: async ({ pageParam = 1 }) => {
      return handleGetElementServer({
        page: pageParam,
        limit: 20,
        ...extraQuery,
      });
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const debouncedInView = useDebounce(isInView, 300);

  useEffect(() => {
    if (debouncedInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [debouncedInView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allImages = query.data?.pages.flatMap((page) => page.element) ?? [];

  return {
    ...query,
    allImages,
    loadMoreRef,
  };
}
