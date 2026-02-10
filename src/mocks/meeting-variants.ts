import { MeetingTypeVariant } from "@/types/meeting";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockUsers } from "@/mocks/user";

const allMembers = generateMockAnggota();
const now = new Date();

/**
 * Helper untuk menentukan jabatan rapat berdasarkan index
 * jabatan adalah jabatan dalam rapat (Ketua, Wakil Ketua I, Sekretaris, Anggota)
 * BUKAN jabatan struktural (KETUA DPRD, ANGGOTA DPRD)
 */
const getJabatanRapat = (index: number): string => {
  if (index === 0) return "Ketua";
  if (index === 1) return "Wakil Ketua I";
  if (index === 2) return "Sekretaris";
  return "Anggota";
};

/**
 * Meeting Type Variants - Template peserta rapat berdasarkan jenis rapat
 *
 * PENTING: ID di sini disesuaikan dengan ID subMeetingCategoryID yang digunakan di meeting.ts
 * Agar sinkronisasi data absensi berjalan otomatis dengan jabatan rapat yang benar.
 */
export const mockMeetingTypeVariants: MeetingTypeVariant[] = [
  // ============================================================
  // KOMISI I
  // ============================================================
  {
    id: "m1", // AKD - Menggunakan ID Kategori sebagai ID Varian
    categoryId: "m1",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("KOMISI_I"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} KOMISI I`,
        };
      }),
  },

  // ============================================================
  // KOMISI II
  // ============================================================
  {
    id: "m2", // AKD
    categoryId: "m2",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("KOMISI_II"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} KOMISI II`,
        };
      }),
  },

  // ============================================================
  // KOMISI III
  // ============================================================
  {
    id: "m3", // AKD
    categoryId: "m3",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("KOMISI_III"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} KOMISI III`,
        };
      }),
  },

  // ============================================================
  // PARIPURNA
  // ============================================================
  {
    id: "sub-paripurna-lkpj", // Dipakai oleh Meeting 001
    categoryId: "m4",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers.map((m, i) => {
      const user = mockUsers.find((u) => u.id === m.userId);
      const name = user?.name || "Unknown";
      let jabatanRapat = "Anggota";
      if (m.jabatan.includes("KETUA DPR")) jabatanRapat = "Ketua";
      else if (m.jabatan.includes("WAKIL KETUA I"))
        jabatanRapat = "Wakil Ketua I";
      else if (m.jabatan.includes("WAKIL KETUA II"))
        jabatanRapat = "Wakil Ketua II";
      return {
        memberId: m.id,
        name: name,
        jabatan: jabatanRapat,
        meetingRole: jabatanRapat,
        displayFormat: `${name} ® ${jabatanRapat.toUpperCase()}`,
      };
    }),
  },

  // ============================================================
  // BANGGAR
  // ============================================================
  {
    id: "m5", // AKD
    categoryId: "m5",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_ANGGARAN"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} BADAN ANGGARAN`,
        };
      }),
  },

  // ============================================================
  // BAMUS
  // ============================================================
  {
    id: "m6", // AKD
    categoryId: "m6",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_MUSYAWARAH"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} BADAN MUSYAWARAH`,
        };
      }),
  },

  // ============================================================
  // BAPEMPERDA
  // ============================================================
  {
    id: "m8", // AKD
    categoryId: "m8",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_PEMBENTUKAN_PERATURAN_DAERAH"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} BAPEMPERDA`,
        };
      }),
  },

  // ============================================================
  // BADAN KEHORMATAN
  // ============================================================
  {
    id: "m9", // AKD
    categoryId: "m9",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_KEHORMATAN"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} BADAN KEHORMATAN`,
        };
      }),
  },

  // ============================================================
  // PANSUS
  // ============================================================
  {
    id: "sub-pansus-kerja", // Dipakai oleh Meeting 008
    categoryId: "m7",
    subName: "LHP",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_KEHORMATAN"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} PANSUS`,
        };
      }),
  },
  {
    id: "sub-pansus-kerja-2",
    subName: "LKPJ",
    categoryId: "m7",
    isActive: true,
    createdAt: now,
    updatedAt: now,
    members: allMembers
      .filter((m) => m.akd.includes("BADAN_KEHORMATAN"))
      .map((m, i) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Unknown";
        const jabatanRapat = getJabatanRapat(i);
        return {
          memberId: m.id,
          name: name,
          jabatan: jabatanRapat,
          meetingRole: jabatanRapat,
          displayFormat: `${name} ® ${jabatanRapat.toUpperCase()} PANSUS`,
        };
      }),
  },
];
