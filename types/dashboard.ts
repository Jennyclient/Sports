export type Sport =
  | "Cricket"
  | "Football"
  | "Tennis"
  | "Basketball"
  | "Hockey"
  | "Kabaddi";

export type EventStatus = "Live" | "Upcoming" | "Incoming" | "Closed" | "Suspended";

export type FeedStatus = "connected" | "degraded" | "disconnected";

export type DashboardKpis = {
  totalEvents: number;
  liveEvents: number;
  totalMarkets: number;
  activeUsers: number;
  totalBetsToday: number;
  openMarkets: number;
  suspendedMarkets: number;
  settledMarkets: number;
  revenueToday: number;
  pendingSettlements: number;
  activeWhitelabels: number;
  totalWhitelabels: number;
};

export type SystemHealth = {
  feedStatus: FeedStatus;
  apiHealth: number;
};

export type SportStat = {
  sport: Sport;
  events: number;
};

export type LiveEvent = {
  id: string;
  name: string;
  sport: Sport;
  startTime: string;
  status: EventStatus;
  activeMarkets: number;
};

export type UpcomingEvent = {
  id: string;
  name: string;
  sport: Sport;
  startTime: string;
  markets: number;
};

export type Settlement = {
  id: string;
  event: string;
  market: string;
  settlementTime: string;
  profitLoss: number;
};

export type WhitelabelApiUsage = {
  id: string;
  name: string;
  requests: number;
  rateLimit: number;
};

export type ApiRequestTrendPoint = {
  label: string;
  requests: number;
};

export type WhitelabelRateLimiting = {
  totalApiRequests: number;
  totalApiRequestsToday: number;
  currentRateLimitUsage: number;
  rateLimitCapacity: number;
  remainingRequests: number;
  averageRateLimitUsage: number;
  topWhitelabels: WhitelabelApiUsage[];
  trend: ApiRequestTrendPoint[];
};

export type DashboardData = {
  kpis: DashboardKpis;
  systemHealth: SystemHealth;
  sportStats: SportStat[];
  liveEvents: LiveEvent[];
  upcomingEvents: UpcomingEvent[];
  settlements: Settlement[];
  whitelabelRateLimiting: WhitelabelRateLimiting;
};
