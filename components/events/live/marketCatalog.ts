import type { EventMarketType } from "@/types/market";

export type CatalogMarket = {
  name: string;
  marketType: EventMarketType;
};

export const MARKET_CATALOG: CatalogMarket[] = [
  { name: "Match Winner", marketType: "Book Maker" },
  { name: "Book Maker", marketType: "Book Maker" },
  { name: "Match Odds", marketType: "Book Maker" },
  { name: "Toss Winner", marketType: "Book Maker" },
  { name: "Total Runs", marketType: "Fancy" },
  { name: "Session 1 Over", marketType: "Fancy" },
  { name: "Session 6 Over", marketType: "Fancy" },
  { name: "Fall of Wicket", marketType: "Fancy" },
  { name: "Highest Over", marketType: "Fancy" },
  { name: "Total Corners", marketType: "Fancy" },
  { name: "Total Goals", marketType: "Fancy" },
];
