"use client";

/** A silent looping clip in the photo strip that plays only while on screen and never under reduced motion. */
import { useEffect, useRef } from "react";
import type { StripVideoPropsType } from "@/lib/types/components";

export const StripVideo = ({ video, poster, alt }: StripVideoPropsType) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => element.pause());
        else element.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={video}
      poster={poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
};
