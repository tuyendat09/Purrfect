"use client";
import FloatingInput from "@/shared/components/Input/FloatingInput";
import FormHeader from "@/shared/components/Form/FormHeader";
import Button from "@/shared/components/Button";
import { clsx } from "clsx";
import useOnboardingStep1 from "./hooks/useOnboardingStep1";
import { useOnboardingStepContext } from "./context/OnboardingStepContext";

export default function OnboardingFormStep1() {
  const { formik, isFormHidden, isButtonHidden } = useOnboardingStep1();

  const { step } = useOnboardingStepContext();

  if (step !== 1) return null;

  return (
    <div
      className={clsx("flex items-center grow-1 transition duration-300 ", {
        "opacity-0": isFormHidden,
      })}
    >
      <div className="w-[440px] onboarding-form  h-[664px] mx-auto text-white flex flex-col py-8 px-8">
        <FormHeader
          className="h-1/3 mb-auto"
          logo
          title="Welcome to Purrfect"
          subtitle="Begin by creating an account"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="w-full mb-8  h-full flex flex-col justify-center"
        >
          <FloatingInput
            name="email"
            onChange={formik.handleChange}
            label="Email"
          />
          <FloatingInput
            name="userFullname"
            onChange={formik.handleChange}
            label="Full name"
          />
          <FloatingInput
            onChange={formik.handleChange}
            name="password"
            type="password"
            label="Password"
          />
          <div className="text-center text-[12px] text-gray-neutral-600">
            <p>By continuing, you agree to our </p>
            <p>
              <span className="text-gray-neutral-400">Terms</span> and{" "}
              <span className="text-gray-neutral-400">Privacy Policy</span>
            </p>
          </div>
          <button />
        </form>
        <Button
          size="lg"
          onClick={() => formik.handleSubmit()}
          type="button"
          className={clsx("w-full duration-500 mt-auto", {
            "scale-0": isButtonHidden,
          })}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
