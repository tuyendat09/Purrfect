"use client";
import { useEffect, useRef, useState } from "react";
import { DropMenuContext } from "./DropMenuContext";
import { clsx } from "clsx";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export default function DropMenu({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} className={clsx("relative inline-block", className)}>
        {children}
      </div>
    </DropMenuContext.Provider>
  );
}
