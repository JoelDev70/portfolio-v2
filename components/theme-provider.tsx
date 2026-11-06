// "use client";

// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// // Filtre l'avertissement connu de next-themes avec React 19
// if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
//   const orig = console.error;
//   console.error = (...args: unknown[]) => {
//     if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
//     orig.apply(console, args);
//   };
// }

// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }



"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Filtre l'avertissement connu de next-themes avec React 19
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) return;
    orig.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}