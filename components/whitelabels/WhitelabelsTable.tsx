"use client";

import { Fragment, useState, type ReactNode } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { responsiveTableContainerSx } from "@/components/common/responsiveSx";
import WhitelabelActionsCell, {
  type WhitelabelRowActions,
} from "./WhitelabelActionsCell";
import WhitelabelKeyCell from "./WhitelabelKeyCell";
import type { Whitelabel } from "@/types/whitelabel";
import { formatWhitelabelDate } from "@/utils/whitelabel";

type Props = {
  rows: Whitelabel[];
  actions: WhitelabelRowActions;
};

const baseCellSx = {
  px: 2,
  py: 1.5,
  verticalAlign: "middle",
} as const;

const headerCellSx = {
  ...baseCellSx,
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  borderBottom: 2,
  borderColor: "divider",
  whiteSpace: "nowrap",
} as const;

const bodyCellSx = {
  ...baseCellSx,
  borderColor: "divider",
} as const;

const hiddenOnMobile = {
  display: { xs: "none", lg: "table-cell" },
} as const;

const mobileHeaderCellSx = {
  ...baseCellSx,
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  borderBottom: 2,
  borderColor: "divider",
} as const;

function MobileDetail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" component="div">
        {value}
      </Typography>
    </Stack>
  );
}

function WhitelabelMobileAccordionTable({
  rows,
  actions,
}: {
  rows: Whitelabel[];
  actions: WhitelabelRowActions;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: "16px", borderColor: "divider" }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={{ ...mobileHeaderCellSx, width: "38%" }}>Name</TableCell>
            <TableCell sx={{ ...mobileHeaderCellSx }}>Email</TableCell>
            <TableCell
              sx={{ ...mobileHeaderCellSx, width: 48, px: 1 }}
              aria-label="Expand row"
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isExpanded = expandedId === row.id;

            return (
              <Fragment key={row.id}>
                <TableRow
                  hover
                  onClick={() => toggleRow(row.id)}
                  sx={{
                    cursor: "pointer",
                    "& > td": { borderColor: "divider" },
                    ...(isExpanded && {
                      "& > td": { borderBottom: 0 },
                    }),
                  }}
                >
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "text.secondary",
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: 48, px: 1 }}>
                    <IconButton
                      size="small"
                      aria-label={isExpanded ? "Collapse row" : "Expand row"}
                      aria-expanded={isExpanded}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleRow(row.id);
                      }}
                      sx={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <KeyboardArrowDownIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      py: 0,
                      px: 2,
                      borderColor: "divider",
                      borderBottom: isExpanded ? undefined : 0,
                    }}
                  >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ py: 2 }}>
                        <Stack spacing={2}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center", justifyContent: "space-between" }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Status
                            </Typography>
                            <Chip
                              label={row.status === "active" ? "Active" : "Inactive"}
                              size="small"
                              color={row.status === "active" ? "success" : "default"}
                              variant="outlined"
                            />
                          </Stack>

                          <Stack spacing={1.5}>
                            <MobileDetail label="Company" value={row.company} />
                            <MobileDetail
                              label="Key"
                              value={<WhitelabelKeyCell apiKey={row.key} />}
                            />
                            <MobileDetail
                              label="Whitelisted IP"
                              value={row.whitelistedIp}
                            />
                            <MobileDetail label="Rate Limit" value={row.rateLimit} />
                            <MobileDetail
                              label="Created On"
                              value={formatWhitelabelDate(row.createdAt)}
                            />
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ justifyContent: "flex-end", pt: 0.5 }}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <WhitelabelActionsCell row={row} actions={actions} />
                          </Stack>
                        </Stack>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function WhitelabelsTable({ rows, actions }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (rows.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No whitelabels yet. Click &quot;Add Whitelabel&quot; to create one.
        </Typography>
      </Paper>
    );
  }

  if (isMobile) {
    return <WhitelabelMobileAccordionTable rows={rows} actions={actions} />;
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: "16px",
        borderColor: "divider",
        ...responsiveTableContainerSx,
      }}
    >
      <Table size="medium" sx={{ tableLayout: "fixed", width: "100%", minWidth: 960 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "action.hover" }}>
            <TableCell sx={{ ...headerCellSx, width: "12%" }}>Name</TableCell>
            <TableCell sx={{ ...headerCellSx, width: "13%" }}>Company</TableCell>
            <TableCell sx={{ ...headerCellSx, width: "18%" }}>Key</TableCell>
            <TableCell sx={{ ...headerCellSx, width: "12%" }}>
              Whitelisted IP
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: "9%" }}>Status</TableCell>
            <TableCell align="right" sx={{ ...headerCellSx, width: "8%" }}>
              Rate Limit
            </TableCell>
            <TableCell sx={{ ...headerCellSx, ...hiddenOnMobile, width: "16%" }}>
              Email
            </TableCell>
            <TableCell sx={{ ...headerCellSx, ...hiddenOnMobile, width: "10%" }}>
              Created On
            </TableCell>
            <TableCell align="right" sx={{ ...headerCellSx, width: 120 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ "&:last-child td": { borderBottom: 0 } }}
            >
              <TableCell
                sx={{
                  ...bodyCellSx,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{
                  ...bodyCellSx,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.company}
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <WhitelabelKeyCell apiKey={row.key} />
              </TableCell>
              <TableCell sx={{ ...bodyCellSx, whiteSpace: "nowrap" }}>
                {row.whitelistedIp}
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <Chip
                  label={row.status === "active" ? "Active" : "Inactive"}
                  size="small"
                  color={row.status === "active" ? "success" : "default"}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" sx={{ ...bodyCellSx, whiteSpace: "nowrap" }}>
                {row.rateLimit}
              </TableCell>
              <TableCell
                sx={{
                  ...bodyCellSx,
                  ...hiddenOnMobile,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.email}
              </TableCell>
              <TableCell sx={{ ...bodyCellSx, ...hiddenOnMobile, whiteSpace: "nowrap" }}>
                {formatWhitelabelDate(row.createdAt)}
              </TableCell>
              <TableCell align="right" sx={bodyCellSx}>
                <WhitelabelActionsCell row={row} actions={actions} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
