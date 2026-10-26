"use client";

import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "./next-themes-local";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}