import { AnimatePresence, motion } from "framer-motion";
import { useDropMenuContext } from "./DropMenuContext";
import { clsx } from "clsx";

interface DropDownProps {
  children: React.ReactNode;
  className?: string;
  position?: "left" | "center" | "right";
}

const positionClasses: Record<
  NonNullable<DropDownProps["position"]>,
  string
> = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
};

export default function DropDown({
  children,
  className,
  position = "right",
}: DropDownProps) {
  const { isOpen } = useDropMenuContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={clsx(
            "absolute right-0 mt-6 w-48 bg-gray-neutral-200 border-gray-neutral-300 border-[1px] rounded-xl shadow-xl z-50",
            className,
            positionClasses[position]
          )}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
