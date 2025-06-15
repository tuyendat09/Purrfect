import FloatingInput from "@/shared/components/Input/FloatingInput";
import LoginFormHeader from "./LoginFormHeader";
import Button from "@/shared/components/Button";
import { clsx } from "clsx";

export default function LoginForm() {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center flex-1 h-full border-l border-[#242424]",
        "transition-opacity duration-300 delay-200"
      )}
    >
      <div className="w-full max-w-[363px] ml-8">
        <LoginFormHeader />
        <form>
          <FloatingInput label="Email" />
          <FloatingInput type="password" label="Password" />
          <Button className="w-full mb-3">Enter</Button>
        </form>
        <p className="text-sm text-center text-gray-text mb-3">
          Forgot password?
        </p>
      </div>
    </div>
  );
}
