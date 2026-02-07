export const formatTanggalID = (dateStr: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Formats date to: "7 Februari 2026" (No weekday)
 */
export const formatTanggalTanpaHari = (dateStr: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
