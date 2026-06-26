"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
    }
  }, [isDesktop]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header onMenuClick={() => setMobileOpen(true)} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
