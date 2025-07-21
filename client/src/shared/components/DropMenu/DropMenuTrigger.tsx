import { useDropMenuContext } from "./DropMenuContext";

interface DropMenuTriggerProps {
  children: React.ReactNode;
}



export default function DropMenuTrigger({ children }: DropMenuTriggerProps) {
  const { isOpen, setIsOpen } = useDropMenuContext();

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {children}
    </div>
  );
}
