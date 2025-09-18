"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider - Wrapper component for Next.js theme provider
 * Provides theme context to the entire application using next-themes.
 * Supports light, dark, and system theme modes.
 * 
 * @param children - Child components that will receive theme context
 * @param props - Additional props passed to NextThemesProvider
 * @returns JSX.Element wrapping children with theme context
 */
export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};