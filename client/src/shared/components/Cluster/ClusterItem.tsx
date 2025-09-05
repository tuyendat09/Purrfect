import { Cluster } from "@/shared/types/Cluster";
import { memo } from "react";

interface ClusterItemProps {
  cluster: Cluster;
  index: number;
}

const ClusterItem = ({ cluster }: ClusterItemProps) => {
  return (
    <li className="hover:bg-gray-neutral-400 p-2 rounded-2xl transition">
      <button className="flex items-center w-full">
        <div className="size-10 mr-4">
          <div className="bg-red-500 w-full h-full rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={cluster.createdBy.userPicture}
              alt={cluster.createdBy.userFullname}
            />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-[14px] font-semibold">{cluster.clusterName}</h1>
          <h1 className="text-[13px] text-gray-neutral-600">
            {cluster.elementIds.length} Element
          </h1>
        </div>
        <p className="ml-auto">Added</p>
      </button>
    </li>
  );
};

export default ClusterItem;
