"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useLiveEvents } from "@/components/events/eventsStore";
import { LIVE_MARKETS_SEED } from "./marketsSeed";
import { MARKET_TABS, marketCategory } from "./marketCategory";
import AddMarketDialog, { type AddMarketFormValues } from "./AddMarketDialog";
import { formatDateTime, sportEmoji } from "@/utils/format";
import { eventStatusColor, marketStatusColor } from "@/components/events/common/status";
import type { AddableMarketType, EventMarket } from "@/types/market";

type Props = {
  eventId: string;
};

const createMarketId = () =>
  `mk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export default function EventMarketsPage({ eventId }: Props) {
  const liveEvents = useLiveEvents();
  const event = liveEvents.find((e) => e.id === eventId) ?? null;

  const [markets, setMarkets] = useState<EventMarket[]>(
    () => LIVE_MARKETS_SEED[eventId] ?? [],
  );
  const [tab, setTab] = useState<AddableMarketType>("Book Maker");
  const [addMarketOpen, setAddMarketOpen] = useState(false);

  const countByTab = useMemo(
    () =>
      markets.reduce(
        (acc, market) => {
          acc[marketCategory(market.marketType)] += 1;
          return acc;
        },
        { "Book Maker": 0, Fancy: 0 } as Record<AddableMarketType, number>,
      ),
    [markets],
  );

  const filteredMarkets = markets.filter(
    (market) => marketCategory(market.marketType) === tab,
  );

  const handleAddMarket = (values: AddMarketFormValues) => {
    setMarkets((prev) => [
      {
        id: createMarketId(),
        eventId,
        name: values.name,
        marketType: values.marketType,
        status: values.status,
      },
      ...prev,
    ]);
  };

  const backButton = (
    <Button
      component={Link}
      href="/events/live"
      color="inherit"
      startIcon={<ArrowBackOutlinedIcon />}
      sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 600 }}
    >
      Back to Live Events
    </Button>
  );

  if (!event) {
    return (
      <Stack spacing={3}>
        {backButton}
        <Paper
          variant="outlined"
          sx={{ p: 4, borderRadius: 3, borderColor: "divider", textAlign: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            Event not found.
          </Typography>
        </Paper>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {backButton}

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, borderColor: "divider" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              <Box component="span" sx={{ mr: 1 }}>
                {sportEmoji(event.sport)}
              </Box>
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.sport} · {event.competition}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {event.id} · {formatDateTime(event.startTime)}
            </Typography>
          </Stack>
          <Chip
            label={event.status}
            size="small"
            color={eventStatusColor(event.status)}
            variant="outlined"
            sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ borderRadius: "16px", borderColor: "divider" }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "space-between", px: 2.5, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Markets ({markets.length})
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddOutlinedIcon />}
            onClick={() => setAddMarketOpen(true)}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Add Market
          </Button>
        </Stack>

        <Box sx={{ px: 2.5 }}>
          <Tabs
            value={tab}
            onChange={(_, value: AddableMarketType) => setTab(value)}
            sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontWeight: 600 } }}
          >
            {MARKET_TABS.map((t) => (
              <Tab key={t} value={t} label={`${t} (${countByTab[t]})`} />
            ))}
          </Tabs>
        </Box>

        <Divider />

        <Box sx={{ p: 2.5 }}>
          {filteredMarkets.length === 0 ? (
            <Paper
              variant="outlined"
              sx={{ p: 3, borderRadius: 3, borderColor: "divider", textAlign: "center" }}
            >
              <Typography variant="body2" color="text.secondary">
                No {tab} markets yet. Click &quot;Add Market&quot; to create one.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={1.5}>
              {filteredMarkets.map((market) => (
                <Paper
                  key={market.id}
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", justifyContent: "space-between" }}
                  >
                    <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {market.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {market.marketType}
                      </Typography>
                    </Stack>
                    <Chip
                      label={market.status}
                      size="small"
                      color={marketStatusColor(market.status)}
                      variant="outlined"
                    />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      </Paper>

      <AddMarketDialog
        open={addMarketOpen}
        eventName={event.name}
        defaultType={tab}
        onClose={() => setAddMarketOpen(false)}
        onSubmit={handleAddMarket}
      />
    </Stack>
  );
}
