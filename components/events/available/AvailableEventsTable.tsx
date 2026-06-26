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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  hiddenOnSm,
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

export type AvailableEventActions = {
  onView: (row: SportEvent) => void;
  onEdit: (row: SportEvent) => void;
  onDelete: (row: SportEvent) => void;
};

type Props = {
  rows: SportEvent[];
  actions: AvailableEventActions;
  sortDir: SortDirection;
  onToggleSort: () => void;
};

export default function AvailableEventsTable({
  rows,
  actions,
  sortDir,
  onToggleSort,
}: Props) {
  if (rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, ...tablePaperSx, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No upcoming events match your filters.
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
      <Table size="medium" sx={{ minWidth: 820 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={tableHeaderCellSx}>Event ID</TableCell>
            <TableCell sx={tableHeaderCellSx}>Event Name</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnXs }}>Sport</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>League</TableCell>
            <TableCell sx={tableHeaderCellSx} sortDirection={sortDir}>
              <TableSortLabel active direction={sortDir} onClick={onToggleSort}>
                Start Time
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Markets
            </TableCell>
            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={{ ...tableBodyCellSx, fontFamily: "monospace", fontSize: 13 }}>
                {row.id}
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, fontWeight: 500 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <span>{sportEmoji(row.sport)}</span>
                  <span>{row.name}</span>
                </Stack>
              </TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnXs }}>{row.sport}</TableCell>
              <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnSm }}>{row.competition}</TableCell>
              <TableCell sx={{ ...tableBodyCellSx, whiteSpace: "nowrap" }}>
                {formatDateTime(row.startTime)}
              </TableCell>
              <TableCell align="right" sx={tableBodyCellSx}>
                {row.markets}
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
                >
                  <Tooltip title="View" arrow>
                    <IconButton size="small" aria-label="View event" onClick={() => actions.onView(row)}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton size="small" aria-label="Edit event" onClick={() => actions.onEdit(row)}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      size="small"
                      aria-label="Delete event"
                      color="error"
                      onClick={() => actions.onDelete(row)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
