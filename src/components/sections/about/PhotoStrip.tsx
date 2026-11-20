import Image from "next/image";
import { LoopVideo } from "@/components/shared/LoopVideo";
import type { PhotoType } from "@/lib/types/components";

/**
 * The photographs as a masonry of columns, two on a phone and three on wide screens, each photo at
 * its own aspect ratio so nothing is cropped. Videos play muted while in view. Renders nothing while
 * there are no photos.
 */
export const PhotoStrip = ({ photos }: { photos: readonly PhotoType[] }) => {
  if (photos.length === 0) return null;

  return (
    <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
      {photos.map(({ src, alt, width, height, caption, video }) => (
        <figure key={src} className="mb-5 break-inside-avoid sm:mb-6">
          <div
            style={{ aspectRatio: `${width} / ${height}` }}
            className="relative w-full border border-foreground/10"
          >
            {video ? (
              <LoopVideo video={video} poster={src} alt={alt} />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 35vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          {caption && (
            <figcaption className="mt-2 font-mono text-[11px] leading-snug text-foreground/60">
              {caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};
