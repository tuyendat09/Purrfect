export function ProfileClusterItemSkeleton() {
  return (
    <div className="flex flex-col w-[171px] sm:w-[312px]">
      <div className="bg-gray-neutral-200 rounded-3xl overflow-hidden relative flex justify-center items-center animate-pulse">
        <div className="pb-[100%]" />
      </div>

      <div className="mt-2 space-y-1">
        <div className="h-4 w-2/3 bg-gray-neutral-200 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-gray-neutral-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
