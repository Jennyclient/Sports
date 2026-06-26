"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { responsiveDialogActionsSx } from "@/components/common/responsiveSx";
import type { CatalogMarket } from "./marketCatalog";

type Props = {
  open: boolean;
  eventName: string;
  markets: CatalogMarket[];
  onClose: () => void;
  onAdd: (selected: CatalogMarket[]) => void;
};

export default function AssignMarketsDialog({
  open,
  eventName,
  markets,
  onClose,
  onAdd,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const allSelected = markets.length > 0 && selected.length === markets.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : markets.map((m) => m.name));
  };

  const handleAdd = () => {
    const chosen = markets.filter((m) => selected.includes(m.name));
    onAdd(chosen);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>
        Add Markets
        <Typography variant="body2" color="text.secondary">
          Select markets not yet assigned to {eventName}.
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {markets.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{ p: 3, borderRadius: 3, borderColor: "divider", textAlign: "center" }}
          >
            <Typography variant="body2" color="text.secondary">
              All available markets are already assigned to this event.
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={1}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between", px: 0.5 }}
            >
              <FormControlLabel
                control={<Checkbox size="small" checked={allSelected} onChange={toggleAll} />}
                label={<Typography variant="body2">Select all</Typography>}
              />
              <Typography variant="caption" color="text.secondary">
                {selected.length} selected
              </Typography>
            </Stack>

            <Divider />

            <Stack>
              {markets.map((market) => {
                const checked = selected.includes(market.name);
                return (
                  <ListItemButton
                    key={market.name}
                    onClick={() => toggle(market.name)}
                    sx={{ borderRadius: 2, px: 1 }}
                  >
                    <Checkbox size="small" checked={checked} tabIndex={-1} disableRipple />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {market.name}
                      </Typography>
                    </Box>
                    <Chip label={market.marketType} size="small" variant="outlined" />
                  </ListItemButton>
                );
              })}
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={responsiveDialogActionsSx}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={selected.length === 0}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Add{selected.length > 0 ? ` (${selected.length})` : ""}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
