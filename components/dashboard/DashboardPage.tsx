"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";

import { DASHBOARD_SEED } from "./dashboardSeed";
import KpiStatCard from "./KpiStatCard";
import LiveEventsWidget from "./LiveEventsWidget";
import MarketOverview from "./MarketOverview";
import SportsDistributionChart from "./SportsDistributionChart";
import UpcomingEventsWidget from "./UpcomingEventsWidget";
import RecentSettlements from "./RecentSettlements";
import ApiRequestsTrend from "./ApiRequestsTrend";
import TopWhitelabelsByApiUsage from "./TopWhitelabelsByApiUsage";
import { formatCurrency, formatNumber } from "./utils";

export default function DashboardPage() {
  const data = DASHBOARD_SEED;
  const { kpis, whitelabelRateLimiting } = data;

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        Overview of platform activity, events, markets, users, and whitelabel API usage.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Total Events"
            value={formatNumber(kpis.totalEvents)}
            icon={<EventOutlinedIcon fontSize="small" />}
            accent="#3b82f6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Live Events"
            value={formatNumber(kpis.liveEvents)}
            icon={<FiberManualRecordIcon fontSize="small" />}
            accent="#22c55e"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Total Markets"
            value={formatNumber(kpis.totalMarkets)}
            icon={<StorefrontOutlinedIcon fontSize="small" />}
            accent="#8b5cf6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Active Users"
            value={formatNumber(kpis.activeUsers)}
            icon={<PeopleOutlinedIcon fontSize="small" />}
            accent="#f59e0b"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Total Bets Today"
            value={formatNumber(kpis.totalBetsToday)}
            icon={<CasinoOutlinedIcon fontSize="small" />}
            accent="#06b6d4"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Revenue Today"
            value={formatCurrency(kpis.revenueToday)}
            icon={<MonetizationOnOutlinedIcon fontSize="small" />}
            accent="#10b981"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Suspended Markets"
            value={formatNumber(kpis.suspendedMarkets)}
            subtitle="Click to investigate"
            icon={<PauseCircleOutlinedIcon fontSize="small" />}
            accent="#f59e0b"
            href="/markets"
            alert
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiStatCard
            label="Pending Settlements"
            value={formatNumber(kpis.pendingSettlements)}
            subtitle="Requires attention"
            icon={<PendingActionsOutlinedIcon fontSize="small" />}
            accent="#ef4444"
            href="/settlement"
            alert={kpis.pendingSettlements > 0}
          />
        </Grid>
      </Grid>

      <Stack spacing={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Whitelabel Rate Limiting
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiStatCard
              label="Total Whitelabels"
              value={formatNumber(kpis.totalWhitelabels)}
              icon={<BusinessOutlinedIcon fontSize="small" />}
              accent="#3b82f6"
              href="/whitelabels"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiStatCard
              label="Active Whitelabels"
              value={formatNumber(kpis.activeWhitelabels)}
              icon={<CheckCircleOutlinedIcon fontSize="small" />}
              accent="#22c55e"
              href="/whitelabels"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiStatCard
              label="Total API Requests Today"
              value={formatNumber(whitelabelRateLimiting.totalApiRequestsToday)}
              icon={<ApiOutlinedIcon fontSize="small" />}
              accent="#8b5cf6"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiStatCard
              label="Average Rate Limit Usage"
              value={`${whitelabelRateLimiting.averageRateLimitUsage}%`}
              subtitle="Across active whitelabels"
              icon={<SpeedOutlinedIcon fontSize="small" />}
              accent="#f59e0b"
              alert={whitelabelRateLimiting.averageRateLimitUsage >= 80}
            />
          </Grid>
        </Grid>
      </Stack>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <ApiRequestsTrend data={whitelabelRateLimiting} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <TopWhitelabelsByApiUsage whitelabels={whitelabelRateLimiting.topWhitelabels} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <LiveEventsWidget events={data.liveEvents} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <MarketOverview
            total={kpis.totalMarkets}
            open={kpis.openMarkets}
            suspended={kpis.suspendedMarkets}
            settled={kpis.settledMarkets}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <UpcomingEventsWidget events={data.upcomingEvents} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <SportsDistributionChart stats={data.sportStats} />
        </Grid>
      </Grid>

      <RecentSettlements settlements={data.settlements} />
    </Stack>
  );
}
