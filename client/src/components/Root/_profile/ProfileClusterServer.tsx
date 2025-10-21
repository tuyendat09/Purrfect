import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ProfileCluster from "./ProfileCluster";
import { handleGetClusterServer } from "@/shared/apis/ClusterServer";

export default async function ProfileClusterServer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cluster"],
    queryFn: ({ pageParam = 1 }) => {
      return handleGetClusterServer({ page: pageParam, limit: 25 });
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
