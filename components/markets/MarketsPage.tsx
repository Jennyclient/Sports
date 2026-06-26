"use client";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import MarketsTable from "./MarketsTable";
import { MARKETS_SEED } from "./seed";
import type { MarketType } from "@/types/market";

const MARKET_TYPE_TABS: MarketType[] = ["Book Maker", "Fancy"];

export default function MarketsPage() {
  const [tab, setTab] = useState<MarketType>("Book Maker");

  const countByTab = useMemo(
    () =>
      MARKETS_SEED.reduce(
        (acc, market) => {
          acc[market.marketType] += 1;
          return acc;
        },
        { "Book Maker": 0, Fancy: 0 } as Record<MarketType, number>,
      ),
    [],
  );

  const filteredMarkets = MARKETS_SEED.filter((market) => market.marketType === tab);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          All event markets across sports. Filter by status, event or market type to investigate
          issues.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, value: MarketType) => setTab(value)}
          sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontWeight: 600 } }}
        >
          {MARKET_TYPE_TABS.map((t) => (
            <Tab key={t} value={t} label={`${t} (${countByTab[t]})`} />
          ))}
        </Tabs>
      </Box>

      <MarketsTable rows={filteredMarkets} />
    </Stack>
  );
}
