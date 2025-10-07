import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ProfileCluster from "./ProfileCluster";

export default async function ProfileClusterServer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cluster"],
    queryFn: async ({ pageParam = 1 }) => {
      const { getClusterServer } = await import("./utils/GetClusterServer");
      return getClusterServer({ page: pageParam, limit: 25 });
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfileCluster />
    </HydrationBoundary>
  );
}
