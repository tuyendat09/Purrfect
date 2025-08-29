import { createContext, useContext } from "react";

export interface DropMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DropMenuContext = createContext<DropMenuContextType | null>(null);

export function useDropMenuContext() {
  
  const context = useContext(DropMenuContext);

  if (!context) {
    throw new Error("DropMenu subcomponent must be used within <DropMenu>");
  }
  return context;
}
