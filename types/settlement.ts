export type SettlementStatus = "Pending" | "Settled" | "Failed";

export type SettlementRecord = {
  id: string;
  event: string;
  market: string;
  marketId: string;
  status: SettlementStatus;
  settlementTime: string | null;
  profitLoss: number | null;
  settledBy: string | null;
};
