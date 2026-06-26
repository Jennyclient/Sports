"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";

import type { ReactNode } from "react";

export const SIDEBAR_WIDTH = 260;

type NavLeaf = {
  label: string;
  href: string;
  icon: ReactNode;
};

type NavGroup = {
  label: string;
  icon: ReactNode;
  children: NavLeaf[];
};

type NavItem = NavLeaf | NavGroup;

type SidebarContentProps = {
  onNavigate?: () => void;
};

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

const isGroup = (item: NavItem): item is NavGroup =>
  (item as NavGroup).children !== undefined;

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
  },
  {
    label: "Whitelabels",
    href: "/whitelabels",
    icon: <BusinessOutlinedIcon fontSize="small" />,
  },
  {
    label: "Available Events",
    href: "/events/available",
    icon: <EventAvailableOutlinedIcon fontSize="small" />,
  },
  {
    label: "Live Events",
    href: "/events/live",
    icon: <SensorsOutlinedIcon fontSize="small" />,
  },
  {
    label: "List Markets",
    href: "/markets",
    icon: <StorefrontOutlinedIcon fontSize="small" />,
  },
  {
    label: "Management",
    href: "/management",
    icon: <ManageAccountsOutlinedIcon fontSize="small" />,
  },
  {
    label: "Settlement",
    href: "/settlement",
    icon: <ReceiptLongOutlinedIcon fontSize="small" />,
  },
];

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname() ?? "";

  const initiallyOpen = useMemo(() => {
    const state: Record<string, boolean> = {};
    for (const item of NAV_ITEMS) {
      if (isGroup(item)) {
        state[item.label] = item.children.some((c) => isActive(pathname, c.href));
      }
    }
    return state;
  }, [pathname]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    initiallyOpen,
  );

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", px: 2.5, py: 2 }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "background.paper",
            display: "grid",
            placeItems: "center",
          }}
        >
          <SportsEsportsOutlinedIcon fontSize="small" />
        </Box>
        <Stack spacing={0}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Sports Admin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Console
          </Typography>
        </Stack>
      </Stack>

      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        <List disablePadding sx={{ px: 1 }}>
          {NAV_ITEMS.map((item) => {
            if (!isGroup(item)) {
              const active = isActive(pathname, item.href);
              return (
                <ListItemButton
                  key={item.label}
                  component={Link}
                  href={item.href}
                  selected={active}
                  onClick={onNavigate}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 1.5,
                    py: 1,
                    "&.Mui-selected": {
                      bgcolor: "action.selected",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        sx: { fontWeight: active ? 600 : 500 },
                      },
                    }}
                  />
                </ListItemButton>
              );
            }

            const open = openGroups[item.label] ?? false;
            const groupActive = item.children.some((c) =>
              isActive(pathname, c.href),
            );

            return (
              <Box key={item.label} sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => toggleGroup(item.label)}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    color: groupActive ? "text.primary" : "text.secondary",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        sx: { fontWeight: groupActive ? 600 : 500 },
                      },
                    }}
                  />
                  {open ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ pl: 3 }}>
                    {item.children.map((child) => {
                      const active = isActive(pathname, child.href);
                      return (
                        <ListItemButton
                          key={child.href}
                          component={Link}
                          href={child.href}
                          selected={active}
                          onClick={onNavigate}
                          sx={{
                            borderRadius: 2,
                            mt: 0.5,
                            px: 1.5,
                            py: 0.75,
                            "&.Mui-selected": {
                              bgcolor: "action.selected",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            slotProps={{
                              primary: {
                                variant: "body2",
                                sx: { fontWeight: active ? 600 : 500 },
                              },
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          v0.1.0
        </Typography>
      </Box>
    </>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const sidebarPaperSx = {
    width: SIDEBAR_WIDTH,
    bgcolor: "background.paper",
    borderRight: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
  } as const;

  return (
    <>
      <Box
        component="aside"
        sx={{
          ...sidebarPaperSx,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          display: { xs: "none", md: "flex" },
        }}
      >
        <SidebarContent />
      </Box>

      {!isDesktop ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": sidebarPaperSx,
          }}
        >
          <SidebarContent onNavigate={onMobileClose} />
        </Drawer>
      ) : null}
    </>
  );
}
