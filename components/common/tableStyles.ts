export const tableHeaderCellSx = {
  px: 2,
  py: 1.5,
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.secondary",
  borderBottom: 2,
  borderColor: "divider",
  whiteSpace: "nowrap",
} as const;

export const tableBodyCellSx = {
  px: 2,
  py: 1.5,
  verticalAlign: "middle",
  borderColor: "divider",
} as const;

export const hiddenOnXs = { display: { xs: "none", sm: "table-cell" } } as const;
export const hiddenOnSm = { display: { xs: "none", md: "table-cell" } } as const;

export const tablePaperSx = {
  borderRadius: "16px",
  borderColor: "divider",
} as const;
