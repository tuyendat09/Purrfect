"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useOnboardingStepContext } from "./context/OnboardingStepContext";

export default function OnboardingFormStep3() {
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { step } = useOnboardingStepContext();

  useEffect(() => {
    if (step === 3) {
      const tl = gsap.timeline();

      tl.to(
        textRef.current,
        {
          translateY: 0,

          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
      tl.to(
        progressRef.current,
        {
          translateY: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

      tl.to(
        progressRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=.3"
      );

      tl.to(
        checkRef.current,
        {
          opacity: 1,
          display: "block",
          duration: 1,
          ease: "power2.out",
        },
        "+=.1"
      );

      tl.to(
        transitionRef.current,
        {
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=.5"
      );

      tl.eventCallback("onComplete", () => {
        setTimeout(() => {
          router.push("/"); //
        }, 500);
      });
    }
  }, [step]);

  if (step !== 3) return null;

  return (
    <div className="flex items-center grow-1 ">
      <div
        ref={transitionRef}
        className="bg-[#f5f4f2] fixed top-0 right-0 w-screen h-screen z-50 -translate-x-full"
      />
      <div className="w-[440px] z-10 h-[664px] mx-auto text-white flex justify-center flex-col items-center py-8 px-8">
        <div>
          <div className="opacity-0" ref={checkRef}>
            <Icon
              className="size-5 mx-auto translate-y-7 "
              icon="simple-line-icons:check"
            />
          </div>
          <div ref={progressRef} className="w-12 mx-auto mb-2 translate-y-4  ">
            <DotLottieReact
              src="https://lottie.host/211fb592-99fb-48c3-83ce-5938a5692053/qeSfsN5Gb5.lottie"
              loop
              autoplay
            />
          </div>

          <p ref={textRef} className="opacity-0 translate-y-4">
            Creating your account
          </p>
        </div>
      </div>
    </div>
  );
}
