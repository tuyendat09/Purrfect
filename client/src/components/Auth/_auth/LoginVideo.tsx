"use client";

import { useEffect, useState } from "react";

export default function LoginVideo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="grain-animation absolute" />
      <div className="w-[40%] transition delay-200">
        {isClient && (
          <video
            className="max-w-[328px] mx-auto"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/videos/log-in-video.webm" type="video/webm" />
          </video>
        )}
      </div>
    </>
  );
}
