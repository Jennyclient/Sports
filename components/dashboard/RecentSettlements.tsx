"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
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
import { formatDateTime } from "./utils";
import type { Settlement } from "@/types/dashboard";

type Props = {
  settlements: Settlement[];
};

const hiddenOnXs = { display: { xs: "none", sm: "table-cell" } } as const;

export default function RecentSettlements({ settlements }: Props) {
  return (
    <DashboardSection
      title="Recent Settlements"
      subtitle="Latest settled markets"
    >
      <TableContainer sx={responsiveTableContainerSx}>
        <Table size="small" sx={{ minWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Market</TableCell>
              <TableCell sx={hiddenOnXs}>Settlement Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlements.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CheckCircleOutlinedIcon
                      fontSize="small"
                      color="success"
                      sx={{ opacity: 0.8, flexShrink: 0 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.event}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.market}</TableCell>
                <TableCell sx={{ ...hiddenOnXs, whiteSpace: "nowrap" }}>
                  {formatDateTime(row.settlementTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardSection>
  );
}
