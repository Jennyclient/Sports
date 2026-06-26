"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import ThemeToggle from "@/components/theme/ThemeToggle";

type Props = {
  onMenuClick?: () => void;
};

const TITLES: Record<string, string> = {
  "/whitelabels": "Whitelabels",
  "/dashboard": "Dashboard",
  "/events/available": "Available Events",
  "/events/live": "Live Events",
  "/markets": "List Markets",
  "/management": "Management",
  "/settlement": "Settlement",
};

const titleFor = (pathname: string): string => {
  // Prefer the longest matching prefix so nested routes get the right title.
  const matches = Object.keys(TITLES)
    .filter((p) => pathname === p || pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length);
  return matches[0] ? TITLES[matches[0]] : "";
};

export default function Header({ onMenuClick }: Props) {
  const pathname = usePathname() ?? "";
  const title = useMemo(() => titleFor(pathname), [pathname]);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: { xs: 1, sm: 2 }, px: { xs: 1.5, sm: 2, md: 3 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
          sx={{ display: { xs: "inline-flex", md: "none" }, mr: 0.5 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" } }}
            noWrap
          >
            {title}
          </Typography>
        </Box>

        <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} sx={{ alignItems: "center" }}>
          <ThemeToggle size="small" />
          <Tooltip title="Notifications" arrow>
            <IconButton
              size="small"
              sx={{
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                display: { xs: "none", sm: "inline-flex" },
              }}
              aria-label="Notifications"
            >
              <NotificationsNoneOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account" arrow>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                color: "background.paper",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              A
            </Avatar>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
