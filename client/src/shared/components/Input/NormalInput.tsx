"use client";

import { clsx } from "clsx";

interface NormalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorMessage?: string;
  classNames?: string;
  endContent?: React.ReactNode;
  borderRadius?: "sm" | "md" | "lg" | "xl" | "full";
  ref?: React.Ref<HTMLInputElement>;
  inputClassName?: string;
}

const borderRadiusClass: Record<
  NonNullable<NormalInputProps["borderRadius"]>,
  string
> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export default function NormalInput({
  name,
  errorMessage,
  classNames = "",
  endContent,
  borderRadius = "full",
  ref,
  inputClassName,
  ...inputProps
}: NormalInputProps) {
  return (
    <div className={`relative mb-4 ${classNames}`}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}
      <div
        className={clsx(
          "bg-gray-neutral-200 px-6",
          borderRadiusClass[borderRadius],
          inputClassName
        )}
      >
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            {...inputProps}
            name={name}
            className="text-sm w-full py-3 focus:outline-none"
            type="text"
          />
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 text-white mt-1">
        {endContent}
      </div>
    </div>
  );
}
