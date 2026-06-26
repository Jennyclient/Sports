import type { EventStatus, Sport } from "@/types/dashboard";

export type SportEvent = {
  id: string;
  name: string;
  sport: Sport;
  competition: string;
  startTime: string;
  status: EventStatus;
  markets: number;
  totalBets?: number;
};

export type SportEventFormValues = {
  id: string;
  name: string;
  sport: Sport;
  competition: string;
  startTime: string;
  status: EventStatus;
};
