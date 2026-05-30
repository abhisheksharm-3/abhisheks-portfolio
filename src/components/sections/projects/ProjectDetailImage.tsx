"use client";

import Image from "next/image";

interface ProjectDetailImageProps {
  src: string;
  alt: string;
}

/**
 * Renders the hero image for a project detail page.
 * Clean presentation — no decorative overlays, minimal border.
 */
export function ProjectDetailImage({ src, alt }: ProjectDetailImageProps) {
  return (
    <div className="mb-12">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border border-foreground/8">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
    </div>
  );
}
