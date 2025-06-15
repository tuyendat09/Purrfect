import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useAnimation() {
  const router = useRouter();
  const [animate, setAnimate] = useState<boolean>(false);

  const handleTransition = (pathName: string) => {
    setAnimate(true);

    setTimeout(() => {
      router.push(pathName);
    }, 500);
  };

  return {
    animate,
    handleTransition,
  };
}
