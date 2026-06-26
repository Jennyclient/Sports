export const responsiveDialogActionsSx = {
  px: 3,
  py: 2,
  flexDirection: { xs: "column-reverse", sm: "row" },
  gap: 1,
  "& > button": {
    width: { xs: "100%", sm: "auto" },
    m: 0,
  },
} as const;

export const responsiveTableContainerSx = {
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
} as const;
