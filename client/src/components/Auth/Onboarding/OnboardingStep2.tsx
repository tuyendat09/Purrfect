"use client";
import "./Onboarding.css";
import Button from "@/components/UI/Button";
import { Icon } from "@iconify/react";
import OTPInput from "@/components/UI/Input/OTPInput";
import { useState } from "react";

export default function OnboardingFormStep2() {
  const [otp, setOtp] = useState<Array<number | undefined>>(
    Array(6).fill(undefined)
  );
  return (
    <div className="relative flex items-center grow-1 ">
      <div className="w-[440px] onboarding-form  h-[664px] mx-auto text-white flex justify-center flex-col items-center py-8 px-8">
        <form className="w-full mb-8 " action="">
          <p className="font-serif text-xl mb-4 text-center">
            Enter OTP we sent to your email
          </p>
          <OTPInput otp={otp} setOtp={setOtp} />
        </form>
        <Button className="absolute bottom-0 translate-y-8">
          <Icon icon="stash:chevron-right-duotone" width="24" height="24" />
        </Button>
      </div>
    </div>
  );
}
