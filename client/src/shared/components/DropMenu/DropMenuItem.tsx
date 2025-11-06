interface DropMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  customHoverClass?: string;
}

export default function DropdownItem({
  children,
  onClick,
  className = "",
  customHoverClass = "",
}: DropMenuItemProps) {
  const hoverClass =
    customHoverClass !== "" ? customHoverClass : "hover:bg-gray-neutral-300";
  return (
    <li
      onClick={onClick}
      className={`px-2 py-2 ${hoverClass} rounded-[20px] cursor-pointer ${className}`}
      role="menuitem"
    >
      {children}
    </li>
  );
}
