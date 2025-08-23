"use client";

export default function LoginVideo() {
  return (
    <>
      <div className="grain-animation absolute" />
      <div className="w-[40%] transition delay-200  ">
        <video
          className="max-w-[328px]  mx-auto "
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/videos/log-in-video.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}
