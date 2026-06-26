"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import { formatNumber } from "./utils";
import type { SystemHealth } from "@/types/dashboard";

type Props = {
  health: SystemHealth;
  activeWhitelabels: number;
  totalWhitelabels: number;
};

const feedLabel = (status: SystemHealth["feedStatus"]) => {
  switch (status) {
    case "connected":
      return { label: "Connected", color: "success" as const, dot: "#22c55e" };
    case "degraded":
      return { label: "Degraded", color: "warning" as const, dot: "#f59e0b" };
    default:
      return { label: "Disconnected", color: "error" as const, dot: "#ef4444" };
  }
};

export default function SystemHealthBar({
  health,
  activeWhitelabels,
  totalWhitelabels,
}: Props) {
  const feed = feedLabel(health.feedStatus);

  return (
    <Paper
      variant="outlined"
      sx={{
        px: { xs: 2, md: 2.5 },
        py: 1.5,
        borderRadius: 3,
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 3 }}
        sx={{ alignItems: { sm: "center" } }}
        divider={
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              width: "1px",
              height: 24,
              bgcolor: "divider",
            }}
          />
        }
      >
        <HealthItem
          icon={<CloudDoneOutlinedIcon fontSize="small" />}
          label="Feed Status"
          value={
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: feed.dot,
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {feed.label}
              </Typography>
            </Stack>
          }
        />

        <HealthItem
          icon={<SpeedOutlinedIcon fontSize="small" />}
          label="API Health"
          value={
            <Chip
              label={`${health.apiHealth}%`}
              size="small"
              color="success"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          }
        />

        <HealthItem
          icon={<BusinessOutlinedIcon fontSize="small" />}
          label="Active Whitelabels"
          value={
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatNumber(activeWhitelabels)} / {formatNumber(totalWhitelabels)}
            </Typography>
          }
        />
      </Stack>
    </Paper>
  );
}

function HealthItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", flex: { sm: 1 } }}
    >
      <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {value}
      </Stack>
    </Stack>
  );
}
