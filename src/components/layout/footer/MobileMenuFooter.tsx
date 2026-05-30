"use client";

import { SOCIAL_LINKS } from "@/data/contact";
import { Logo } from "../navbar";

export const MobileMenuFooter = () => (
  <div className="w-full pt-8 flex flex-col items-center">
    <div className="w-8 h-px bg-foreground/10 mb-8" />

    <div className="flex justify-center gap-5">
      {SOCIAL_LINKS.map((platform) => (
        <a
          key={platform.label}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.label}
          className="flex items-center justify-center w-8 h-8 border border-foreground/8 text-foreground/40 hover:text-foreground/70 hover:border-foreground/20 transition-colors duration-200"
        >
          <platform.icon className="h-4 w-4" />
        </a>
      ))}
    </div>

    <div className="mt-8 text-xs text-foreground/30 text-center">
      <Logo />
      <p className="mt-1 font-light">made this. with love, with code.</p>
    </div>
  </div>
);
