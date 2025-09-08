import { Cluster } from "@/shared/types/Cluster";
import { memo } from "react";
import ClusterItem from "./ClusterItem";

interface ClusterListProps {
  clusters: Cluster[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
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

ClusterList.displayName = "ClusterList";

export default ClusterList;
