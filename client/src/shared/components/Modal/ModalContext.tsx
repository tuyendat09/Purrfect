import { createContext, useContext } from "react";

interface ModalContextProps {
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export function useModalContext() {
  const ctx = useContext(ModalContext);
  
  if (!ctx)
    throw new Error("Modal subcomponent must be used inside <ModalContent>");
  return ctx;
}
