"use client";

import Link from "next/link";

export const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link href="/" onClick={onClick} className="relative z-50">
    <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
      <span className="text-primary font-serif">A</span>
      <span className="font-extralight tracking-tight">BHK</span>
      <span className="text-primary/70 align-super text-[10px]">®</span>
    </h2>
  </Link>
);
