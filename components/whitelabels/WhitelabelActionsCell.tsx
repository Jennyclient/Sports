"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import type { Whitelabel } from "@/types/whitelabel";

export type WhitelabelRowActions = {
  onView: (row: Whitelabel) => void;
  onEdit: (row: Whitelabel) => void;
  onDelete: (row: Whitelabel) => void;
};

type Props = {
  row: Whitelabel;
  actions: WhitelabelRowActions;
};

export default function WhitelabelActionsCell({ row, actions }: Props) {
  return (
    <Stack
      direction="row"
      spacing={0.25}
      sx={{ flexWrap: "nowrap", justifyContent: "flex-end", width: "100%" }}
    >
      <Tooltip title="View" arrow>
        <IconButton
          size="small"
          aria-label="View whitelabel"
          onClick={() => actions.onView(row)}
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" arrow>
        <IconButton
          size="small"
          aria-label="Edit whitelabel"
          onClick={() => actions.onEdit(row)}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" arrow>
        <IconButton
          size="small"
          aria-label="Delete whitelabel"
          color="error"
          onClick={() => actions.onDelete(row)}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
