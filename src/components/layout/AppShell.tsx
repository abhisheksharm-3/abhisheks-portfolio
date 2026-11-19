import { ViewTransition } from "react";
import type { AppShellPropsType } from "@/lib/types/components";
import { cn } from "@/lib/utils";
import { ConstellationBackground } from "./ConstellationBackground";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

/**
 * Page content slides in the direction of travel when a link tags the navigation `nav-forward` or
 * `nav-back`. AppShell renders inside each page, not the layout, so enter and exit fire per route.
 * Untagged navigations (browser back, refresh) swap without motion.
 */
const PAGE_SLIDE = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/**
 * Provides the main application shell and consistent page layout.
 * It includes the Navbar, Footer, and a main content area. The animated background
 * is conditionally rendered and is hidden on screens smaller than 1024px (lg).
 *
 * @param {AppShellPropsType} props The component props.
 * @param {string} [props.className] Optional classes to apply to the main container.
 * @param {React.ReactNode} props.children The page content to render inside the shell.
 * @param {boolean} [props.showBackground=true] Toggles the visibility of the background. Defaults to true.
 * @returns {JSX.Element} The rendered application shell.
 */
export const AppShell: React.FC<AppShellPropsType> = ({
  className,
  children,
  showBackground = true,
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col justify-between bg-background overflow-x-clip",
        className,
      )}
    >
      {showBackground && (
        <div className="absolute inset-0 z-0 hidden overflow-hidden lg:block pointer-events-none">
          <ConstellationBackground />
        </div>
      )}
      <Navbar />
      <ViewTransition enter={PAGE_SLIDE} exit={PAGE_SLIDE} default="none">
        <main className="relative z-10 flex-1">{children}</main>
      </ViewTransition>
      <Footer />
    </div>
  );
};
