"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";

const THEMES = ["system", "light", "dark"] as const;
type ThemeType = (typeof THEMES)[number];

const ICONS: Record<ThemeType, React.ElementType> = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const subscribe = () => () => {};

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const cycle = () => {
    const current = (theme as ThemeType) ?? "system";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next);
  };

  if (!isMounted) {
    return <span className="h-4 w-4 block" />;
  }

  const Icon = ICONS[(theme as ThemeType) ?? "system"];

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
