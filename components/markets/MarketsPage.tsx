"use client";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import MarketsTable from "./MarketsTable";
import MarketFormDialog from "./MarketFormDialog";
import { MARKET_TYPES } from "./constants";
import { MARKETS_SEED } from "./seed";
import type { Market, MarketFormValues, MarketType } from "@/types/market";

type TabValue = MarketType | "All";

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>(MARKETS_SEED);
  const [tab, setTab] = useState<TabValue>("All");
  const [addOpen, setAddOpen] = useState(false);

  const countByType = useMemo(() => {
    const counts = Object.fromEntries(MARKET_TYPES.map((t) => [t, 0])) as Record<
      MarketType,
      number
    >;
    markets.forEach((market) => {
      counts[market.marketType] += 1;
    });
    return counts;
  }, [markets]);

  const filteredMarkets =
    tab === "All" ? markets : markets.filter((market) => market.marketType === tab);

  const handleAddMarket = (values: MarketFormValues) => {
    setMarkets((prev) => [
      {
        id: values.id,
        eventName: values.eventName,
        sport: values.sport,
        marketType: values.marketType,
        status: values.status,
        lastUpdated: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Typography variant="body2" color="text.secondary">
          All event markets across sports. Filter by market type, or add a new market.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={() => setAddOpen(true)}
          sx={{ textTransform: "none", fontWeight: 600, alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          Add Market
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, value: TabValue) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontWeight: 600 } }}
        >
          <Tab value="All" label={`All (${markets.length})`} />
          {MARKET_TYPES.map((t) => (
            <Tab key={t} value={t} label={`${t} (${countByType[t]})`} />
          ))}
        </Tabs>
      </Box>

      <MarketsTable rows={filteredMarkets} />

      <MarketFormDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddMarket}
      />
    </Stack>
  );
}
