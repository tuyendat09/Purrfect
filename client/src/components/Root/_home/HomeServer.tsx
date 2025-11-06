import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { handleGetElementServer } from "@/shared/apis/ElementServer";
import Home from "./Home";

export default async function HomeServer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["masonryGrid"],
    queryFn: ({ pageParam = 1 }) => {
      return handleGetElementServer({ page: pageParam, limit: 20 });
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />;
    </HydrationBoundary>
  );
}
