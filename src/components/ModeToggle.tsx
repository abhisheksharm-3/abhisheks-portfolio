"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";

const THEMES = ["system", "light", "dark"] as const;
type Theme = (typeof THEMES)[number];

const ICONS: Record<Theme, React.ElementType> = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
};

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cycle = () => {
    const current = (theme as Theme) ?? "system";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next);
  };

  if (!isMounted) {
    return <span className="h-4 w-4 block" />;
  }

  const Icon = ICONS[(theme as Theme) ?? "system"];

  return (
    <button
      onClick={cycle}
      aria-label={`Switch theme, current: ${theme}`}
      className="text-foreground/35 hover:text-foreground/60 transition-colors duration-200 cursor-pointer"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
};
