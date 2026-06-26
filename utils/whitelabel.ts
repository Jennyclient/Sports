export const maskApiKey = (key: string): string => {
  const lastUnderscore = key.lastIndexOf("_");
  if (lastUnderscore === -1) return "****";
  return `${key.slice(0, lastUnderscore + 1)}****`;
};

export const formatWhitelabelDate = (iso: string): string => {
  const date = new Date(iso);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const generateApiKey = (name: string): string => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 12);
  return `wl_${slug || "partner"}_${Math.random().toString(36).slice(2, 6)}`;
};
