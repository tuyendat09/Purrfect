"use client";

import React, { createContext, useContext, useState } from "react";

interface OnboardingStepContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const OnboardingStepContext = createContext<
  OnboardingStepContextType | undefined
>(undefined);

export const OnboardingStepProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <OnboardingStepContext.Provider value={{ step, setStep, email, setEmail }}>
      {children}
    </OnboardingStepContext.Provider>
  );
};

export const useOnboardingStepContext = (): OnboardingStepContextType => {
  const context = useContext(OnboardingStepContext);
  if (!context) {
    throw new Error(
      "useOnboardingStepContext must be used within an OnboardingStepProvider"
    );
  }
  return context;
};
