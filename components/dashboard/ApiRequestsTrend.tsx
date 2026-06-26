"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMediaQuery, useTheme } from "@mui/material";

import DashboardSection from "./DashboardSection";
import { formatNumber } from "./utils";
import type { WhitelabelRateLimiting } from "@/types/dashboard";

type Props = {
  data: WhitelabelRateLimiting;
};

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function ApiRequestsTrend({ data }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const usagePct =
    data.rateLimitCapacity > 0
      ? Math.min(100, Math.round((data.currentRateLimitUsage / data.rateLimitCapacity) * 100))
      : 0;

  const usageColor =
    usagePct >= 90
      ? theme.palette.error.main
      : usagePct >= 70
        ? theme.palette.warning.main
        : theme.palette.success.main;

  return (
    <DashboardSection
      title="API Request Volume"
      subtitle="Rate limit usage across all whitelabels"
    >
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryStat label="Total API Requests" value={formatNumber(data.totalApiRequests)} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <SummaryStat
            label="Current Rate Limit Usage"
            value={`${formatNumber(data.currentRateLimitUsage)} / ${formatNumber(data.rateLimitCapacity)}`}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <SummaryStat label="Remaining Requests" value={formatNumber(data.remainingRequests)} />
        </Grid>
      </Grid>

      <Box sx={{ mb: 1.5 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}
        >
          <Typography variant="body2" color="text.secondary">
            Rate Limit Usage
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {usagePct}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={usagePct}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "action.hover",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              bgcolor: usageColor,
            },
          }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        API Requests Trend
      </Typography>

      <LineChart
        xAxis={[
          {
            data: data.trend.map((p) => p.label),
            scaleType: "point",
          },
        ]}
        yAxis={[
          {
            valueFormatter: (v: number | null) => (v != null ? formatNumber(v) : ""),
          },
        ]}
        series={[
          {
            data: data.trend.map((p) => p.requests),
            color: theme.palette.primary.main,
            curve: "monotoneX",
            showMark: true,
            area: true,
            valueFormatter: (v: number | null) => (v != null ? formatNumber(v) : ""),
          },
        ]}
        height={isMobile ? 180 : 220}
        margin={{
          top: 16,
          bottom: 32,
          left: isMobile ? 48 : 64,
          right: 16,
        }}
        grid={{ horizontal: true }}
        sx={{
          "& .MuiAreaElement-root": {
            fill: `color-mix(in srgb, ${theme.palette.primary.main} 15%, transparent)`,
          },
        }}
      />
    </DashboardSection>
  );
}
