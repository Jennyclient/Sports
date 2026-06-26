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
import type { SportEventFormValues } from "@/types/event";
import type { EventStatus } from "@/types/dashboard";
import { SPORTS } from "./constants";

const STATUS_OPTIONS: EventStatus[] = ["Incoming", "Suspended", "Closed"];

const EventSchema = z.object({
  id: z.string().min(1, "Event ID is required"),
  name: z.string().min(1, "Event name is required"),
  sport: z.enum(["Cricket", "Football", "Tennis", "Basketball", "Hockey", "Kabaddi"]),
  competition: z.string().min(1, "League is required"),
  startTime: z.string().min(1, "Start time is required"),
  status: z.enum(["Live", "Upcoming", "Incoming", "Closed", "Suspended"]),
});

type Props = {
  open: boolean;
  mode?: "add" | "edit";
  initialValues?: SportEventFormValues;
  onClose: () => void;
  onSubmit: (values: SportEventFormValues) => void;
};

const defaultValues: SportEventFormValues = {
  id: "",
  name: "",
  sport: "Cricket",
  competition: "",
  startTime: "",
  status: "Incoming",
};

export default function EventFormDialog({
  open,
  mode = "add",
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = mode === "edit";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SportEventFormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) {
      reset(initialValues ?? defaultValues);
    } else {
      reset(defaultValues);
    }
  }, [open, initialValues, reset]);

  const submit = handleSubmit((values) => {
    onSubmit(values);
    onClose();
    reset(defaultValues);
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>
        {isEdit ? "Edit Event" : "Add Event"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack component="form" id="event-form" onSubmit={submit} spacing={2.5} sx={{ pt: 0.5 }}>
          <TextField
            label="Event ID"
            fullWidth
            disabled={isEdit}
            {...register("id")}
            error={Boolean(errors.id)}
            helperText={errors.id?.message ?? (isEdit ? "Event ID cannot be changed" : " ")}
          />

          <TextField
            label="Event Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message ?? " "}
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

          <TextField
            label="League"
            fullWidth
            {...register("competition")}
            error={Boolean(errors.competition)}
            helperText={errors.competition?.message ?? " "}
          />

          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            {...register("startTime")}
            error={Boolean(errors.startTime)}
            helperText={errors.startTime?.message ?? " "}
            slotProps={{ inputLabel: { shrink: true } }}
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
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
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
          form="event-form"
          variant="contained"
          disabled={isSubmitting}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {isEdit ? "Save Changes" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
