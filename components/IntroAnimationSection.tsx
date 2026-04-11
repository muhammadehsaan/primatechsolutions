"use client";

import { useEffect, useRef, useState } from "react";

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
};

export default function IntroAnimationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    if (!video) return;

    const startPlayback = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const revealVideo = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVideoVisible(true);
        });
      });
    };

    const handleCanPlay = () => {
      startPlayback();

      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(() => {
          revealVideo();
        });
        return;
      }

      revealVideo();
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener("canplay", handleCanPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section className="relative border-b border-cyanPrimary/25 bg-[#031a2f] px-0 pb-0 pt-0 sm:px-4 sm:pb-4 sm:pt-3">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="relative overflow-hidden border border-cyanPrimary/20 bg-[#041527] shadow-[0_0_30px_rgba(0,229,255,0.08)] sm:rounded-xl">
          <div className="relative aspect-video w-full bg-[#02101d] sm:aspect-[16/10] lg:aspect-[16/8.7]">
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-cover bg-center ${isVideoVisible ? "opacity-0" : "opacity-100"}`}
              style={{ backgroundImage: "url('/intro-video-poster.jpg')" }}
            />
            <video
              ref={videoRef}
              className={`absolute inset-0 block h-full w-full object-contain object-center sm:object-cover sm:object-center ${
                isVideoVisible ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/intro-video-poster.jpg"
            >
              <source src="/primatech-3d-animation.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
