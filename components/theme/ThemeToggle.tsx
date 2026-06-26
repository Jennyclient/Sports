"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useAppTheme } from "./ThemeContext";

type ThemeToggleProps = {
  size?: "small" | "medium" | "large";
};

export default function ThemeToggle({ size = "medium" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useAppTheme();
  const nextLabel = isDark ? "light" : "dark";

  return (
    <Tooltip title={`Switch to ${nextLabel} mode`} arrow>
      <IconButton
        onClick={toggleTheme}
        size={size}
        aria-label={`Switch to ${nextLabel} mode`}
        sx={{
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
