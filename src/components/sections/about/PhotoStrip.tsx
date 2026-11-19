import Image from "next/image";
import type { CSSProperties } from "react";
import { PHOTOS } from "@/data/photos";
import type { PhotoType } from "@/lib/types/components";
import { StripVideo } from "./StripVideo";

const PHOTOS_PER_ROW = 3;

/** Splits the photos into rows of three for wide screens; on a phone the rows dissolve into one scroller. */
const toRows = (photos: PhotoType[]) =>
  Array.from({ length: Math.ceil(photos.length / PHOTOS_PER_ROW) }, (_, index) =>
    photos.slice(index * PHOTOS_PER_ROW, (index + 1) * PHOTOS_PER_ROW),
  );

/**
 * Rows of photographs sized by aspect ratio so every image in a row shares one height. On a phone the
 * row scrolls sideways and snaps to each photo; browsers that make scrollers focusable let the
 * keyboard move it. Renders nothing while there are no photos.
 */
export const PhotoStrip = () => {
  if (PHOTOS.length === 0) return null;

  return (
    <section
      aria-label="photographs"
      className="mb-10 -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:block md:snap-none md:space-y-6 md:overflow-visible md:px-0 md:pb-0"
    >
      {toRows(PHOTOS).map((row) => (
        <div key={row[0].src} className="contents md:flex md:gap-4">
          {row.map(({ src, alt, width, height, caption, video }) => (
            <figure
              key={src}
              style={{ "--ratio": width / height } as CSSProperties}
              className="max-w-[calc(100vw-3rem)] shrink-0 snap-start md:max-w-none md:min-w-0 md:shrink md:[flex:var(--ratio)_1_0%]"
            >
              <div className="relative h-56 max-w-full w-[calc(14rem*var(--ratio))] aspect-(--ratio) border border-foreground/10 md:h-auto md:w-full">
                {video ? (
                  <StripVideo video={video} poster={src} alt={alt} />
                ) : (
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover"
                  />
                )}
              </div>
              {caption && (
                <figcaption className="mt-2 font-mono text-[11px] text-foreground/60">
                  {caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ))}
    </section>
  );
};
