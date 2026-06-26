"use client";

import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import type { Sport } from "@/types/dashboard";
import { SPORTS, type EventSearchField } from "./constants";

type Props = {
  sport: Sport | "All";
  onSportChange: (value: Sport | "All") => void;
  searchField: EventSearchField;
  onSearchFieldChange: (value: EventSearchField) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

const fieldSx = { minWidth: { xs: "100%", sm: 160 } } as const;

export default function EventFilters({
  sport,
  onSportChange,
  searchField,
  onSearchFieldChange,
  search,
  onSearchChange,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ alignItems: { md: "center" }, flexWrap: "wrap" }}
    >
      <TextField
        select
        size="small"
        label="Sport"
        value={sport}
        onChange={(e) => onSportChange(e.target.value as Sport | "All")}
        sx={fieldSx}
      >
        <MenuItem value="All">All Sports</MenuItem>
        {SPORTS.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Search By"
        value={searchField}
        onChange={(e) => onSearchFieldChange(e.target.value as EventSearchField)}
        sx={fieldSx}
      >
        <MenuItem value="id">Event ID</MenuItem>
        <MenuItem value="name">Event Name</MenuItem>
      </TextField>

      <TextField
        size="small"
        placeholder={searchField === "id" ? "Search by Event ID" : "Search by Event Name"}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: 1, minWidth: { xs: "100%", sm: 220 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
