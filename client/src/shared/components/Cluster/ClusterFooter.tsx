import { Icon } from "@iconify/react/dist/iconify.js";
import { memo } from "react";
import CreateClusterModal from "../Modal/CreateClustserModal/CreateClusterModal";

function ClusterFooter() {
  return (
    <CreateClusterModal>
      <div className="flex items-center gap-4 hover:bg-gray-neutral-400 p-2 rounded-2xl transition cursor-pointer">
        <button className="bg-black rounded-md p-2">
          <Icon color="#ffffff" icon="ic:round-plus" width="24" height="24" />
        </button>
        <p className="text-sm font-semibold">New Cluster</p>
      </div>
    </CreateClusterModal>
  );
}

export default memo(ClusterFooter);
