"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import type { SportEvent } from "@/types/event";

type Props = {
  open: boolean;
  event: SportEvent | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function EventDeleteDialog({ open, event, onClose, onConfirm }: Props) {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 600 }}>Delete Event</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography variant="body1">
            Are you sure you want to delete this event?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{event.name}</strong> ({event.id}) will be permanently removed along
            with its markets. This action cannot be undone.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
