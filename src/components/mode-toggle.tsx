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

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering only client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-primary/5 bg-background/30">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const getIconByTheme = () => {
    if (theme === "dark") return <MoonIcon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} />;
    if (theme === "light") return <SunIcon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} />;
    return <MonitorIcon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} />;
  };

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
          className="rounded-full h-9 w-9 border border-primary/5 bg-foreground/3 backdrop-blur-sm hover:bg-primary/3 transition-all duration-500"
          aria-label={`Change theme, current theme is ${getThemeName()}`}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-70">
              {getIconByTheme()}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[7rem] overflow-hidden border border-primary/5 bg-background/60 backdrop-blur-md rounded-xl"
        sideOffset={8}
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 py-1.5 px-3 text-xs font-extralight ${theme === "light" ? "bg-primary/3 text-primary/90" : "text-foreground/70 hover:text-foreground/90"}`}
        >
          <SunIcon className="h-3.5 w-3.5" strokeWidth={1.25} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 py-1.5 px-3 text-xs font-extralight ${theme === "dark" ? "bg-primary/3 text-primary/90" : "text-foreground/70 hover:text-foreground/90"}`}
        >
          <MoonIcon className="h-3.5 w-3.5" strokeWidth={1.25} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 py-1.5 px-3 text-xs font-extralight ${theme === "system" ? "bg-primary/3 text-primary/90" : "text-foreground/70 hover:text-foreground/90"}`}
        >
          <MonitorIcon className="h-3.5 w-3.5" strokeWidth={1.25} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}