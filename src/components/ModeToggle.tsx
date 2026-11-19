"use client";

/** Cycles system, light and dark themes, crossfading the page between them. */
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const THEMES = ["system", "light", "dark"] as const;
type ThemeType = (typeof THEMES)[number];

const ICONS: Record<ThemeType, React.ElementType> = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const subscribe = () => () => {};

/**
 * Sets the resolved theme class on <html> synchronously, inside the view transition's update, so the
 * browser snapshots the new colours. next-themes applies the same class a moment later in an effect.
 */
const applyThemeClass = (theme: ThemeType) => {
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(isDark ? "dark" : "light");
  root.style.colorScheme = isDark ? "dark" : "light";
};

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const cycle = () => {
    const current = (theme as ThemeType) ?? "system";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }
    document.startViewTransition({
      update: () => {
        applyThemeClass(next);
        setTheme(next);
      },
      types: ["theme"],
    });
  };

  if (!isMounted) {
    return <span className="h-4 w-4 block" />;
  }

  const Icon = ICONS[(theme as ThemeType) ?? "system"];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme, current: ${theme}`}
      className="-m-2 p-2 text-foreground/60 hover:text-foreground/85 transition-colors duration-200 cursor-pointer"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
};
