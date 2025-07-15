"use client";

import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function OnboardingVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,

      {
        scale: 1.5,
      },

      {
        scale: 1,
        duration: 1,
      }
    );
  }, []);

  return (
    <>
      <div className="grain-animation opacity-[0.7]" />
      <div className=" fixed left-0  transition delay-200 -z-10  ">
        <video
          ref={ref}
          className="w-screen h-screen object-cover  "
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/videos/onboarding-video.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
