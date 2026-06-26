"use client";

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
import type { UpcomingEvent } from "@/types/dashboard";

type Props = {
  events: UpcomingEvent[];
};

const hiddenOnXs = { display: { xs: "none", sm: "table-cell" } } as const;

export default function UpcomingEventsWidget({ events }: Props) {
  return (
    <DashboardSection
      title={`Upcoming Events (${events.length})`}
      subtitle="Scheduled in the next 24 hours"
    >
      <TableContainer sx={responsiveTableContainerSx}>
        <Table size="small" sx={{ minWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell sx={hiddenOnXs}>Sport</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell align="right">Markets</TableCell>
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
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {formatDateTime(event.startTime)}
                </TableCell>
                <TableCell align="right">{event.markets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardSection>
  );
}
