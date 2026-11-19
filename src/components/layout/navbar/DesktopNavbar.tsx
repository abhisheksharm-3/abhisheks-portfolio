"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { NAVIGATION_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { navTransitionTypes } from "./nav-direction";

interface DesktopNavbarPropsType {
  activeItem: string | null;
}

export const DesktopNavbar = ({ activeItem }: DesktopNavbarPropsType) => (
  <nav className="hidden xl:flex items-center gap-6">
    <ul className="flex items-center gap-6">
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.name} className="relative">
          <Link
            href={item.href}
            transitionTypes={navTransitionTypes(activeItem, item.name)}
            className={cn(
              "text-sm font-light transition-colors duration-200",
              activeItem === item.name
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground/85",
            )}
          >
            {item.name}
          </Link>
          {activeItem === item.name && (
            <ViewTransition name="nav-indicator">
              <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground/25" />
            </ViewTransition>
          )}
        </li>
      ))}
    </ul>

    <div className="w-px h-4 bg-foreground/10" />

    <ModeToggle />
  </nav>
);
