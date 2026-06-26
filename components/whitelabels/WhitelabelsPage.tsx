"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import WhitelabelDeleteDialog from "./WhitelabelDeleteDialog";
import WhitelabelFormDialog from "./WhitelabelFormDialog";
import WhitelabelViewDialog from "./WhitelabelViewDialog";
import WhitelabelsTable from "./WhitelabelsTable";
import type { Whitelabel, WhitelabelFormValues } from "@/types/whitelabel";
import { generateApiKey } from "@/utils/whitelabel";

const SEED_DATA: Whitelabel[] = [
  {
    id: "wl-1",
    name: "Alpha Sports",
    company: "Alpha Gaming Ltd",
    key: "wl_alpha_9f2k",
    whitelistedIp: "203.0.113.10",
    status: "active",
    rateLimit: 500,
    email: "ops@alphasports.com",
    createdAt: "2026-06-10T10:00:00.000Z",
  },
  {
    id: "wl-2",
    name: "Beta Exchange",
    company: "Beta Corp",
    key: "wl_beta_7x1m",
    whitelistedIp: "198.51.100.22",
    status: "inactive",
    rateLimit: 200,
    email: "admin@betaexchange.io",
    createdAt: "2026-06-15T14:30:00.000Z",
  },
];

const createId = () =>
  `wl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const toFormValues = (row: Whitelabel): WhitelabelFormValues => ({
  name: row.name,
  company: row.company,
  key: row.key,
  whitelistedIp: row.whitelistedIp,
  status: row.status,
  rateLimit: row.rateLimit,
  email: row.email,
});

export default function WhitelabelsPage() {
  const [rows, setRows] = useState<Whitelabel[]>(SEED_DATA);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<Whitelabel | null>(null);
  const [viewRow, setViewRow] = useState<Whitelabel | null>(null);
  const [deleteRow, setDeleteRow] = useState<Whitelabel | null>(null);

  const handleAdd = (values: WhitelabelFormValues) => {
    const key = values.key.trim() || generateApiKey(values.name);
    setRows((prev) => [
      {
        id: createId(),
        ...values,
        key,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const handleEdit = (values: WhitelabelFormValues) => {
    if (!editingRow) return;

    setRows((prev) =>
      prev.map((row) =>
        row.id === editingRow.id ? { ...row, ...values, key: row.key } : row,
      ),
    );
    setEditingRow(null);
  };

  const handleFormSubmit = (values: WhitelabelFormValues) => {
    if (formMode === "edit") {
      handleEdit(values);
      return;
    }
    handleAdd(values);
  };

  const openAddDialog = () => {
    setFormMode("add");
    setEditingRow(null);
    setFormOpen(true);
  };

  const openEditDialog = (row: Whitelabel) => {
    setFormMode("edit");
    setEditingRow(row);
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
    setEditingRow(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteRow) return;

    setRows((prev) => prev.filter((item) => item.id !== deleteRow.id));
    setDeleteRow(null);
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
            Manage whitelabel partners, API keys, IP allowlists and rate limits.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={openAddDialog}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" }, textTransform: "none", fontWeight: 600 }}
        >
          Add Whitelabel
        </Button>
      </Stack>

      <WhitelabelsTable
        rows={rows}
        actions={{
          onView: setViewRow,
          onEdit: openEditDialog,
          onDelete: setDeleteRow,
        }}
      />

      <WhitelabelFormDialog
        open={formOpen}
        mode={formMode}
        initialValues={editingRow ? toFormValues(editingRow) : undefined}
        onClose={closeFormDialog}
        onSubmit={handleFormSubmit}
      />

      <WhitelabelViewDialog
        open={Boolean(viewRow)}
        whitelabel={viewRow}
        onClose={() => setViewRow(null)}
      />

      <WhitelabelDeleteDialog
        open={Boolean(deleteRow)}
        whitelabel={deleteRow}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
}
