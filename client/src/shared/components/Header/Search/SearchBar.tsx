import { MagicSpark } from "@/shared/components/Icon";

export default function SearchBar() {
  return (
    <div className="bg-gray-neutral-200 px-3 w-[320px] xl:w-[480px] lg:w-[380px] rounded-xl ">
      <div className="flex items-center gap-2">
        <MagicSpark className="size-4 mt-1 text-gray-neutral-400" />
        <input
          placeholder="Search something beach"
          className="text-sm w-full py-3 focus:outline-none"
          type="text"
        />
      </div>
    </div>
  );
}
