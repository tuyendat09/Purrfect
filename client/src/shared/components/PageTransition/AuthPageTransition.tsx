/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../../../components/Auth/_auth/Login.css";
import { useAuthTransitionContext } from "../../context/AuthTransitionContext";

export default function AuthPageTransition() {
  const { animate } = useAuthTransitionContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (animate) {
      transitionPageOut(ref);
    } else {
      transitionPageIn(ref);
    }
  }, [animate]);

  return <div ref={ref} className="grain-animation !z-10" />;
}

function transitionPageIn(ref: React.RefObject<HTMLDivElement> | any) {
  gsap.to(ref!.current, {
    opacity: 0,
    display: "none",
    duration: 0.3,
    ease: "power3.out",
  });
}

function transitionPageOut(ref: React.RefObject<HTMLDivElement> | any) {
  gsap.set(ref!.current, {
    display: "block",
    opacity: 0,
  });

  gsap.to(ref!.current, {
    opacity: 1,
    duration: 0.5,
    ease: "power3.out",
  });
}
