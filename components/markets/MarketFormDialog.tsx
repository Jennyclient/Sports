"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import { SPORTS } from "@/components/events/common/constants";
import { MARKET_STATUSES, MARKET_TYPES } from "./constants";
import type { MarketFormValues } from "@/types/market";

const MarketSchema = z.object({
  id: z.string().min(1, "Market ID is required"),
  eventId: z.string().min(1, "Event ID is required"),
  eventName: z.string().min(1, "Event name is required"),
  sport: z.enum(["Cricket", "Football", "Tennis", "Basketball", "Hockey", "Kabaddi"]),
  marketType: z.enum(["Match Odds", "Book Maker", "Fancy", "Line", "Over/Under", "Toss"]),
  status: z.enum(["Open", "Suspended", "Settled", "Closed"]),
  volume: z.number().min(0, "Volume cannot be negative"),
});

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: MarketFormValues) => void;
};

const defaultValues: MarketFormValues = {
  id: "",
  eventId: "",
  eventName: "",
  sport: "Cricket",
  marketType: "Match Odds",
  status: "Open",
  volume: 0,
};

export default function MarketFormDialog({ open, onClose, onSubmit }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MarketFormValues>({
    resolver: zodResolver(MarketSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const submit = handleSubmit((values) => {
    onSubmit(values);
    onClose();
    reset(defaultValues);
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Add Market</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" id="market-form" onSubmit={submit} spacing={2.5} sx={{ pt: 0.5 }}>
          <TextField
            label="Market ID"
            fullWidth
            {...register("id")}
            error={Boolean(errors.id)}
            helperText={errors.id?.message ?? " "}
          />

          <Controller
            name="marketType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Market Type"
                fullWidth
                error={Boolean(errors.marketType)}
                helperText={errors.marketType?.message ?? " "}
              >
                {MARKET_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Event ID"
            fullWidth
            {...register("eventId")}
            error={Boolean(errors.eventId)}
            helperText={errors.eventId?.message ?? " "}
          />

          <TextField
            label="Event Name"
            fullWidth
            {...register("eventName")}
            error={Boolean(errors.eventName)}
            helperText={errors.eventName?.message ?? " "}
          />

          <Controller
            name="sport"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Sport"
                fullWidth
                error={Boolean(errors.sport)}
                helperText={errors.sport?.message ?? " "}
              >
                {SPORTS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                error={Boolean(errors.status)}
                helperText={errors.status?.message ?? " "}
              >
                {MARKET_STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Volume"
            type="number"
            fullWidth
            {...register("volume", { valueAsNumber: true })}
            error={Boolean(errors.volume)}
            helperText={errors.volume?.message ?? " "}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="market-form"
          variant="contained"
          disabled={isSubmitting}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
