"use client";

import { useCallback, useMemo } from "react";

import { useColorScheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

// Thin facade over MUI's `useColorScheme()`. The provider is just MUI's
// ThemeProvider (configured with `cssVariables` + `colorSchemes` in
// theme/theme.js), which manages persistence and the .light/.dark class on
// <html>. We expose a small surface here so consumers can stay decoupled
// from MUI specifics.
export const useAppTheme = (): ThemeContextValue => {
  const { mode, systemMode, setMode } = useColorScheme();

  // `mode` is "light" | "dark" | "system". When it's "system", `systemMode`
  // resolves to the OS preference. Before mount both are undefined, so we
  // fall back to "light" to keep SSR/CSR output identical.
  const resolved: ThemeMode = (
    mode === "system" ? systemMode : mode
  ) === "dark"
    ? "dark"
    : "light";

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setMode(next);
    },
    [setMode]
  );

  const toggleTheme = useCallback(() => {
    setMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setMode]);

  return useMemo(
    () => ({
      theme: resolved,
      isDark: resolved === "dark",
      setTheme,
      toggleTheme,
    }),
    [resolved, setTheme, toggleTheme]
  );
};
