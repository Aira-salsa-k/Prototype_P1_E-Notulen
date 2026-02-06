import { mockUsers } from "@/mocks/user";
import { generateMockAnggota } from "@/mocks/anggota-dewan";

export const formatDateSimple = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "live":
      return "success";
    case "completed":
      return "default";
    case "scheduled":
      return "primary";
    default:
      return "default";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "live":
      return "Sedang Berlangsung";
    case "completed":
      return "Selesai";
    case "scheduled":
      return "Terjadwal";
    default:
      return status;
  }
};

export const formatDateIndo = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

export const getMemberName = (id: string) => {
  // Try finding in mockUsers (userId)
  const user = mockUsers.find((u) => u.id === id);
  if (user) return user.name;

  // Try finding in mockAnggota (anggotaId)
  const anggota = generateMockAnggota().find((a) => a.id === id);
  if (anggota) {
    const u = mockUsers.find((user) => user.id === anggota.userId);
    if (u) return u.name;
  }

  return id || "Belum ditentukan";
};
