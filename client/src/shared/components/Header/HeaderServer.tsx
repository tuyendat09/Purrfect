import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import Header from "./Header";
import { getUserServer } from "@/components/Root/_profile/utils/GetUser";

export default async function HeaderServer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUserServer,
    staleTime: 1000 * 60 * 10,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
    </HydrationBoundary>
  );
}
