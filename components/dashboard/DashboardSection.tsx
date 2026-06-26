"use client";

import type { ReactNode } from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  sx?: object;
};

export default function DashboardSection({
  title,
  subtitle,
  action,
  children,
  sx,
}: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: "16px",
        borderColor: "divider",
        height: "100%",
        ...sx,
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{
            alignItems: { xs: "flex-start", sm: "flex-start" },
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={0.25}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
          </Stack>
          {action}
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
}
