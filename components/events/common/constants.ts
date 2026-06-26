import type { Sport } from "@/types/dashboard";

export const SPORTS: Sport[] = [
  "Cricket",
  "Football",
  "Tennis",
  "Basketball",
  "Hockey",
  "Kabaddi",
];

export type SortDirection = "asc" | "desc";

export type EventSearchField = "id" | "name";
