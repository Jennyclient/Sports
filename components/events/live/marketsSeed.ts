import type { EventMarket } from "@/types/market";

export const LIVE_MARKETS_SEED: Record<string, EventMarket[]> = {
  "ev-1": [
    { id: "mk-1-1", eventId: "ev-1", name: "Match Winner", marketType: "Book Maker", status: "Open" },
    { id: "mk-1-2", eventId: "ev-1", name: "Book Maker", marketType: "Book Maker", status: "Open" },
    { id: "mk-1-3", eventId: "ev-1", name: "Session 1 Over", marketType: "Fancy", status: "Open" },
    { id: "mk-1-4", eventId: "ev-1", name: "Total Runs", marketType: "Fancy", status: "Open" },
    { id: "mk-1-5", eventId: "ev-1", name: "Fall of Wicket", marketType: "Fancy", status: "Suspended" },
  ],
  "ev-2": [
    { id: "mk-2-1", eventId: "ev-2", name: "Match Winner", marketType: "Book Maker", status: "Open" },
    { id: "mk-2-2", eventId: "ev-2", name: "Book Maker", marketType: "Book Maker", status: "Open" },
    { id: "mk-2-3", eventId: "ev-2", name: "Total Corners", marketType: "Fancy", status: "Open" },
  ],
  "ev-3": [
    { id: "mk-3-1", eventId: "ev-3", name: "Match Winner", marketType: "Book Maker", status: "Open" },
    { id: "mk-3-2", eventId: "ev-3", name: "Book Maker", marketType: "Book Maker", status: "Open" },
  ],
  "ev-4": [
    { id: "mk-4-1", eventId: "ev-4", name: "Match Winner", marketType: "Book Maker", status: "Open" },
    { id: "mk-4-2", eventId: "ev-4", name: "Book Maker", marketType: "Book Maker", status: "Open" },
    { id: "mk-4-3", eventId: "ev-4", name: "Session 6 Over", marketType: "Fancy", status: "Open" },
    { id: "mk-4-4", eventId: "ev-4", name: "Total Runs", marketType: "Fancy", status: "Open" },
  ],
  "ev-5": [
    { id: "mk-5-1", eventId: "ev-5", name: "Match Winner", marketType: "Book Maker", status: "Open" },
    { id: "mk-5-2", eventId: "ev-5", name: "Book Maker", marketType: "Book Maker", status: "Open" },
    { id: "mk-5-3", eventId: "ev-5", name: "Total Goals", marketType: "Fancy", status: "Open" },
  ],
  "ev-6": [
    { id: "mk-6-1", eventId: "ev-6", name: "Match Winner", marketType: "Book Maker", status: "Suspended" },
    { id: "mk-6-2", eventId: "ev-6", name: "Book Maker", marketType: "Book Maker", status: "Suspended" },
  ],
};
