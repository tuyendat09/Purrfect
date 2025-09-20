import CreateClusterModal from "@/shared/components/Modal/CreateClustserModal/CreateClusterModal";
import useToggle from "@/shared/hook/useToggle";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function NewProfileCluster() {
  const { toggle, handleToggle } = useToggle();
  return (
    <>
      <button onClick={handleToggle}>
        <div className="flex flex-col w-[171px] sm:w-[312px] cursor-pointer ">
          <div className="bg-gray-neutral-200 rounded-3xl group overflow-hidden relative flex justify-center items-center ">
            <div className="group-hover:bg-[#cccbc9] absolute   transition w-full h-full" />
            <Icon
              className="size-10 relative z-10"
              icon="ic:round-plus"
              width="24"
              height="24"
            />
            <div className="pb-[100%]" />
          </div>
          <div className="mt-2">
            <h3 className="font-semibold">Test</h3>
            <p className="text-[13px]">0 elements</p>
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
