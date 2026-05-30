"use client";

import { cn } from "@/lib/utils";

export const NavbarBackground = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={cn(
      "absolute inset-0 -z-10 transition-all duration-300",
      isScrolled
        ? "bg-background/90 backdrop-blur-xl border-b border-foreground/8"
        : "bg-transparent",
    )}
  />
);
