import Logo from "@/shared/components/Logo";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProfileClusterItemProps {
  clusterName: string;
  clusterThumbnail?: string;
  clusterElement: number;
}

export default function ProfileClusterItem({
  clusterName,
  clusterThumbnail,
  clusterElement,
}: ProfileClusterItemProps) {
  const params = useParams<{ username: string }>();

  return (
    <Link href={`${params.username}/${clusterName}`}>
      <div className="flex flex-col w-[171px] sm:w-[312px] cursor-pointer ">
        <div className="bg-gray-neutral-200 rounded-3xl group overflow-hidden relative flex justify-center items-center ">
          <div className="group-hover:bg-[#cccbc9] absolute   transition w-full h-full" />
          <Logo className="size-6 relative z-10" />
          <div className="pb-[100%]" />
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">{clusterName}</h3>
          <p className="text-[13px]">{clusterElement} elements</p>
        </div>
      </div>
    </Link>
  );
}
