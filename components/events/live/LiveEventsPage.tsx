"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import LiveEventsTable from "./LiveEventsTable";
import AssignMarketsDialog from "./AssignMarketsDialog";
import { MARKET_CATALOG, type CatalogMarket } from "./marketCatalog";
import { useLiveEvents, toggleLiveEventStatus } from "@/components/events/eventsStore";
import { useAllEventMarkets, addMarketsToEvent } from "@/components/events/marketsStore";
import EventFilters from "@/components/events/common/EventFilters";
import type { EventSearchField, SortDirection } from "@/components/events/common/constants";
import type { Sport } from "@/types/dashboard";
import type { SportEvent } from "@/types/event";
import type { EventMarket } from "@/types/market";

const createMarketId = () =>
  `mk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export default function LiveEventsPage() {
  const router = useRouter();
  const events = useLiveEvents();
  const marketsByEvent = useAllEventMarkets();

  const [sport, setSport] = useState<Sport | "All">("All");
  const [searchField, setSearchField] = useState<EventSearchField>("name");
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [addMarketsEvent, setAddMarketsEvent] = useState<SportEvent | null>(null);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events
      .filter((row) => (sport === "All" ? true : row.sport === sport))
      .filter((row) => {
        if (!query) return true;
        const haystack = searchField === "id" ? row.id : row.name;
        return haystack.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const diff = new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        return sortDir === "asc" ? diff : -diff;
      });
  }, [events, sport, search, searchField, sortDir]);

  const activeMarketsFor = (row: SportEvent) => {
    const markets = marketsByEvent[row.id];
    if (!markets) return row.markets;
    return markets.filter((m) => m.status === "Open" || m.status === "Suspended").length;
  };

  const handleToggleDisable = (row: SportEvent) => {
    toggleLiveEventStatus(row.id);
  };

  const unassignedFor = (eventId: string): CatalogMarket[] => {
    const assigned = new Set((marketsByEvent[eventId] ?? []).map((m) => m.name));
    return MARKET_CATALOG.filter((c) => !assigned.has(c.name));
  };

  const handleAddMarkets = (selected: CatalogMarket[]) => {
    if (!addMarketsEvent) return;
    const eventId = addMarketsEvent.id;
    const newMarkets: EventMarket[] = selected.map((c) => ({
      id: createMarketId(),
      eventId,
      name: c.name,
      marketType: c.marketType,
      status: "Open",
    }));
    addMarketsToEvent(eventId, newMarkets);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Events currently in play. Monitor live markets, manage suspensions and review
          associated markets.
        </Typography>
      </Box>

      <EventFilters
        sport={sport}
        onSportChange={setSport}
        searchField={searchField}
        onSearchFieldChange={setSearchField}
        search={search}
        onSearchChange={setSearch}
      />

      <LiveEventsTable
        rows={visibleRows}
        activeMarketsFor={activeMarketsFor}
        sortDir={sortDir}
        onToggleSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        actions={{
          onViewAssigned: (row) => router.push(`/events/live/${row.id}`),
          onAddMarkets: (row) => setAddMarketsEvent(row),
          onToggleDisable: handleToggleDisable,
        }}
      />

      <AssignMarketsDialog
        open={Boolean(addMarketsEvent)}
        eventName={addMarketsEvent?.name ?? ""}
        markets={addMarketsEvent ? unassignedFor(addMarketsEvent.id) : []}
        onClose={() => setAddMarketsEvent(null)}
        onAdd={handleAddMarkets}
      />
    </Stack>
  );
}
