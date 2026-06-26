"use client";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import {
  hiddenOnSm,
  hiddenOnXs,
  tableBodyCellSx,
  tableHeaderCellSx,
  tablePaperSx,
} from "@/components/common/tableStyles";
import { responsiveTableContainerSx } from "@/components/common/responsiveSx";
import { formatCurrency, formatDateTime } from "@/utils/format";
import type { SettlementRecord, SettlementStatus } from "@/types/settlement";

type Props = {
  rows: SettlementRecord[];
};

const statusColor = (status: SettlementStatus) => {
  switch (status) {
    case "Settled":
      return "success";
    case "Pending":
      return "warning";
    case "Failed":
      return "error";
    default:
      return "default";
  }
};

export default function SettlementTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, ...tablePaperSx, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No settlement records found.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ ...tablePaperSx, ...responsiveTableContainerSx }}
    >
      <Table size="medium" sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={tableHeaderCellSx}>Event</TableCell>
            <TableCell sx={tableHeaderCellSx}>Market</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>Market ID</TableCell>
            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnXs }}>Settlement Time</TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Profit/Loss
            </TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>Settled By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={{ ...tableBodyCellSx, fontWeight: 500 }}>{row.event}</TableCell>
              <TableCell sx={tableBodyCellSx}>{row.market}</TableCell>
              <TableCell
                sx={{ ...tableBodyCellSx, ...hiddenOnSm, fontFamily: "monospace", fontSize: 13 }}
              >
                {row.marketId}
              </TableCell>
              <TableCell sx={tableBodyCellSx}>
                <Chip
                  label={row.status}
                  size="small"
                  color={statusColor(row.status)}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnXs, whiteSpace: "nowrap" }}>
                {row.settlementTime ? formatDateTime(row.settlementTime) : "—"}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  ...tableBodyCellSx,
                  fontWeight: 600,
                  color:
                    row.profitLoss == null
                      ? "text.secondary"
                      : row.profitLoss >= 0
                        ? "success.main"
                        : "error.main",
                }}
              >
                {row.profitLoss != null
                  ? `${row.profitLoss >= 0 ? "+" : ""}${formatCurrency(row.profitLoss)}`
                  : "—"}
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnSm }}>
                {row.settledBy ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
