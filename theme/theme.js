import { createTheme } from "@mui/material/styles";

// Single MUI theme that emits CSS variables under `.light` / `.dark` classes
// on the color-scheme node (set to <html> by InitColorSchemeScript).
//
// Because MUI now generates ONE set of class names that read from CSS
// variables, the active scheme is determined entirely by the class on <html>.
// Flipping it via the inline init script changes the variable VALUES — MUI
// components do not re-render, so there is no flash on reload and no
// SSR/CSR hydration mismatch.
const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#000000", contrastText: "#ffffff" },
        background: { default: "#f8fafc", paper: "#ffffff" },
        text: { primary: "#0f172a", secondary: "#475569" },
        divider: "#e2e8f0",
      },
    },
    dark: {
      palette: {
        primary: { main: "#ffffff", contrastText: "#0f172a" },
        background: { default: "#0a0a0a", paper: "#1e293b" },
        text: { primary: "#f8fafc", secondary: "#94a3b8" },
        divider: "#334155",
      },
    },
  },
  typography: {
    fontFamily:
      "var(--font-geist-sans), Arial, Helvetica, system-ui, sans-serif",
  },
  shape: { borderRadius: 12 },
});

export default appTheme;
