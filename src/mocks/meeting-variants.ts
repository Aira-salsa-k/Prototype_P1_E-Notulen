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
    id: "sub-raker-komisi", // Dipakai oleh Meeting 002
    categoryId: "m1",
    subName: "Rapat Kerja Komisi I",
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
  {
    id: "var-komisi-i", // Alias
    categoryId: "m1",
    subName: "Rapat Kerja Komisi I",
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
    id: "sub-rdpu-komisi", // Dipakai oleh Meeting 003
    categoryId: "m2",
    subName: "Rapat Kerja Komisi II",
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
  {
    id: "var-komisi-ii",
    categoryId: "m2",
    subName: "Rapat Kerja Komisi II",
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
    id: "var-komisi-iii",
    categoryId: "m3",
    subName: "Rapat Kerja Komisi III",
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
    subName: "Rapat Paripurna",
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
  {
    id: "var-paripurna",
    categoryId: "m4",
    subName: "Rapat Paripurna",
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
    id: "sub-banggar-kua-ppas", // Dipakai oleh Meeting 005
    categoryId: "m5",
    subName: "Rapat Badan Anggaran",
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
    id: "sub-bamus-agenda", // Dipakai oleh Meeting 006
    categoryId: "m6",
    subName: "Rapat Badan Musyawarah",
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
    id: "sub-bapemperda-ranperda", // Dipakai oleh Meeting 007
    categoryId: "m8",
    subName: "Rapat Bapemperda",
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
    id: "sub-bk-etik", // Dipakai oleh Meeting 008
    categoryId: "m9",
    subName: "Rapat Badan Kehormatan",
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
];
