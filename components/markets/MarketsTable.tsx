"use client";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
import { formatCurrency, formatDateTime, sportEmoji } from "@/utils/format";
import type { Market, MarketStatus } from "@/types/market";

type Props = {
  rows: Market[];
};

const statusColor = (status: MarketStatus) => {
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

export default function MarketsTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, ...tablePaperSx, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No markets found.
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
            <TableCell sx={tableHeaderCellSx}>Market ID</TableCell>
            <TableCell sx={tableHeaderCellSx}>Market Type</TableCell>
            <TableCell sx={tableHeaderCellSx}>Event</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnXs }}>Sport</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>Event ID</TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Volume
            </TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>Last Updated</TableCell>
            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={{ ...tableBodyCellSx, fontFamily: "monospace", fontSize: 13 }}>
                {row.id}
              </TableCell>
              <TableCell sx={tableBodyCellSx}>{row.marketType}</TableCell>
              <TableCell sx={{ ...tableBodyCellSx, fontWeight: 500 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <span>{sportEmoji(row.sport)}</span>
                  <span>{row.eventName}</span>
                </Stack>
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnXs }}>{row.sport}</TableCell>
              <TableCell
                sx={{ ...tableBodyCellSx, ...hiddenOnSm, fontFamily: "monospace", fontSize: 13 }}
              >
                {row.eventId}
              </TableCell>
              <TableCell align="right" sx={tableBodyCellSx}>
                {row.volume > 0 ? formatCurrency(row.volume) : "—"}
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnSm, whiteSpace: "nowrap" }}>
                {formatDateTime(row.lastUpdated)}
              </TableCell>
              <TableCell sx={tableBodyCellSx}>
                <Chip
                  label={row.status}
                  size="small"
                  color={statusColor(row.status)}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
