"use client";
import "./Onboarding.css";
import Button from "@/shared/components/Button";
import { Icon } from "@iconify/react";
import OTPInput from "@/shared/components/Input/OTPInput";
import { useState, useRef, useEffect } from "react";
import { useOnboardingStepContext } from "../context/OnboardingStepContext";
import { gsap } from "gsap";
import useOnboardingStep2 from "../hooks/useOnboardingStep2";

export default function OnboardingFormStep2() {
  const { formik } = useOnboardingStep2();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const { step } = useOnboardingStepContext();
  const [otp, setOtp] = useState<Array<number | undefined>>(
    Array(6).fill(undefined)
  );

  useEffect(() => {
    if (step === 2) {
      const tl = gsap.timeline();

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      });

      tl.to(
        inputRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.3"
      );

      tl.to(
        buttonRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "<"
      );

      tl.to(
        headerRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        "<"
      );
    }
  }, [step]);

  // Render this step only if it's step 2
  if (step !== 2) return null;

  async function handleSubmit() {
    const otpCode = otp.join("");
    console.log(otpCode);
    await formik.setFieldValue("otp", Number(otpCode));
    formik.handleSubmit();
  }

  return (
    <div ref={containerRef} className="flex items-center grow-1 opacity-0">
      <div className="w-[440px] z-10 onboarding-form  h-[664px] mx-auto text-white flex justify-center flex-col items-center py-8 px-8">
        <form
          className="w-full mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <p
            ref={headerRef}
            className="font-serif text-xl mb-4 text-center opacity-0"
          >
            Enter OTP we sent to your email
          </p>
          <div ref={inputRef} className="translate-y-4 opacity-0">
            <OTPInput otp={otp} setOtp={setOtp} />
          </div>
          <div className="translate-y-8 absolute bottom-0 left-1/2 -translate-x-1/2 ">
            <Button ref={buttonRef} className=" scale-0 origin-bottom ">
              <Icon icon="stash:chevron-right-duotone" width="24" height="24" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
