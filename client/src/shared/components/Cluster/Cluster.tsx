import Image from "next/image";
import NormalInput from "../Input/NormalInput";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Cluster() {
  return (
    <div>
      <div className="bg-gray-neutral-200 w-[310px] h-[400px] rounded-3xl p-4 overflow-hidden flex flex-col">
        {/* Header */}
        <div>
          <h1 className="font-serif text-center text-lg">Connect</h1>
          <div className="mt-4">
            <NormalInput
              placeholder="Search..."
              inputClassName="!bg-gray-neutral-300"
              name="search"
            />
          </div>
        </div>

        <div className="overflow-auto no-scrollbar">
          <ul className="space-y-2">
            {Array.from({ length: 10 }).map((_, index) => (
              // Cluster Item
              <li
                className="hover:bg-gray-neutral-400 p-2 rounded-2xl transition"
                key={index}
              >
                <button className="flex items-center w-full">
                  <div className="size-10 mr-4">
                    <div className="bg-red-500 w-full h-full rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://cdn.cosmos.so/b4aa7803-c3b0-4e71-a458-2f9dd3a208d5?format=webp&w=400"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <h1 className="text-[14px] font-semibold">
                      Test {index + 1}
                    </h1>
                    <h1 className="text-[13px] text-gray-neutral-600">
                      1 Element
                    </h1>
                  </div>
                  <p className="ml-auto">Added</p>
                </button>
              </li>
            ))}
            <div className="flex items-center gap-4">
              <button className="bg-black rounded-md p-2">
                <Icon
                  color="#ffffff"
                  icon="ic:round-plus"
                  width="24"
                  height="24"
                />
              </button>
              <p className="text-sm">New Cluster</p>
            </div>
          </ul>
        </div>
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
