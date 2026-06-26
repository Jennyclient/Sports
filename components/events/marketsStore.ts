import { useSyncExternalStore } from "react";

import { LIVE_MARKETS_SEED } from "./live/marketsSeed";
import type { EventMarket } from "@/types/market";

const EMPTY: EventMarket[] = [];

let marketsByEvent: Record<string, EventMarket[]> = { ...LIVE_MARKETS_SEED };

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getMapSnapshot = () => marketsByEvent;

export const useAllEventMarkets = (): Record<string, EventMarket[]> =>
  useSyncExternalStore(subscribe, getMapSnapshot, getMapSnapshot);

export const useEventMarkets = (eventId: string): EventMarket[] => {
  const getSnapshot = () => marketsByEvent[eventId] ?? EMPTY;
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export const addMarketsToEvent = (eventId: string, markets: EventMarket[]) => {
  if (markets.length === 0) return;
  marketsByEvent = {
    ...marketsByEvent,
    [eventId]: [...markets, ...(marketsByEvent[eventId] ?? [])],
  };
  emit();
};
