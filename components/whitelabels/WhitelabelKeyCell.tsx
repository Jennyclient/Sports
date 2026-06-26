"use client";

import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { maskApiKey } from "@/utils/whitelabel";

type Props = {
  apiKey: string;
};

export default function WhitelabelKeyCell({ apiKey }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ alignItems: "center", width: "100%", minWidth: 0 }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: "monospace",
          fontSize: 13,
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {visible ? apiKey : maskApiKey(apiKey)}
      </Typography>

      <Tooltip title={visible ? "Hide" : "Show"} arrow>
        <IconButton
          size="small"
          aria-label={visible ? "Hide API key" : "Show API key"}
          onClick={() => setVisible((prev) => !prev)}
          sx={{ flexShrink: 0 }}
        >
          {visible ? (
            <VisibilityOffOutlinedIcon fontSize="small" />
          ) : (
            <VisibilityOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
        <IconButton
          size="small"
          aria-label="Copy API key"
          onClick={handleCopy}
          sx={{ flexShrink: 0 }}
        >
          <ContentCopyOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
