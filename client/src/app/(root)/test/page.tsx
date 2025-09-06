"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function page() {
  const imageRef = useRef<HTMLImageElement>(null);
  const triggerDiv1 = useRef<HTMLDivElement>(null);
  const triggerDiv2 = useRef<HTMLDivElement>(null);
  const triggerDiv3 = useRef<HTMLDivElement>(null);

  const gradientProgressBar1 = useRef<HTMLDivElement>(null);
  const gradientProgressBar2 = useRef<HTMLDivElement>(null);
  const gradientProgressBar3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Các URL ảnh tương ứng
    const imageUrls = [
      "https://reforgedlabs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_creative_brief.249bdce8.webp&w=3840&q=75",
      "https://reforgedlabs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_analysis.9c9c164c.webp&w=3840&q=75",
      "https://reforgedlabs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_stragetic.fae92c4e.webp&w=3840&q=75",
    ];

    // Trigger 1
    gsap.to(gradientProgressBar1.current, {
      height: "100%",
      scrollTrigger: {
        trigger: triggerDiv1.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        markers: true,
        onEnter: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[0];
        },

        onEnterBack: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[0];
        },
      },
    });

    // Trigger 2
    gsap.to(gradientProgressBar2.current, {
      height: "100%",
      scrollTrigger: {
        trigger: triggerDiv2.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        markers: true,
        onEnter: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[1];
        },
        onEnterBack: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[1];
        },
      },
    });

    // Trigger 3
    gsap.to(gradientProgressBar3.current, {
      height: "100%",
      scrollTrigger: {
        trigger: triggerDiv3.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        markers: true,
        onEnter: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[2];
        },
        onEnterBack: () => {
          if (imageRef.current) imageRef.current.src = imageUrls[2];
        },
      },
    });
  }, []);

  return (
    <>
      <div className="h-screen"></div>
      <div className="w-[1400px] bg-red-500 mx-auto ">
        <div className="flex justify-between ">
          <div>
            <div className="sticky top-[calc(50%-200px)]">
              <img
                ref={imageRef}
                src="https://reforgedlabs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_stragetic.fae92c4e.webp&w=3840&q=75"
                alt=""
              />
            </div>
          </div>
          <div className="space-y-4">
            <div
              ref={triggerDiv1}
              className="relative space-y-8 min-h-[400px] bg-green-500"
            >
              <div className="absolute rounded-full bg-black left-8 h-full w-1">
                <div
                  ref={gradientProgressBar1}
                  className="absolute w-full rounded-full h-0 bg-gradient-to-b from-[#81ED28] to-[#8C36FF]
                transform-gpu transition-none"
                />
              </div>
              <div className="ml-16">
                <h1 className="text-3xl font-bold">Unlock Powerful Insights</h1>{" "}
                Start by using Boa to uncover what’s working, and what’s not,
                across genres, geographies, networks, and even competitors.
                Powered by massive creative and performance datasets and
                cutting-edge models, Boa delivers deeper insights than any other
                platform.
              </div>
            </div>
            <div
              ref={triggerDiv2}
              className="relative space-y-8 min-h-[400px] bg-green-500"
            >
              <div className="absolute rounded-full bg-black left-8 h-full w-1">
                <div
                  ref={gradientProgressBar2}
                  className="absolute w-full rounded-full h-0 bg-gradient-to-b from-[#81ED28] to-[#8C36FF]
                transform-gpu transition-none"
                />
              </div>
              <div className="ml-16">
                <h1 className="text-3xl font-bold">Unlock Powerful Insights</h1>{" "}
                Start by using Boa to uncover what’s working, and what’s not,
                across genres, geographies, networks, and even competitors.
                Powered by massive creative and performance datasets and
                cutting-edge models, Boa delivers deeper insights than any other
                platform.
              </div>
            </div>
            <div
              ref={triggerDiv3}
              className="relative space-y-8 min-h-[400px] bg-green-500"
            >
              <div className="absolute rounded-full bg-black left-8 h-full w-1">
                <div
                  ref={gradientProgressBar3}
                  className="absolute w-full rounded-full h-0 bg-gradient-to-b from-[#81ED28] to-[#8C36FF]
                transform-gpu transition-none"
                />
              </div>
              <div className="ml-16">
                <h1 className="text-3xl font-bold">Unlock Powerful Insights</h1>{" "}
                Start by using Boa to uncover what’s working, and what’s not,
                across genres, geographies, networks, and even competitors.
                Powered by massive creative and performance datasets and
                cutting-edge models, Boa delivers deeper insights than any other
                platform.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
