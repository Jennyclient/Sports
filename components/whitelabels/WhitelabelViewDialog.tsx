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

import type { Whitelabel } from "@/types/whitelabel";
import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import { formatWhitelabelDate } from "@/utils/whitelabel";

type Props = {
  open: boolean;
  whitelabel: Whitelabel | null;
  onClose: () => void;
};

type DetailRowProps = {
  label: string;
  value: ReactNode;
};

function DetailRow({ label, value }: DetailRowProps) {
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

export default function WhitelabelViewDialog({ open, whitelabel, onClose }: Props) {
  if (!whitelabel) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Whitelabel Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5}>
          <DetailRow label="Name" value={whitelabel.name} />
          <DetailRow label="Company" value={whitelabel.company} />
          <DetailRow
            label="Key"
            value={
              <Typography
                component="span"
                sx={{ fontFamily: "monospace", fontSize: 13 }}
              >
                {whitelabel.key}
              </Typography>
            }
          />
          <DetailRow label="Whitelisted IP" value={whitelabel.whitelistedIp} />
          <DetailRow
            label="Status"
            value={
              <Chip
                label={whitelabel.status === "active" ? "Active" : "Inactive"}
                size="small"
                color={whitelabel.status === "active" ? "success" : "default"}
                variant="outlined"
              />
            }
          />
          <DetailRow label="Rate Limit" value={whitelabel.rateLimit} />
          <DetailRow label="Email" value={whitelabel.email} />
          <DetailRow
            label="Created On"
            value={formatWhitelabelDate(whitelabel.createdAt)}
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
