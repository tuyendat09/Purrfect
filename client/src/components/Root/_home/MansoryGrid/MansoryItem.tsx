import Button from "@/shared/components/Button";
import { Element } from "@/shared/types/ElementAPI";
import Image from "next/image";
import useLikeElement from "./hook/useLikeElement";
import { memo, useEffect, useState } from "react";

import Link from "next/link";

interface MansoryItemProps {
  Element: Element;
}

interface MasonryButtonProps {
  elementId: string;
  isLiked?: boolean;
  setIsLiked?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

function MasonryButton({ isLiked, elementId, setIsLiked }: MasonryButtonProps) {
  const { likeElement } = useLikeElement();

  async function handleLikeElement(elementId: string) {
    const success = await likeElement(elementId);
    if (success && setIsLiked) {
      setIsLiked((prevState: boolean | undefined) => !prevState);
    }
  }

  return (
    <Button
      onClick={() => handleLikeElement(elementId)}
      className="group-hover:opacity-100 opacity-0 transition duration-100 absolute top-4 right-4 z-10 "
    >
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}

const MansoryItem = memo(function MansoryItem({ Element }: MansoryItemProps) {
  const { isLiked, _id } = Element;

  const [isLikedState, setIsLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsLiked(isLiked);
  }, [isLiked]);

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
      <MasonryButton
        isLiked={isLikedState}
        setIsLiked={setIsLiked}
        elementId={_id}
      />
      <p className="text-white group-hover:opacity-100 opacity-0 transition duration-100 absolute top-4 left-4 z-10 ">
        Cluster
      </p>
      <Link
        href={`/element/${_id}`}
        className="absolute w-full h-full top-0 left-0  opacity-0 group-hover:opacity-50 cursor-zoom-in transition duration-150 bg-black "
      />
    </div>
  );
});

export default MansoryItem;
