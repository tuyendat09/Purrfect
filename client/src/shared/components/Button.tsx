import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "black";
  size?: "sm" | "md" | "lg";
  ref?: React.RefObject<HTMLButtonElement | null>;
  isDisable?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white text-black hover:bg-[#cfcfd0]",
  secondary: "bg-gray-neutral-200 text-black hover:bg-gray-neutral-400",
  black: "bg-black text-white hover:bg-[#292929]",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
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
        "text-sm cursor-pointer font-bold text-center rounded-full transition duration-300",
        variantClasses[variant],
        sizeClasses[size],
        className,
        { "w-full": fullWidth }
      )}
    >
      {children}
    </button>
  );
}
