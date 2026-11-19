import Image from "next/image";
import type { ProjectDetailScreensPropsType } from "@/lib/types/components";

/**
 * Renders a phone project's real screens side by side at a fixed phone width, each with a
 * caption naming what it shows. The row scrolls sideways on a narrow screen, and browsers make a
 * scrolling row focusable on their own. Each image carries its own pixel size, so nothing shifts on load.
 */
export function ProjectDetailScreens({ screens }: ProjectDetailScreensPropsType) {
  return (
    <section
      aria-label="app screens"
      className="mb-12 -mx-6 overflow-x-auto px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
    >
      <ul className="flex w-max gap-6">
        {screens.map((screen, index) => (
          <li key={screen.src} className="w-52 shrink-0">
            <figure>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                priority={index === 0}
                sizes="208px"
                className="h-auto w-full border border-foreground/8"
              />
              <figcaption className="mt-3 font-mono text-[11px] leading-snug text-primary/60">
                {screen.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
