import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  GetElementQuery,
  GetELementQueryResponse,
} from "@/shared/types/ElementAPI";
import useDebounce from "@/shared/hook/useDebouce";

type FetchFn = (params: GetElementQuery) => Promise<GetELementQueryResponse>;

interface UseInfiniteElementsOptions {
  fetchFn: FetchFn;
  queryKey?: string[];
  extraQuery?: Omit<GetElementQuery, "page" | "limit">;
  limit?: number;
}

export function useInfiniteElements({
  fetchFn,
  queryKey = ["masonryGrid"],
  extraQuery,
  limit = 20,
}: UseInfiniteElementsOptions) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return fetchFn({
        page: pageParam,
        limit,
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
