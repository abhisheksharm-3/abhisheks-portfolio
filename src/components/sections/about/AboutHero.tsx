import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The about page's opening: the portrait beside who i am in one line, with the reading switch
 * passed in underneath.
 */
export const AboutHero = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 lg:gap-16">
    <figure className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-foreground/10 md:h-[min(calc(100dvh-12rem),46rem)] md:w-auto md:max-w-none">
      <Image
        src="/images/portrait.webp"
        alt="Abhishek in profile at an art exhibit in mumbai, lit by projected painted flowers"
        fill
        priority
        sizes="(min-width: 768px) 40vw, 90vw"
        className="object-cover"
      />
    </figure>
    <div className="flex flex-col gap-6 pb-1">
      <h1 className="font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
        i&apos;m abhishek.
      </h1>
      <p className="max-w-[26ch] font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
        a forward deployed engineer at wednesday. i&apos;m from chandigarh and live in pune for
        work.
      </p>
      <p className="font-mono text-[11px] text-foreground/60">mumbai, an exhibit · oct 2026</p>
      {children}
    </div>
  </div>
);
