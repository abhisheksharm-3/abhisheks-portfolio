"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * ModeToggle - Theme switching component
 * Provides dropdown menu to switch between light, dark, and system themes.
 * Handles hydration mismatch by rendering placeholder until client-side.
 *
 * @returns JSX.Element representing the theme toggle dropdown
 */
export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="
          h-8 w-8 rounded-lg
          bg-transparent hover:bg-foreground/5 
          border border-transparent hover:border-primary/10
          transition-all duration-200
        "
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  /**
   * Gets the appropriate icon based on current theme
   * @returns JSX.Element representing the theme icon
   */
  const getIconByTheme = () => {
    if (theme === "dark")
      return <MoonIcon className="h-4 w-4" strokeWidth={1.5} />;
    if (theme === "light")
      return <SunIcon className="h-4 w-4" strokeWidth={1.5} />;
    return <MonitorIcon className="h-4 w-4" strokeWidth={1.5} />;
  };

  /**
   * Gets the readable theme name for accessibility
   * @returns string representing the current theme name
   */
  const getThemeName = () => {
    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "System";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="
            h-8 w-8 rounded-lg
            bg-transparent hover:bg-foreground/5 
            border border-transparent hover:border-primary/10
            transition-all duration-200
            text-foreground/70 hover:text-foreground cursor-pointer
          "
          aria-label={`Change theme, current theme is ${getThemeName()}`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="transition-all duration-200">
              {getIconByTheme()}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="
          min-w-[8rem] border border-primary/10 
          bg-background/95 backdrop-blur-xl 
          rounded-lg shadow-lg shadow-primary/5
        "
        sideOffset={8}
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`
            flex items-center gap-2 cursor-pointer 
            transition-all duration-200 py-2 px-3 text-sm
            rounded-md mx-1 my-0.5
            ${theme === "light" 
              ? "bg-primary/10 text-primary" 
              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            }
          `}
        >
          <SunIcon className="h-4 w-4" strokeWidth={1.5} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`
            flex items-center gap-2 cursor-pointer 
            transition-all duration-200 py-2 px-3 text-sm
            rounded-md mx-1 my-0.5
            ${theme === "dark" 
              ? "bg-primary/10 text-primary" 
              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            }
          `}
        >
          <MoonIcon className="h-4 w-4" strokeWidth={1.5} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`
            flex items-center gap-2 cursor-pointer 
            transition-all duration-200 py-2 px-3 text-sm
            rounded-md mx-1 my-0.5
            ${theme === "system" 
              ? "bg-primary/10 text-primary" 
              : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            }
          `}
        >
          <MonitorIcon className="h-4 w-4" strokeWidth={1.5} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
