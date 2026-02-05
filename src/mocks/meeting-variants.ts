import { MeetingTypeVariant } from "@/types/meeting";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockUsers } from "@/mocks/user";

const allMembers = generateMockAnggota();
const now = new Date();

export const mockMeetingTypeVariants: MeetingTypeVariant[] = [
  // --- KOMISI I (m1) ---
  {
    id: "var-1",
    categoryId: "m1",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("KOMISI_I"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const meetingRole =
          i === 0
            ? "Ketua"
            : i === 1
              ? "Wakil I"
              : i === 2
                ? "Wakil II"
                : i === 3
                  ? "Wakil III"
                  : "Anggota";
        return {
          memberId: m.id,
          name: name,
          jabatan: m.jabatan,
          meetingRole,
          displayFormat: `${name} ® ${m.jabatan}`.toUpperCase(),
        };
      }),
  },

  // --- KOMISI II (m2) ---
  {
    id: "var-2",
    categoryId: "m2",
    subName: "Evaluasi Tahunan",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("KOMISI_II"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const meetingRole =
          i === 0
            ? "Ketua"
            : i === 1
              ? "Wakil I"
              : i === 2
                ? "Wakil II"
                : i === 3
                  ? "Wakil III"
                  : "Anggota";
        return {
          memberId: m.id,
          name: name,
          jabatan: m.jabatan,
          meetingRole,
          displayFormat: `${name} ® ${m.jabatan}`.toUpperCase(),
        };
      }),
  },

  // --- PLENO (m4) ---
  {
    id: "var-3",
    categoryId: "m4",
    subName: "Pembangunan Infrastruktur",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers.slice(0, 10).map((m, i) => {
      const user = mockUsers.find((u) => u.id === m.userId);
      const name = user?.name || "Unknown";
      const meetingRole =
        i === 0
          ? "Ketua"
          : i === 1
            ? "Wakil I"
            : i === 2
              ? "Wakil II"
              : i === 3
                ? "Wakil III"
                : "Anggota";
      return {
        memberId: m.id,
        name: name,
        jabatan: m.jabatan,
        meetingRole,
        displayFormat: `${name} ® ${m.jabatan}`.toUpperCase(),
      };
    }),
  },
  {
    id: "var-4",
    categoryId: "m4",
    subName: "Pembahasan LKPJ",
    isActive: false, // Inactive example
    createdAt: now,
    updatedAt: now,
    members: allMembers.slice(5, 15).map((m, i) => {
      const user = mockUsers.find((u) => u.id === m.userId);
      const name = user?.name || "Unknown";
      const meetingRole =
        i === 0
          ? "Ketua"
          : i === 1
            ? "Wakil I"
            : i === 2
              ? "Wakil II"
              : "Anggota";
      return {
        memberId: m.id,
        name: name,
        jabatan: m.jabatan,
        meetingRole,
        displayFormat: `${name} ® ${m.jabatan}`.toUpperCase(),
      };
    }),
  },

  // --- BANGGAR (m5) ---
  {
    id: "var-5",
    categoryId: "m5",
    subName: "RKA Perubahan",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_ANGGARAN"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const meetingRole = i === 0 ? "Ketua" : i === 1 ? "Wakil I" : "Anggota";
        return {
          memberId: m.id,
          name: name,
          jabatan: m.jabatan,
          meetingRole,
          displayFormat: `${name} ® ${m.jabatan}`.toUpperCase(),
        };
      }),
  },
];
