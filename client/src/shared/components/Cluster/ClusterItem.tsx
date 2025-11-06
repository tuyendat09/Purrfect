import { Cluster } from "@/shared/types/Cluster";
import useAddElement from "./hook/useAddElement";
import Image from "next/image";

interface ClusterItemProps {
  cluster: Cluster;
  elementId?: string;
}

const ClusterItem = ({ cluster, elementId }: ClusterItemProps) => {
  const { handleAddElement } = useAddElement();

  return (
    <li className="hover:bg-gray-neutral-400 p-2 rounded-2xl transition">
      <button
        onClick={() => handleAddElement(elementId as string, cluster._id)}
        className="flex items-center w-full"
      >
        <div className="size-10 mr-4">
          <div className=" w-full h-full rounded-xl overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={cluster.createdBy.userPicture}
              alt={cluster.createdBy.username}
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-[14px] font-semibold">{cluster.clusterName}</h1>
          <h1 className="text-[13px] text-gray-neutral-600">
            {cluster.elementIds.length} Element
          </h1>
        </div>
        <p className="ml-auto">
          {cluster.elementIds.includes(elementId || "") ? "Added" : "Add"}
        </p>
      </button>
    </li>
  );
};

export default ClusterItem;
