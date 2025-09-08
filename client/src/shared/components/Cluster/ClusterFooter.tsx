import { Icon } from "@iconify/react/dist/iconify.js";
import { memo } from "react";

interface ClusterFooterProps {
  onClick?: () => void;
}

function ClusterFooter({ onClick }: ClusterFooterProps) {
  return (
    <>
      <div
        onClick={onClick}
        className="flex items-center gap-4 hover:bg-gray-neutral-400 p-2 rounded-2xl transition cursor-pointer"
      >
        <button className="bg-black rounded-md p-2 cursor-pointer">
          <Icon color="#ffffff" icon="ic:round-plus" width="24" height="24" />
        </button>
        <p className="text-sm font-semibold">New Cluster</p>
      </div>
    </>
  );
}

export default memo(ClusterFooter);
