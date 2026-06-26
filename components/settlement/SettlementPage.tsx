"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SettlementTable from "./SettlementTable";
import { SETTLEMENT_SEED } from "./seed";

export default function SettlementPage() {
  const pending = SETTLEMENT_SEED.filter((r) => r.status === "Pending").length;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Settle markets and review settled positions.{" "}
          {pending > 0 ? `${pending} settlements pending attention.` : "All settlements up to date."}
        </Typography>
      </Box>
      <SettlementTable rows={SETTLEMENT_SEED} />
    </Stack>
  );
}
