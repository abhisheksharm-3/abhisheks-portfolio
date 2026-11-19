"use client";

import Link from "next/link";
import type { MobileNavLinkPropsType } from "@/lib/types/components";
import { cn } from "@/lib/utils";

export const MobileNavLink = ({
  item,
  isActive,
  transitionTypes,
  onClick,
}: MobileNavLinkPropsType) => (
  <Link
    href={item.href}
    transitionTypes={transitionTypes}
    onClick={onClick}
    className={cn(
      "block text-2xl font-light transition-colors duration-200 py-2 relative",
      isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground/85",
    )}
  >
    {item.name}
    {isActive && <span className="absolute bottom-1 left-0 h-px w-6 bg-foreground/25" />}
  </Link>
);
