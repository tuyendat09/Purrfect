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
      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
      role="menuitem"
    >
      {children}
    </li>
  );
}
