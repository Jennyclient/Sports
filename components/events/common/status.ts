import type { EventStatus } from "@/types/dashboard";
import type { MarketStatus } from "@/types/market";

type ChipColor = "default" | "info" | "success" | "warning" | "error";

export const eventStatusColor = (status: EventStatus): ChipColor => {
  switch (status) {
    case "Live":
      return "success";
    case "Incoming":
    case "Upcoming":
      return "info";
    case "Suspended":
      return "warning";
    case "Closed":
      return "default";
    default:
      return "default";
  }
};

export const marketStatusColor = (status: MarketStatus): ChipColor => {
  switch (status) {
    case "Open":
      return "success";
    case "Suspended":
      return "warning";
    case "Settled":
      return "info";
    default:
      return "default";
  }
};
