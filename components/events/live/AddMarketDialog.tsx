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
import type { AddableMarketType, MarketStatus } from "@/types/market";

export type AddMarketFormValues = {
  name: string;
  marketType: AddableMarketType;
  status: Extract<MarketStatus, "Open" | "Suspended">;
};

const ADDABLE_MARKET_TYPES: AddableMarketType[] = ["Book Maker", "Fancy"];

const MarketSchema = z.object({
  name: z.string().min(1, "Market name is required"),
  marketType: z.enum(["Book Maker", "Fancy"]),
  status: z.enum(["Open", "Suspended"]),
});

type Props = {
  open: boolean;
  eventName: string;
  defaultType?: AddableMarketType;
  onClose: () => void;
  onSubmit: (values: AddMarketFormValues) => void;
};

const baseDefaults: AddMarketFormValues = {
  name: "",
  marketType: "Book Maker",
  status: "Open",
};

export default function AddMarketDialog({
  open,
  eventName,
  defaultType = "Book Maker",
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddMarketFormValues>({
    resolver: zodResolver(MarketSchema),
    defaultValues: baseDefaults,
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) reset({ ...baseDefaults, marketType: defaultType });
  }, [open, defaultType, reset]);

  const submit = handleSubmit((values) => {
    onSubmit(values);
    onClose();
    reset(baseDefaults);
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Add Market</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" id="add-market-form" onSubmit={submit} spacing={2.5} sx={{ pt: 0.5 }}>
          <TextField
            label="Market Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message ?? " "}
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
                {ADDABLE_MARKET_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField label="Event" fullWidth value={eventName} disabled helperText=" " />

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
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </TextField>
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-market-form"
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
