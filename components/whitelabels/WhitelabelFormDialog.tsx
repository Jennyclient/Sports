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

import type { WhitelabelFormValues } from "@/types/whitelabel";
import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";

const WhitelabelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  key: z.string().min(1, "Key is required"),
  whitelistedIp: z.string().min(1, "Whitelisted IP is required"),
  status: z.enum(["active", "inactive"]),
  rateLimit: z.number().int().min(1, "Rate limit must be at least 1"),
  email: z.email("Invalid email"),
});

type Props = {
  open: boolean;
  mode?: "add" | "edit";
  initialValues?: WhitelabelFormValues;
  onClose: () => void;
  onSubmit: (values: WhitelabelFormValues) => void;
};

const defaultValues: WhitelabelFormValues = {
  name: "",
  company: "",
  key: "",
  whitelistedIp: "",
  status: "active",
  rateLimit: 100,
  email: "",
};

export default function WhitelabelFormDialog({
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
  } = useForm<WhitelabelFormValues>({
    resolver: zodResolver(WhitelabelSchema),
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
        {isEdit ? "Edit Whitelabel" : "Add Whitelabel"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack
          component="form"
          id="whitelabel-form"
          onSubmit={submit}
          spacing={2.5}
          sx={{ pt: 0.5 }}
        >
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message ?? " "}
          />

          <TextField
            label="Company"
            fullWidth
            {...register("company")}
            error={Boolean(errors.company)}
            helperText={errors.company?.message ?? " "}
          />

          <TextField
            label="Key"
            fullWidth
            disabled={isEdit}
            {...register("key")}
            error={Boolean(errors.key)}
            helperText={
              errors.key?.message ??
              (isEdit ? "API key cannot be changed after creation" : " ")
            }
          />

          <TextField
            label="Whitelisted IP"
            fullWidth
            placeholder="e.g. 192.168.1.1"
            {...register("whitelistedIp")}
            error={Boolean(errors.whitelistedIp)}
            helperText={errors.whitelistedIp?.message ?? " "}
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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            )}
          />

          <TextField
            label="Rate Limit"
            type="number"
            fullWidth
            {...register("rateLimit", { valueAsNumber: true })}
            error={Boolean(errors.rateLimit)}
            helperText={errors.rateLimit?.message ?? "API requests per minute"}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? " "}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="whitelabel-form"
          variant="contained"
          disabled={isSubmitting}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {isEdit ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
