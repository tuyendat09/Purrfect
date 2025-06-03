"use client";
import FloatingInput from "@/components/UI/Input/FloatingInput";
import "./Onboarding.css";
import OnboardingFormHeader from "./OnboardingFormHeader";
import Button from "@/components/UI/Button";

export default function OnboardingForm() {
  return (
    <div className="flex items-center grow-1 ">
      <div className="w-[440px] onboarding-form  h-[664px] mx-auto text-white flex justify-between flex-col items-center py-8 px-8">
        <OnboardingFormHeader />
        <form className="w-full mb-8" action="">
          <FloatingInput label="Email" />
          <FloatingInput type="password" label="Password" />
          <div className="text-center text-[12px] text-[#69696c]">
            <p>By continuing, you agree to our </p>
            <p>
              <span className="text-[#aaaaaa]">Terms</span> and{" "}
              <span className="text-[#aaaaaa]">Privacy Policy</span>
            </p>
          </div>
        </form>
        <Button className="w-full">Continute</Button>
      </div>
    </div>
  );
}
