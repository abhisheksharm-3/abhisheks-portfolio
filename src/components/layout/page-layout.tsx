"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Background } from "./background";

interface PageLayoutProps {
  className?: string;
  children: ReactNode;
  showBackground?: boolean;
}

export function PageLayout({
  className,
  children,
  showBackground = true,
}: PageLayoutProps) {

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
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout; 