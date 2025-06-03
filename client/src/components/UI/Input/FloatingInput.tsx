"use client";

import { useState } from "react";
import { EyesOpen, EyesClose } from "@/components/UI/Icon/index"; // Đảm bảo bạn import đúng icon

interface FloatingInputProps {
  label: string;
  type?: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  errorMessage?: string;
  classNames?: string;
  endContent?: React.ReactNode;
}

const PasswordToggleIcon = ({ show }: { show: boolean }) =>
  show ? (
    <EyesOpen className="size-5 text-gray-text cursor-pointer pointer-events-auto" />
  ) : (
    <EyesClose className="size-5 text-gray-text cursor-pointer pointer-events-auto" />
  );

export default function FloatingInput({
  label,
  errorMessage,
  classNames = "",
  endContent,
  type = "text",
}: FloatingInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword((prev) => !prev);
    console.log("click");
  }

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative mb-4 ${classNames}`}>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}
      <input
        type={inputType}
        id={label}
        placeholder=" "
        className="peer block w-full rounded-full px-6 py-5 text-sm text-white bg-[#1d1d1d] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-[#aaaaaa] duration-300 transform scale-75 cursor-text -translate-y-4 top-5 z-0 origin-[0] start-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3.5
          peer-[&:not(:placeholder-shown)]:scale-75
          peer-[&:not(:placeholder-shown)]:-translate-y-3.5"
      >
        {label}
      </label>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 text-white mt-1">
        {isPassword ? (
          <button type="button" onClick={handleTogglePassword}>
            <PasswordToggleIcon show={showPassword} />
          </button>
        ) : (
          endContent
        )}
      </div>
    </div>
  );
}
