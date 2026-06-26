"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ManagementTable from "./ManagementTable";
import UserFormDialog from "./UserFormDialog";
import { MANAGEMENT_SEED } from "./seed";
import type { AdminUser, AdminUserFormValues } from "@/types/management";

const createId = () =>
  `adm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const toFormValues = (row: AdminUser): AdminUserFormValues => ({
  name: row.name,
  email: row.email,
  role: row.role,
  status: row.status === "blocked" ? "inactive" : row.status,
  permissions: row.permissions,
});

export default function ManagementPage() {
  const [rows, setRows] = useState<AdminUser[]>(MANAGEMENT_SEED);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<AdminUser | null>(null);

  const openAddDialog = () => {
    setFormMode("add");
    setEditingRow(null);
    setFormOpen(true);
  };

  const openEditDialog = (row: AdminUser) => {
    setFormMode("edit");
    setEditingRow(row);
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
    setEditingRow(null);
  };

  const handleFormSubmit = (values: AdminUserFormValues) => {
    if (formMode === "edit" && editingRow) {
      setRows((prev) =>
        prev.map((row) => (row.id === editingRow.id ? { ...row, ...values } : row)),
      );
      setEditingRow(null);
      return;
    }
    setRows((prev) => [
      { id: createId(), ...values, lastLogin: new Date().toISOString() },
      ...prev,
    ]);
  };

  const handleToggleStatus = (row: AdminUser) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === row.id
          ? { ...item, status: item.status === "active" ? "inactive" : "active" }
          : item,
      ),
    );
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            Admin users, roles and access control. Manage operators and viewers and review
            account activity.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={openAddDialog}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" }, textTransform: "none", fontWeight: 600 }}
        >
          Add User
        </Button>
      </Stack>

      <ManagementTable
        rows={rows}
        actions={{ onEdit: openEditDialog, onToggleStatus: handleToggleStatus }}
      />

      <UserFormDialog
        open={formOpen}
        mode={formMode}
        initialValues={editingRow ? toFormValues(editingRow) : undefined}
        onClose={closeFormDialog}
        onSubmit={handleFormSubmit}
      />
    </Stack>
  );
}
