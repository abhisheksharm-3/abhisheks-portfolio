"use client";

import Image from "next/image";
import { SharedElement } from "@/components/shared/SharedElement";

interface ProjectDetailImageProps {
  slug: string;
  src: string;
  alt: string;
}

/**
 * Renders the hero image for a project detail page.
 * Clean presentation — no decorative overlays, minimal border.
 */
export function ProjectDetailImage({ slug, src, alt }: ProjectDetailImageProps) {
  return (
    <div className="mb-12">
      <SharedElement name={`project-image-${slug}`}>
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden border border-foreground/8">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </SharedElement>
    </div>
  );
}
