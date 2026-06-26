import type { Sport } from "@/types/dashboard";

export type MarketStatus = "Open" | "Suspended" | "Settled" | "Closed";

export type MarketType = "Book Maker" | "Fancy";

export type Market = {
  id: string;
  eventId: string;
  eventName: string;
  sport: Sport;
  marketType: MarketType;
  status: MarketStatus;
  volume: number;
  lastUpdated: string;
};

export type EventMarketType = "Book Maker" | "Fancy";

export type EventMarket = {
  id: string;
  eventId: string;
  name: string;
  marketType: EventMarketType;
  status: MarketStatus;
};

export type AddableMarketType = EventMarketType;
