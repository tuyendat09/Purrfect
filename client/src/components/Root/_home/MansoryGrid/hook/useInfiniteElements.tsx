import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { handleGetElement } from "@/shared/apis/Element";
import { GetElementQuery } from "@/shared/types/ElementAPI";
import useDebounce from "@/shared/hook/useDebouce";

export function useInfiniteElements(
  extraQuery?: Omit<GetElementQuery, "page" | "limit">
) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  // const stableQuery = useMemo(() => extraQuery, [JSON.stringify(extraQuery)]);

  const query = useInfiniteQuery({
    queryKey: ["masonryImages"],
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

  const debouncedInView = useDebounce(isInView, 300);

  useEffect(() => {
    if (debouncedInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [debouncedInView, hasNextPage, isFetchingNextPage]);

  const allImages = query.data?.pages.flatMap((page) => page.element) ?? [];

  return {
    ...query,
    allImages,
    loadMoreRef,
  };
}
