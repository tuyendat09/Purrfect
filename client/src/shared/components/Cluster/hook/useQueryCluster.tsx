"use client";

import { handleQueryClutser } from "@/shared/apis/Cluster";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function useQueryCluster(search: string) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const query = useInfiniteQuery({
    queryKey: ["cluster", search],
    queryFn: async ({ pageParam = 1 }) => {
      return handleQueryClutser({
        page: pageParam,
        limit: 5,
        ...(search ? { name: search } : {}),
      });
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage?.result.hasNextPage ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allCluster =
    query.data?.pages.flatMap((page) => page.result.clusters) ?? [];

  return {
    allCluster,
    loadMoreRef,
    ...query,
  };
}
