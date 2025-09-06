import Button from "@/shared/components/Button";
import useLikeElement from "./hook/useLikeElement";
import { lazy, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { clsx } from "clsx";
const Cluster = lazy(() => import("@/shared/components/Cluster/Cluster"));

interface MasonryButtonProps {
  elementId: string;
  isLiked?: boolean;
  setIsLiked?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export function MansoryLikeButton({
  isLiked,
  elementId,
  setIsLiked,
}: MasonryButtonProps) {
  const { likeElement } = useLikeElement();

  async function handleLikeElement(elementId: string) {
    const success = await likeElement(elementId);
    if (success && setIsLiked) {
      setIsLiked((prevState: boolean | undefined) => !prevState);
    }
  }

  return (
    <Button onClick={() => handleLikeElement(elementId)}>
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}

interface MansoryClusterButtonProps {
  openCluster: boolean;
  setOpenCluster: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MansoryClusterButton({
  openCluster,
  setOpenCluster,
}: MansoryClusterButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  function toggleOpenCluster(e: React.MouseEvent) {
    e.stopPropagation(); // Ngăn lan click
    setOpenCluster((prevState) => !prevState);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenCluster(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenCluster]);

  return (
    <div ref={ref} className="z-40 absolute top-4 left-4">
      <div
        onClick={toggleOpenCluster}
        className={clsx(
          "flex items-center text-white gap-1 font-bold cursor-pointer group-hover:opacity-100 opacity-0 transition duration-100",
          openCluster && "opacity-100"
        )}
      >
        <button className="cursor-pointer">Cluster</button>
        <Icon
          className="size-5"
          icon="mi:chevron-down"
          width="24"
          height="24"
        />
      </div>

      <div
        className={clsx(
          "absolute -left-3 top-12",
          openCluster ? "block" : "hidden"
        )}
      >
        {openCluster && <Cluster />}
      </div>
    </div>
  );
}
