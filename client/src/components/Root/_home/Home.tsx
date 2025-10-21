import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MasonryInfiniteGallery from "./MansoryGrid/MansoryGrid";
import { handleGetElementServer } from "@/shared/apis/ElementServer";

export default async function Home() {
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
      <MasonryInfiniteGallery />;
    </HydrationBoundary>
  );
}
