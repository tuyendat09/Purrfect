"use client";
import "./Onboarding.css";
import Button from "@/components/UI/Button";
import FloatingInput from "@/components/UI/Input/FloatingInput";
import "./Onboarding.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function GradientBorder() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;

    gsap.to(
      {},
      {
        duration: 20,
        repeat: -1,
        onUpdate: () => {
          angle = (angle + 1) % 360;
          if (gradientRef.current) {
            gradientRef.current.style.background = `linear-gradient(${angle}deg, rgb(143,209,255) 0%, rgb(183,0,255) 90%)`;
          }
        },
      }
    );
  }, []);
  return <div ref={gradientRef} className="gradient-border " />;
}

export default function OnboardingFormStep3() {
  return (
    <div className="flex items-center grow-1 ">
      <div className="w-[440px] relative bg-black onboarding-form-2 h-[664px] mx-auto">
        <GradientBorder />
        <div className="text-white flex flex-col justify-between items-center h-full p-8">
          <div className="text-center">
            <h3 className="font-serif text-2xl mb-2">Claim Username</h3>
            <p className="text-sm text-[#aaaaaa]">Set your Purrfect handle</p>
          </div>
          <form className="w-full mb-8 " action="">
            <FloatingInput label="Username" />
            <p className="text-center text-[#aaaaaa] text-sm">
              purrfect.com/username
            </p>
          </form>
          <Button className="w-full">Claim</Button>
        </div>
      </div>
    </div>
  );
}
