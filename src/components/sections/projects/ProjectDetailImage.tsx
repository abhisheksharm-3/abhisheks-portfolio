import Image from "next/image";

interface ProjectDetailImageProps {
  src: string;
  alt: string;
}

/**
 * Renders the screenshot of a project that has one. The box keeps the screenshot's own
 * 1200x630 ratio and anchors to its top left, so a narrow screen shrinks the image instead of
 * cropping its headline.
 */
export function ProjectDetailImage({ src, alt }: ProjectDetailImageProps) {
  return (
    <div className="mb-12">
      <div className="relative aspect-[1200/630] w-full overflow-hidden border border-foreground/8">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-left-top"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
    </div>
  );
}
