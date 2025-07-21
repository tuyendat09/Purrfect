interface DropMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function DropdownItem({
  children,
  onClick,
  className = "",
}: DropMenuItemProps) {
  return (
    <li
      onClick={onClick}
      className={`px-2 py-2 hover:bg-gray-neutral-300 rounded-[20px] cursor-pointer ${className}`}
      role="menuitem"
    >
      {children}
    </li>
  );
}
