import ClaimUsername from "@/components/Auth/_claim-username/ClaimUsername";
import { getUserServer } from "@/components/Root/_profile/utils/GetUser";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Purrfect - Edit Username`,
    description: `Purrfect - Edit Username.`,
    openGraph: {
      title: `Purrfect - Edit Username`,
    },
  };
}

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUserServer,
    staleTime: 1000 * 60 * 10,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClaimUsername />
    </HydrationBoundary>
  );
}
