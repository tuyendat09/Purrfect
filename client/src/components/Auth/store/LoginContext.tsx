"use client"; // nếu dùng Next.js App Router

import React, { createContext, useContext } from "react";
import useAnimation from "../hook/useAnimation";

interface AnimationContextType {
  animate: boolean;
  handleTransition: (pathName: string) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const animation = useAnimation();

  return (
    <AnimationContext.Provider value={animation}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider"
    );
  }
  return context;
};
