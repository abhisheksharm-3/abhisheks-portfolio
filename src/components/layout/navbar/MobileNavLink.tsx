"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNavLinkPropsType } from "@/lib/types";

export const MobileNavLink = ({
  item,
  isActive,
  onClick,
}: MobileNavLinkPropsType) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={cn(
      "block text-2xl font-light transition-colors duration-200 py-2 relative",
      isActive ? "text-foreground" : "text-foreground/35 hover:text-foreground/65",
    )}
  >
    {item.name}
    {isActive && (
      <span className="absolute bottom-1 left-0 h-px w-6 bg-foreground/25" />
    )}
  </Link>
);
