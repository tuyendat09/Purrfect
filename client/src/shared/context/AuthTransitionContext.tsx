"use client";

import React, { createContext, useContext } from "react";
import useAnimation from "../hook/useAnimation";

interface AuthTransitionContextType {
  animate: boolean;
  handleTransition: (pathName: string) => void;
}

const AuthTransitionContext = createContext<
  AuthTransitionContextType | undefined
>(undefined);

export const AuthTransitionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const animation = useAnimation();

  return (
    <AuthTransitionContext.Provider value={animation}>
      {children}
    </AuthTransitionContext.Provider>
  );
};

export const useAuthTransitionContext = (): AuthTransitionContextType => {
  const context = useContext(AuthTransitionContext);
  if (!context) {
    throw new Error(
      "useAuthTransitionContext must be used within an AuthTransitionProvider"
    );
  }
  return context;
};
