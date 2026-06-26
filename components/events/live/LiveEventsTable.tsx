"use client";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";

import {
  hiddenOnXs,
  tableBodyCellSx,
  tableHeaderCellSx,
  tablePaperSx,
} from "@/components/common/tableStyles";
import { responsiveTableContainerSx } from "@/components/common/responsiveSx";
import { formatDateTime, sportEmoji } from "@/utils/format";
import { eventStatusColor } from "@/components/events/common/status";
import type { SortDirection } from "@/components/events/common/constants";
import type { SportEvent } from "@/types/event";

export type LiveEventActions = {
  onViewAssigned: (row: SportEvent) => void;
  onAddMarkets: (row: SportEvent) => void;
  onToggleDisable: (row: SportEvent) => void;
};

type Props = {
  rows: SportEvent[];
  activeMarketsFor: (row: SportEvent) => number;
  actions: LiveEventActions;
  sortDir: SortDirection;
  onToggleSort: () => void;
};

export default function LiveEventsTable({
  rows,
  activeMarketsFor,
  actions,
  sortDir,
  onToggleSort,
}: Props) {
  if (rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, ...tablePaperSx, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No live events match your filters.
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
      <Table size="medium" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={tableHeaderCellSx}>Event ID</TableCell>
            <TableCell sx={tableHeaderCellSx}>Event Name</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnXs }}>Sport</TableCell>
            <TableCell sx={tableHeaderCellSx} sortDirection={sortDir}>
              <TableSortLabel active direction={sortDir} onClick={onToggleSort}>
                Start Time
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Active Markets
            </TableCell>
            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const disabled = row.status === "Suspended";
            return (
              <TableRow key={row.id} hover>
                <TableCell sx={{ ...tableBodyCellSx, fontFamily: "monospace", fontSize: 13 }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ ...tableBodyCellSx, fontWeight: 500 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <span>{sportEmoji(row.sport)}</span>
                    <Link
                      component="button"
                      type="button"
                      underline="hover"
                      color="primary"
                      onClick={() => actions.onViewAssigned(row)}
                      sx={{ fontWeight: 600, textAlign: "left", cursor: "pointer" }}
                    >
                      {row.name}
                    </Link>
                  </Stack>
                </TableCell>
                <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnXs }}>{row.sport}</TableCell>
                <TableCell sx={{ ...tableBodyCellSx, whiteSpace: "nowrap" }}>
                  {formatDateTime(row.startTime)}
                </TableCell>
                <TableCell align="right" sx={tableBodyCellSx}>
                  {activeMarketsFor(row)}
                </TableCell>
                <TableCell sx={tableBodyCellSx}>
                  <Chip
                    label={row.status}
                    size="small"
                    color={eventStatusColor(row.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right" sx={tableBodyCellSx}>
                  <Stack
                    direction="row"
                    spacing={0.25}
                    sx={{ flexWrap: "nowrap", justifyContent: "flex-end" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Tooltip title="Add Markets" arrow>
                      <IconButton
                        size="small"
                        aria-label="Add markets"
                        color="primary"
                        onClick={() => actions.onAddMarkets(row)}
                      >
                        <AddBusinessOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={disabled ? "Enable Event" : "Disable Event"} arrow>
                      <IconButton
                        size="small"
                        aria-label={disabled ? "Enable event" : "Disable event"}
                        color={disabled ? "success" : "warning"}
                        onClick={() => actions.onToggleDisable(row)}
                      >
                        {disabled ? (
                          <PlayCircleOutlineIcon fontSize="small" />
                        ) : (
                          <BlockOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
