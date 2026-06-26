"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";

import DashboardSection from "./DashboardSection";
import { formatNumber, sportEmoji } from "./utils";
import type { SportStat } from "@/types/dashboard";

type Props = {
  stats: SportStat[];
};

const SPORT_COLORS: Record<string, string> = {
  Cricket: "#22c55e",
  Football: "#3b82f6",
  Tennis: "#f59e0b",
};

export default function SportsDistributionChart({ stats }: Props) {
  const theme = useTheme();
  const total = stats.reduce((sum, s) => sum + s.events, 0);

  return (
    <DashboardSection
      title="Event Statistics"
      subtitle="Distribution of events by sport"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: "center", flex: 1 }}
      >
        <Box sx={{ width: "100%", maxWidth: 240, mx: "auto" }}>
          <PieChart
            series={[
              {
                data: stats.map((s, i) => ({
                  id: i,
                  value: s.events,
                  label: s.sport,
                  color: SPORT_COLORS[s.sport] ?? theme.palette.primary.main,
                })),
                innerRadius: 0,
                outerRadius: 90,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            height={220}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            hideLegend
          />
        </Box>

        <Stack spacing={1.5} sx={{ flex: 1, width: "100%" }}>
          {stats.map((stat) => {
            const pct = total > 0 ? Math.round((stat.events / total) * 100) : 0;
            return (
              <Stack
                key={stat.sport}
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 0.5, sm: 1.5 }}
                sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Typography component="span" sx={{ fontSize: 18 }}>
                    {sportEmoji(stat.sport)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {stat.sport}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    {pct}%
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 72, textAlign: "right" }}>
                    {formatNumber(stat.events)} Events
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </DashboardSection>
  );
}
