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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";

import {
  hiddenOnSm,
  hiddenOnXs,
  tableBodyCellSx,
  tableHeaderCellSx,
  tablePaperSx,
} from "@/components/common/tableStyles";
import { responsiveTableContainerSx } from "@/components/common/responsiveSx";
import { formatDateTime } from "@/utils/format";
import type { AdminStatus, AdminUser } from "@/types/management";

export type ManagementActions = {
  onEdit: (row: AdminUser) => void;
  onToggleStatus: (row: AdminUser) => void;
};

type Props = {
  rows: AdminUser[];
  actions: ManagementActions;
};

const statusColor = (status: AdminStatus) => {
  switch (status) {
    case "active":
      return "success";
    case "blocked":
      return "error";
    default:
      return "default";
  }
};

const statusLabel = (status: AdminStatus) =>
  status === "active" ? "Active" : status === "blocked" ? "Blocked" : "Inactive";

export default function ManagementTable({ rows, actions }: Props) {
  if (rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, ...tablePaperSx, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No users found.
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
      <Table size="medium" sx={{ minWidth: 760 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={tableHeaderCellSx}>Name</TableCell>
            <TableCell sx={tableHeaderCellSx}>Email</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnXs }}>Role</TableCell>
            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
            <TableCell sx={{ ...tableHeaderCellSx, ...hiddenOnSm }}>Last Login</TableCell>
            <TableCell align="right" sx={tableHeaderCellSx}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isActive = row.status === "active";
            return (
              <TableRow key={row.id} hover>
                <TableCell sx={{ ...tableBodyCellSx, fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell sx={tableBodyCellSx}>{row.email}</TableCell>
                <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnXs }}>{row.role}</TableCell>
                <TableCell sx={tableBodyCellSx}>
                  <Chip
                    label={statusLabel(row.status)}
                    size="small"
                    color={statusColor(row.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ ...tableBodyCellSx, ...hiddenOnSm, whiteSpace: "nowrap" }}>
                  {formatDateTime(row.lastLogin)}
                </TableCell>
                <TableCell align="right" sx={tableBodyCellSx}>
                  <Stack
                    direction="row"
                    spacing={0.25}
                    sx={{ flexWrap: "nowrap", justifyContent: "flex-end" }}
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton size="small" aria-label="Edit user" onClick={() => actions.onEdit(row)}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isActive ? "Disable" : "Enable"} arrow>
                      <IconButton
                        size="small"
                        aria-label={isActive ? "Disable user" : "Enable user"}
                        color={isActive ? "warning" : "success"}
                        onClick={() => actions.onToggleStatus(row)}
                      >
                        {isActive ? (
                          <ToggleOnOutlinedIcon fontSize="small" />
                        ) : (
                          <ToggleOffOutlinedIcon fontSize="small" />
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
