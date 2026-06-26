"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { responsiveTableContainerSx } from "@/components/common/responsiveSx";
import DashboardSection from "./DashboardSection";
import { formatDateTime, sportEmoji } from "./utils";
import type { LiveEvent } from "@/types/dashboard";

type Props = {
  events: LiveEvent[];
};

const statusColor = (status: LiveEvent["status"]) => {
  switch (status) {
    case "Live":
      return "success";
    case "Upcoming":
      return "info";
    case "Suspended":
      return "warning";
    default:
      return "default";
  }
};

const hiddenOnXs = { display: { xs: "none", sm: "table-cell" } } as const;

export default function LiveEventsWidget({ events }: Props) {
  return (
    <DashboardSection
      title={`Live Events (${events.length})`}
      subtitle="Currently running matches and markets"
    >
      <TableContainer sx={responsiveTableContainerSx}>
        <Table size="small" sx={{ minWidth: 520 }}>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell sx={hiddenOnXs}>Sport</TableCell>
              <TableCell sx={hiddenOnXs}>Start Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Active Markets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} hover>
                <TableCell sx={{ fontWeight: 500, maxWidth: { xs: 160, sm: "none" } }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Typography component="span" sx={{ fontSize: 16 }}>
                      {sportEmoji(event.sport)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {event.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={hiddenOnXs}>{event.sport}</TableCell>
                <TableCell sx={{ ...hiddenOnXs, whiteSpace: "nowrap" }}>
                  {formatDateTime(event.startTime)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={event.status}
                    size="small"
                    color={statusColor(event.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">{event.activeMarkets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardSection>
  );
}
