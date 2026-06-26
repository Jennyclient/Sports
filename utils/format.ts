export const formatNumber = (value: number): string =>
  value.toLocaleString("en-IN");

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDateTime = (iso: string): string =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export const sportEmoji = (sport: string): string => {
  switch (sport) {
    case "Cricket":
      return "🏏";
    case "Football":
      return "⚽";
    case "Tennis":
      return "🎾";
    case "Basketball":
      return "🏀";
    case "Hockey":
      return "🏑";
    case "Kabaddi":
      return "🤼";
    default:
      return "🏆";
  }
};
