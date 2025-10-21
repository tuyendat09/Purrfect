import { Element } from "@/shared/types/ElementAPI";
import Image from "next/image";
import { memo, useState } from "react";

import Link from "next/link";
import { MansoryClusterButton, MansoryLikeButton } from "./MansoryButton";
import { clsx } from "clsx";

interface MansoryItemProps {
  Element: Element;
}

const MansoryItem = memo(function MansoryItem({ Element }: MansoryItemProps) {
  const { isLiked, _id } = Element;
  const [isLikedState, setIsLiked] = useState<boolean | undefined>(isLiked);
  const [openCluster, setOpenCluster] = useState<boolean>(false);




  return (
    <div className="relative group">
      <Image
        priority
        alt="Image"
        width={500}
        height={500}
        key={_id}
        src={Element.previewImageUrl}
        style={{ width: "100%", height: "auto" }}
      />

      <div
        className={clsx(
          "group-hover:opacity-100 opacity-0 transition duration-100 absolute top-4 right-4 z-10",
          openCluster ? "opacity-100" : "opacity-0"
        )}
      >
        <MansoryLikeButton
          isLiked={isLikedState}
          setIsLiked={setIsLiked}
          elementId={_id}
        />
      </div>

      <MansoryClusterButton
        elementId={_id}
        openCluster={openCluster}
        setOpenCluster={setOpenCluster}
      />
      <Link
        href={`/element/${_id}`}
        className={clsx(
          "absolute w-full h-full top-0 left-0  opacity-0 group-hover:opacity-50 cursor-zoom-in transition duration-150 bg-black",
          openCluster ? "bg-black opacity-50" : ""
        )}
      />
    </div>
  );
});

export default MansoryItem;
