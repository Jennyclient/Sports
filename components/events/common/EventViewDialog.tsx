"use client";

import type { ReactNode } from "react";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import { formatDateTime, sportEmoji } from "@/utils/format";
import { eventStatusColor } from "./status";
import type { SportEvent } from "@/types/event";

type Props = {
  open: boolean;
  event: SportEvent | null;
  onClose: () => void;
};

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" component="div">
        {value}
      </Typography>
    </Stack>
  );
}

export default function EventViewDialog({ open, event, onClose }: Props) {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Event Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5}>
          <DetailRow
            label="Event ID"
            value={
              <Typography component="span" sx={{ fontFamily: "monospace", fontSize: 13 }}>
                {event.id}
              </Typography>
            }
          />
          <DetailRow
            label="Event Name"
            value={
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <span>{sportEmoji(event.sport)}</span>
                <span>{event.name}</span>
              </Stack>
            }
          />
          <DetailRow label="Sport" value={event.sport} />
          <DetailRow label="League" value={event.competition} />
          <DetailRow label="Start Time" value={formatDateTime(event.startTime)} />
          <DetailRow label="Markets" value={event.markets} />
          <DetailRow
            label="Status"
            value={
              <Chip
                label={event.status}
                size="small"
                color={eventStatusColor(event.status)}
                variant="outlined"
              />
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ textTransform: "none", width: { xs: "100%", sm: "auto" } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
