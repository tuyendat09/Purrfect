import { createCluster } from "@/shared/apis/Cluster";
import { toast } from "react-hot-toast";

export async function handleCreateCluster(clusterName: string) {
  if (!clusterName) {
    return toast.error(
      "Looks like you missed a spot — album name can’t be empty!"
    );
  }

  const createClusterPromise = createCluster({ clusterName });

  await toast.promise(createClusterPromise, {
    loading: "Loading...",
    success: (succ) => succ.message,
    error: (err) => err.message,
  });
}
