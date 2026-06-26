"use client";

import type { ReactNode } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import appTheme from "@/theme/theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // enableCssLayer wraps MUI styles in `@layer mui` so Tailwind utilities win cleanly.
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      {/* With `cssVariables` set on the theme, MUI's ThemeProvider acts as a
          CssVarsProvider: it manages the .light / .dark class on <html> and
          exposes `useColorScheme()` for toggling. */}
      <ThemeProvider theme={appTheme} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
