import { useInfiniteQuery } from "@tanstack/react-query";

export default function useClusterProfile() {
  const query = useInfiniteQuery({
    queryKey: ["cluster"],
    queryFn: async ({ pageParam = 1 as number }) => {
      const { getClusterServer } = await import("../utils/GetClusterServer");
      return getClusterServer({
        page: pageParam,
        limit: 25,
      });
    },
    getNextPageParam: (lastPage, page) =>
      lastPage.result.hasNextPage ? page.length + 1 : undefined,
    initialPageParam: 1,
  });

  const allClusers =
    query.data?.pages.flatMap((page) => page.result.clusters) ?? [];

  return { allClusers, ...query };
}
