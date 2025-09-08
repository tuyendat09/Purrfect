import { clsx } from "clsx";

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <div className={clsx("text-xl font-semibold mb-4", className)}>
      {children}
    </div>
  );
}
