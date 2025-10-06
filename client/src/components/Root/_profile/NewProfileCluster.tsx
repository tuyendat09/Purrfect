import useToggle from "@/shared/hook/useToggle";
import { Icon } from "@iconify/react/dist/iconify.js";
import { lazy } from "react";

const CreateClusterModal = lazy(
  () =>
    import("@/shared/components/Modal/CreateClustserModal/CreateClusterModal")
);

export default function NewProfileCluster() {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>
        <div className="flex flex-col w-[171px] sm:w-[312px] cursor-pointer">
          <div className="bg-gray-neutral-200 rounded-3xl group overflow-hidden relative flex justify-center items-center ">
            <div className="group-hover:bg-[#cccbc9] absolute  transition w-full h-full" />
            <Icon
              className="size-10 relative z-10"
              icon="ic:round-plus"
              width="24"
              height="24"
            />
            <div className="pb-[100%]" />
          </div>
        </div>
      </button>
      {toggle && (
        <CreateClusterModal
          handleToggleModal={handleToggle}
          isOpenModal={toggle}
        />
      )}
    </>
  );
}
