"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DashboardSection from "./DashboardSection";
import { formatNumber } from "./utils";
import type { WhitelabelApiUsage } from "@/types/dashboard";

type Props = {
  whitelabels: WhitelabelApiUsage[];
};

export default function TopWhitelabelsByApiUsage({ whitelabels }: Props) {
  const maxRequests = Math.max(...whitelabels.map((w) => w.requests), 1);

  return (
    <DashboardSection
      title="Top 5 Whitelabels by API Usage"
      subtitle="Requests served in the last 24 hours"
    >
      <Stack spacing={2}>
        {whitelabels.map((wl, index) => {
          const pct = (wl.requests / maxRequests) * 100;
          return (
            <Box key={wl.id}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 16 }}>
                    {index + 1}.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {wl.name}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 600, flexShrink: 0, ml: 1 }}>
                  {formatNumber(wl.requests)}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "action.hover",
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </DashboardSection>
  );
}
