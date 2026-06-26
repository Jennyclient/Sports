"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import type { AdminRole, AdminUserFormValues, PermissionLevel } from "@/types/management";
import { MODULES, fillPermissions, roleDefaultPermissions } from "./modules";

const levelFromChecks = (view: boolean, edit: boolean): PermissionLevel =>
  edit ? "edit" : view ? "view" : "none";

const ROLE_OPTIONS: AdminRole[] = ["Operator", "Viewer"];

const PermissionEnum = z.enum(["none", "view", "edit"]);

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  role: z.enum(["Operator", "Viewer"]),
  status: z.enum(["active", "inactive"]),
  permissions: z.object({
    whitelabels: PermissionEnum,
    dashboard: PermissionEnum,
    availableEvents: PermissionEnum,
    liveEvents: PermissionEnum,
    markets: PermissionEnum,
    management: PermissionEnum,
    settlement: PermissionEnum,
  }),
});

type Props = {
  open: boolean;
  mode?: "add" | "edit";
  initialValues?: AdminUserFormValues;
  onClose: () => void;
  onSubmit: (values: AdminUserFormValues) => void;
};

const defaultValues: AdminUserFormValues = {
  name: "",
  email: "",
  role: "Operator",
  status: "active",
  permissions: roleDefaultPermissions("Operator"),
};

export default function UserFormDialog({
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminUserFormValues>({
    resolver: zodResolver(UserSchema),
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

  const applyRoleDefaults = (role: AdminRole) => {
    setValue("permissions", roleDefaultPermissions(role), { shouldDirty: true });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 600 }}>
        {isEdit ? "Edit User" : "Add User"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack component="form" id="user-form" onSubmit={submit} spacing={2} sx={{ pt: 0.5 }}>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Name"
                fullWidth
                size="small"
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name?.message ?? " "}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                size="small"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message ?? " "}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    fullWidth
                    size="small"
                    onChange={(e) => {
                      field.onChange(e);
                      applyRoleDefaults(e.target.value as AdminRole);
                    }}
                    error={Boolean(errors.role)}
                    helperText={errors.role?.message ?? "Changing role resets permissions"}
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    size="small"
                    error={Boolean(errors.status)}
                    helperText={errors.status?.message ?? " "}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Divider />

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack spacing={0.25}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Module Permissions
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Set access level for each module.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                color="inherit"
                onClick={() => setValue("permissions", fillPermissions("view"), { shouldDirty: true })}
                sx={{ textTransform: "none" }}
              >
                All View
              </Button>
              <Button
                size="small"
                color="inherit"
                onClick={() => setValue("permissions", fillPermissions("none"), { shouldDirty: true })}
                sx={{ textTransform: "none" }}
              >
                Clear
              </Button>
            </Stack>
          </Stack>

          <Grid container columnSpacing={2} rowSpacing={1}>
            {MODULES.map((module) => (
              <Grid key={module.key} size={12}>
                <Controller
                  name={`permissions.${module.key}`}
                  control={control}
                  render={({ field }) => {
                    const canView = field.value !== "none";
                    const canEdit = field.value === "edit";
                    return (
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          pl: 1.25,
                          pr: 0.5,
                          py: 0.25,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            mr: 1,
                          }}
                        >
                          {module.label}
                        </Typography>
                        <Stack direction="row" sx={{ flexShrink: 0 }}>
                          <FormControlLabel
                            sx={{ m: 0 }}
                            control={
                              <Checkbox
                                size="small"
                                sx={{ p: 0.5 }}
                                checked={canView}
                                onChange={(e) =>
                                  field.onChange(
                                    levelFromChecks(e.target.checked, canEdit && e.target.checked),
                                  )
                                }
                                slotProps={{ input: { "aria-label": `${module.label} view` } }}
                              />
                            }
                            label={<Typography variant="caption">View</Typography>}
                          />
                          <FormControlLabel
                            sx={{ m: 0 }}
                            control={
                              <Checkbox
                                size="small"
                                sx={{ p: 0.5 }}
                                checked={canEdit}
                                onChange={(e) =>
                                  field.onChange(
                                    levelFromChecks(e.target.checked || canView, e.target.checked),
                                  )
                                }
                                slotProps={{ input: { "aria-label": `${module.label} edit` } }}
                              />
                            }
                            label={<Typography variant="caption">Edit</Typography>}
                          />
                        </Stack>
                      </Stack>
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="user-form"
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
