"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Whitelabel } from "@/types/whitelabel";
import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";

type Props = {
  open: boolean;
  whitelabel: Whitelabel | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function WhitelabelDeleteDialog({
  open,
  whitelabel,
  onClose,
  onConfirm,
}: Props) {
  if (!whitelabel) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 600 }}>Delete Whitelabel</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography variant="body1">
            Are you sure you want to delete this whitelabel?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{whitelabel.name}</strong> will be permanently removed along
            with its API key, IP allowlist, and rate limit settings. This action
            cannot be undone.
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
