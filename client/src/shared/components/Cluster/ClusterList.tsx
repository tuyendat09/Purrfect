import { Cluster } from "@/shared/types/Cluster";
import { memo } from "react";
import ClusterItem from "./ClusterItem";

interface ClusterListProps {
  clusters: Cluster[];
  loadMoreRef?: any;
}

const ClusterList = memo(({ clusters, loadMoreRef }: ClusterListProps) => {
  return (
    <div className="overflow-auto no-scrollbar">
      <ul className="space-y-2">
        {clusters.map((cluster, index) => (
          <ClusterItem key={index} cluster={cluster} index={index} />
        ))}
        <div ref={loadMoreRef} className=" h-1 w-full" />
      </ul>
    </div>
  );
});

export default ClusterList;
