import { useInfiniteQuery } from "@tanstack/react-query";
import { handleGetClusterServer } from "@/shared/apis/ClusterServer";

export default function useClusterProfile() {
  const query = useInfiniteQuery({
    queryKey: ["cluster"],
    queryFn: ({ pageParam = 1 as number }) => {
      return handleGetClusterServer({
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
