"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";

import DashboardSection from "./DashboardSection";
import { formatNumber } from "./utils";

type Props = {
  total: number;
  open: number;
  suspended: number;
  settled: number;
};

type MarketSegment = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export default function MarketOverview({ total, open, suspended, settled }: Props) {
  const theme = useTheme();

  const segments: MarketSegment[] = [
    { key: "open", label: "Open Markets", value: open, color: theme.palette.success.main },
    {
      key: "suspended",
      label: "Suspended Markets",
      value: suspended,
      color: theme.palette.warning.main,
    },
    { key: "settled", label: "Settled Markets", value: settled, color: theme.palette.info.main },
  ];

  return (
    <DashboardSection
      title="Market Overview"
      subtitle={`Total Markets: ${formatNumber(total)}`}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ alignItems: "center", flex: 1 }}
      >
        <Box sx={{ width: "100%", maxWidth: 220, mx: "auto" }}>
          <PieChart
            series={[
              {
                data: segments.map((s, i) => ({
                  id: i,
                  value: s.value,
                  label: s.label,
                  color: s.color,
                })),
                innerRadius: 55,
                outerRadius: 85,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            height={200}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            hideLegend
          />
        </Box>

        <Stack spacing={2} sx={{ flex: 1, width: "100%" }}>
          {segments.map((segment) => {
            const pct = total > 0 ? (segment.value / total) * 100 : 0;
            return (
              <Box key={segment.key}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: segment.color,
                      }}
                    />
                    <Typography variant="body2">{segment.label}</Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatNumber(segment.value)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "action.hover",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      bgcolor: segment.color,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </DashboardSection>
  );
}
