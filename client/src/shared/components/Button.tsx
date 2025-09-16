import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "black" | "gray";
  size?: "sm" | "md" | "lg";
  ref?: React.RefObject<HTMLButtonElement | null>;
  isDisable?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<
  NonNullable<ButtonProps["variant"]>,
  { base: string; hover: string }
> = {
  primary: { base: "bg-white text-black", hover: "hover:bg-[#cfcfd0]" },
  gray: { base: "bg-[#e8e7e5] text-black", hover: "hover:bg-[#edecea]" },
  secondary: {
    base: "bg-gray-neutral-200 text-black",
    hover: "hover:bg-gray-neutral-400",
  },
  black: { base: "bg-black text-white", hover: "hover:bg-[#292929]" },
  success: { base: "bg-green-600 text-white", hover: "hover:bg-green-700" },
  danger: { base: "bg-red-600 text-white", hover: "hover:bg-red-700" },
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-[13px]",
  md: "px-5 py-3 text-md",
  lg: "px-6 py-4 text-lg",
};

export default function Button({
  children,
  className,
  variant = "primary",
  ref,
  size = "sm",
  isDisable,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isDisable}
      {...props}
      ref={ref}
      className={clsx(
        "text-sm font-bold text-center rounded-full transition duration-300",
        variantClasses[variant].base,
        !isDisable && variantClasses[variant].hover,
        sizeClasses[size],
        className,
        {
          "w-full": fullWidth,
          "cursor-normal opacity-50": isDisable,
          "cursor-pointer": !isDisable,
        }
      )}
    >
      {children}
    </button>
  );
}
