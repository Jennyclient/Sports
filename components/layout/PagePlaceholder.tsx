import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  description?: string;
};

export default function PagePlaceholder({ title, description }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        borderColor: "divider",
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description ?? "This page is a placeholder. Content coming soon."}
        </Typography>
      </Stack>
    </Paper>
  );
}
