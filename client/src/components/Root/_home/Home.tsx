import MasonryInfiniteGallery from "./MansoryGrid/MansoryGrid";
import { handleGetElementServer } from "@/shared/apis/ElementServer";

export default async function Home() {
  return <MasonryInfiniteGallery fetchFn={handleGetElementServer} />;
}
