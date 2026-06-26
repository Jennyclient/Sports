"use client";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import AvailableEventsTable from "./AvailableEventsTable";
import { AVAILABLE_EVENTS_SEED } from "./seed";
import EventFilters from "@/components/events/common/EventFilters";
import EventFormDialog from "@/components/events/common/EventFormDialog";
import EventDeleteDialog from "@/components/events/common/EventDeleteDialog";
import EventViewDialog from "@/components/events/common/EventViewDialog";
import type { EventSearchField, SortDirection } from "@/components/events/common/constants";
import type { Sport } from "@/types/dashboard";
import type { SportEvent, SportEventFormValues } from "@/types/event";

const toFormValues = (row: SportEvent): SportEventFormValues => ({
  id: row.id,
  name: row.name,
  sport: row.sport,
  competition: row.competition,
  startTime: row.startTime,
  status: row.status,
});

export default function AvailableEventsPage() {
  const [rows, setRows] = useState<SportEvent[]>(AVAILABLE_EVENTS_SEED);

  const [sport, setSport] = useState<Sport | "All">("All");
  const [searchField, setSearchField] = useState<EventSearchField>("name");
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingRow, setEditingRow] = useState<SportEvent | null>(null);
  const [viewRow, setViewRow] = useState<SportEvent | null>(null);
  const [deleteRow, setDeleteRow] = useState<SportEvent | null>(null);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows
      .filter((row) => (sport === "All" ? true : row.sport === sport))
      .filter((row) => {
        if (!query) return true;
        const haystack = searchField === "id" ? row.id : row.name;
        return haystack.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const diff = new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        return sortDir === "asc" ? diff : -diff;
      });
  }, [rows, sport, search, searchField, sortDir]);

  const openAddDialog = () => {
    setFormMode("add");
    setEditingRow(null);
    setFormOpen(true);
  };

  const openEditDialog = (row: SportEvent) => {
    setFormMode("edit");
    setEditingRow(row);
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
    setEditingRow(null);
  };

  const handleFormSubmit = (values: SportEventFormValues) => {
    if (formMode === "edit" && editingRow) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingRow.id ? { ...row, ...values } : row,
        ),
      );
      setEditingRow(null);
      return;
    }
    setRows((prev) => [{ ...values, markets: 0 }, ...prev]);
  };

  const handleDeleteConfirm = () => {
    if (!deleteRow) return;
    setRows((prev) => prev.filter((row) => row.id !== deleteRow.id));
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
            Manage upcoming events. Review schedules, markets and competition details before
            going live.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={openAddDialog}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" }, textTransform: "none", fontWeight: 600 }}
        >
          Add Event
        </Button>
      </Stack>

      <EventFilters
        sport={sport}
        onSportChange={setSport}
        searchField={searchField}
        onSearchFieldChange={setSearchField}
        search={search}
        onSearchChange={setSearch}
      />

      <AvailableEventsTable
        rows={visibleRows}
        sortDir={sortDir}
        onToggleSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        actions={{
          onView: setViewRow,
          onEdit: openEditDialog,
          onDelete: setDeleteRow,
        }}
      />

      <EventFormDialog
        open={formOpen}
        mode={formMode}
        initialValues={editingRow ? toFormValues(editingRow) : undefined}
        onClose={closeFormDialog}
        onSubmit={handleFormSubmit}
      />

      <EventViewDialog open={Boolean(viewRow)} event={viewRow} onClose={() => setViewRow(null)} />

      <EventDeleteDialog
        open={Boolean(deleteRow)}
        event={deleteRow}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
}
