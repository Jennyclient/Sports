import { useSyncExternalStore } from "react";

import { AVAILABLE_EVENTS_SEED } from "./available/seed";
import { LIVE_EVENTS_SEED } from "./live/seed";
import type { EventStatus } from "@/types/dashboard";
import type { SportEvent, SportEventFormValues } from "@/types/event";

let availableEvents: SportEvent[] = [...AVAILABLE_EVENTS_SEED];
let liveEvents: SportEvent[] = [...LIVE_EVENTS_SEED];

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

const getAvailableSnapshot = () => availableEvents;
const getLiveSnapshot = () => liveEvents;

export const useAvailableEvents = (): SportEvent[] =>
  useSyncExternalStore(subscribe, getAvailableSnapshot, getAvailableSnapshot);

export const useLiveEvents = (): SportEvent[] =>
  useSyncExternalStore(subscribe, getLiveSnapshot, getLiveSnapshot);

export const findLiveEvent = (id: string): SportEvent | null =>
  liveEvents.find((event) => event.id === id) ?? null;

export const addAvailableEvent = (values: SportEventFormValues) => {
  availableEvents = [{ ...values, markets: 0 }, ...availableEvents];
  emit();
};

export const updateAvailableEvent = (id: string, values: SportEventFormValues) => {
  availableEvents = availableEvents.map((event) =>
    event.id === id ? { ...event, ...values } : event,
  );
  emit();
};

export const deleteAvailableEvent = (id: string) => {
  availableEvents = availableEvents.filter((event) => event.id !== id);
  emit();
};

export const pushEventToLive = (id: string) => {
  const event = availableEvents.find((item) => item.id === id);
  if (!event) return;
  availableEvents = availableEvents.filter((item) => item.id !== id);
  liveEvents = [{ ...event, status: "Live" as EventStatus }, ...liveEvents];
  emit();
};

export const toggleLiveEventStatus = (id: string) => {
  liveEvents = liveEvents.map((event) =>
    event.id === id
      ? { ...event, status: event.status === "Suspended" ? "Live" : "Suspended" }
      : event,
  );
  emit();
};
