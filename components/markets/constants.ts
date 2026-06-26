import type { MarketStatus, MarketType } from "@/types/market";

export const MARKET_TYPES: MarketType[] = [
  "Match Odds",
  "Book Maker",
  "Fancy",
  "Line",
  "Over/Under",
  "Toss",
];

export const MARKET_STATUSES: MarketStatus[] = [
  "Open",
  "Suspended",
  "Settled",
  "Closed",
];
