import type { AddableMarketType, EventMarketType } from "@/types/market";

export const MARKET_TABS: AddableMarketType[] = ["Book Maker", "Fancy"];

export const marketCategory = (type: EventMarketType): AddableMarketType => type;
