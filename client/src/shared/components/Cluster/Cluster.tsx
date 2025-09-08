import useQueryCluster from "./hook/useQueryCluster";
import ClusterList from "./ClusterList";
import ClusterFooter from "./ClusterFooter";
import { useState } from "react";
import useDebounce from "@/shared/hook/useDebouce";
import ClusterHeader from "./ClusterHeader";

interface ClusterProps {
  onClick?: () => void;
}

export default function Cluster({ onClick }: ClusterProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { allCluster, loadMoreRef } = useQueryCluster(debouncedSearch);

  return (
    <div>
      <div className="bg-gray-neutral-200 w-[310px] h-[400px] rounded-3xl p-4 overflow-hidden flex flex-col ">
        <ClusterHeader search={search} onSearchChange={setSearch} />
        <ClusterList clusters={allCluster} loadMoreRef={loadMoreRef} />
        <ClusterFooter onClick={onClick} />
      </div>
    </div>
  );
}

// https://cdn.cosmos.so/b4aa7803-c3b0-4e71-a458-2f9dd3a208d5?format=webp&w=400
{
  /* <Image
                    src="https://cdn.cosmos.so/b4aa7803-c3b0-4e71-a458-2f9dd3a208d5?format=webp&w=400"
                    alt="Mô tả ảnh"
                    width={180} // Giá trị lớn nhất bạn muốn hiển thị
                    height={120} // Tỷ lệ phù hợp hoặc tùy ý
                    sizes={`
            (max-width: 768px) and (min-resolution: 4dppx) 15px,
            (max-width: 768px) and (min-resolution: 3dppx) 20px,
            (max-width: 768px) and (min-resolution: 2dppx) 30px,
            (max-width: 768px) 60px,
            (max-width: 1440px) and (min-resolution: 2dppx) 60px,
            (max-width: 1440px) 120px,
            (min-width: 1441px) 180px,
            60px
          `}
                  /> */
}
