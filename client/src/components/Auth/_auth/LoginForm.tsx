"use client";

import FloatingInput from "@/shared/components/Input/FloatingInput";
import LoginFormHeader from "./LoginFormHeader";
import Button from "@/shared/components/Button";
import { clsx } from "clsx";
import useLogin from "./hooks/useLogin";

export default function LoginForm() {
  const { formik, mutation } = useLogin();
  
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center flex-1 h-full border-l border-[#242424]",
        "transition-opacity duration-300 delay-200"
      )}
    >
      <div className="w-full max-w-[363px] ml-8">
        <LoginFormHeader />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.submitForm();
          }}
        >
          <FloatingInput
            onChange={formik.handleChange}
            name="email"
            label="Email"
          />
          <FloatingInput
            onChange={formik.handleChange}
            name="password"
            type="password"
            label="Password"
          />
          <Button
            isDisable={mutation.isPending}
            size="lg"
            fullWidth
            className="mb-3"
          >
            Enter
          </Button>
        </form>
        <div className="text-sm text-center text-gray-text mb-3">
          <button className="cursor-pointer">Forgot password?</button>
        </div>
      </div>
    </div>
  );
}
