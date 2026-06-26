"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  accent?: string;
  href?: string;
  alert?: boolean;
};

export default function KpiStatCard({
  label,
  value,
  subtitle,
  icon,
  accent,
  href,
  alert,
}: Props) {
  const content = (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        borderColor: alert ? "warning.main" : "divider",
        bgcolor: "background.paper",
        height: "100%",
        transition: "border-color 0.2s, box-shadow 0.2s",
        ...(alert && {
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(245, 158, 11, 0.08)"
              : "rgba(245, 158, 11, 0.06)",
        }),
        ...(href && {
          cursor: "pointer",
          "&:hover": {
            borderColor: accent ?? "primary.main",
            boxShadow: 1,
          },
        }),
      }}
    >
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          {icon ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: accent ? `${accent}18` : "action.hover",
                color: accent ?? "text.secondary",
              }}
            >
              {icon}
            </Box>
          ) : null}
        </Stack>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            fontSize: { xs: "1.5rem", md: "2.125rem" },
          }}
        >
          {value}
        </Typography>
        {subtitle ? (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {content}
      </Link>
    );
  }

  return content;
}
