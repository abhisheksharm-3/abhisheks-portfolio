"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Background } from "./background";
import { useScrollPosition } from "@/hooks/use-scroll-position";

interface PageLayoutProps {
  className?: string;
  children: ReactNode;
  activePage?: string;
  showBackground?: boolean;
}

export function PageLayout({
  className,
  children,
  activePage,
  showBackground = true,
}: PageLayoutProps) {
  const scrollPosition = useScrollPosition();

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col justify-between bg-background relative",
        className
      )}
    >
      {showBackground && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Background />
        </div>
      )}
      <Header scrollPosition={scrollPosition} activePage={activePage} />
      <main className="flex-1 pt-24 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout; 