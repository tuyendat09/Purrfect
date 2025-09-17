import Logo from "@/shared/components/Logo";
import Link from "next/link";

export default function ProfileClusterItem() {
  return (
    <Link href="/">
      <div className="flex flex-col w-[171px] sm:w-[290px] cursor-pointer ">
        <div className="bg-gray-neutral-200 rounded-2xl group overflow-hidden relative flex justify-center items-center ">
          <div className="group-hover:bg-[#cccbc9] absolute   transition w-full h-full" />
          <Logo className="size-6 relative z-10" />
          <div className="pb-[100%]" />
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">Test</h3>
          <p className="text-[13px]">0 elements</p>
        </div>
      </div>
    </Link>
  );
}
