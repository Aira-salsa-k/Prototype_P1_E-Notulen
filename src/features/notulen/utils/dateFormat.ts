export const formatTanggalID = (dateStr: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
