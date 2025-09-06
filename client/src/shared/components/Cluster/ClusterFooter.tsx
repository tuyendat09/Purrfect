import { Icon } from "@iconify/react/dist/iconify.js";
import { memo, useState } from "react";
import CreateClusterModal from "../Modal/CreateClustserModal/CreateClusterModal";

function ClusterFooter() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  function handleToggleModal(): void {
    setIsOpenModal((prevState) => !prevState);
  }
  return (
    <div
      onClick={() => handleToggleModal()}
      className="flex items-center gap-4 hover:bg-gray-neutral-400 p-2 rounded-2xl transition cursor-pointer"
    >
      <button className="bg-black rounded-md p-2">
        <Icon color="#ffffff" icon="ic:round-plus" width="24" height="24" />
      </button>
      <p className="text-sm font-semibold">New Cluster</p>
      {isOpenModal && (
        <CreateClusterModal
          isOpenModal={isOpenModal}
          handleToggleModal={handleToggleModal}
        />
      )}
    </div>
  );
}

export default memo(ClusterFooter);
