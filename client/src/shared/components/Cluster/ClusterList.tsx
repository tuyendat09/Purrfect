import { Cluster } from "@/shared/types/Cluster";
import { memo } from "react";
import ClusterItem from "./ClusterItem";

interface ClusterListProps {
  clusters: Cluster[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  elementId: string;
}

const ClusterList = memo(
  ({ clusters, loadMoreRef, elementId }: ClusterListProps) => {
    return (
      <div className="overflow-auto no-scrollbar">
        <ul className="space-y-2">
          {clusters.map((cluster) => (
            <ClusterItem
              key={cluster._id}
              elementId={elementId}
              cluster={cluster}
            />
          ))}
          <div ref={loadMoreRef} className=" h-1 w-full" />
        </ul>
      </div>
    );
  }
);

ClusterList.displayName = "ClusterList";

export default ClusterList;
