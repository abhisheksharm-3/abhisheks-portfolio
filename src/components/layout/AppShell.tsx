import { cn } from "@/lib/utils";
import { AppShellPropsType } from "@/lib/types";
import { ConstellationBackground } from "./ConstellationBackground";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

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
        "relative flex min-h-screen w-full flex-col justify-between bg-background",
        className,
      )}
    >
      {showBackground && (
        <div className="absolute inset-0 z-0 hidden overflow-hidden lg:block">
          <ConstellationBackground />
        </div>
      )}
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
};
