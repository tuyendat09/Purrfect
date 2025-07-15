"use client";

import Logo from "@/shared/components/Logo";
import { useAuthTransitionContext } from "../../../shared/context/AuthTransitionContext";
import { clsx } from "clsx";

export default function LoginFormHeader() {
  const { animate, handleTransition } = useAuthTransitionContext();

  return (
    <div className="mb-[59px] flex flex-col items-center">
      <Logo className="w-10" />
      <div className="text-center">
        <h1 className="text-2xl mt-6 font-serif">Log in</h1>
        <p className="mt-1 text-sm">
          or{" "}
          <span
            onClick={() => handleTransition("onboarding")}
            className={clsx(
              "cursor-pointer underline text-gray-text inline-block transition-all duration-300",
              { "opacity-0 -translate-y-2": animate }
            )}
          >
            create an account
          </span>
        </p>
      </div>
    </div>
  );
}
