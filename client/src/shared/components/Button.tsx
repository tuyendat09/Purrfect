import { clsx } from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  ref?: React.RefObject<HTMLButtonElement | null>;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white text-black hover:bg-[#cfcfd0]",
  secondary: "bg-gray-neutral-200 text-black hover:bg-gray-neutral-400",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  className,
  variant = "primary",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        "p-4 text-md cursor-pointer font-bold text-center rounded-full transition duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
