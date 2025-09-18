"use client";

import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import { Background } from "./Background";
import { Navbar } from "./navbar";
import { AppShellProps } from "@/lib/types";

/**
 * The main application shell, serving as the root layout for all pages.
 * * This component provides the consistent structure of the site, including
 * the Navbar, a flexible main content area, and the Footer. It also
 * conditionally renders the animated site background.
 *
 * @param {AppShellProps} props - The props for the component.
 * @returns {JSX.Element} The rendered application shell.
 */
export const AppShell: React.FC<AppShellProps> = ({
  className,
  children,
  showBackground = true,
}) => {
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
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};