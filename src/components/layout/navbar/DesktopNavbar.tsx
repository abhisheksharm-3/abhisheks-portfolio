"use client";

import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/data/navigation";
import { ModeToggle } from "@/components/ModeToggle";

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
            className={cn(
              "text-sm font-light transition-colors duration-200",
              activeItem === item.name
                ? "text-foreground"
                : "text-foreground/45 hover:text-foreground/70",
            )}
          >
            {item.name}
          </Link>
          {activeItem === item.name && (
            <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground/25" />
          )}
        </li>
      ))}
    </ul>

    <div className="w-px h-4 bg-foreground/10" />

    <ModeToggle />

    <Link
      href="https://old.abhisheksan.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs text-foreground/30 hover:text-foreground/55 transition-colors duration-200"
    >
      <History className="h-3 w-3" />
      <span>Old Portfolio</span>
    </Link>

    <Link
      href="/contact"
      className="inline-flex items-center gap-2 text-xs border border-foreground/15 text-foreground/55 hover:text-foreground/80 hover:border-foreground/25 transition-all duration-200 px-4 py-1.5"
    >
      Hire me
      <ArrowRight className="h-3 w-3" />
    </Link>
  </nav>
);
