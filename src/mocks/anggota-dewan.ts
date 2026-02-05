// app/mocks/anggota-dewan.ts
import { AKD, AnggotaDewan, AnggotaStats } from "@/types/anggota-dewan";

export const generateMockAnggota = (): AnggotaDewan[] => [
  {
    id: "anggota-001",
    userId: "user-anggota-001",
    jabatan: "KETUA DPR KABUPATEN KEEROM",
    // displayFormat: "KANISIUS KANGO, S.Sos ® KETUA DPR KABUPATEN KEEROM",
    akd: ["KOMISI_I", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/kangus.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-002",
    userId: "user-anggota-002",
    jabatan: "WAKIL KETUA I DPR KABUPATEN KEEROM",
    // displayFormat: "IMAM SUJONO ® WAKIL KETUA I DPR KABUPATEN KEEROM",
    akd: ["KOMISI_II", "BADAN_ANGGARAN", "BADAN_MUSYAWARAH", "KOMISI_I"],
    status: "active",
    avatar: "/avatars/imam.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-003",
    userId: "user-anggota-003",
    jabatan: "WAKIL KETUA II DPR KABUPATEN KEEROM",
    // displayFormat: "SIGIT WIDODO, A.Md.G ® WAKIL KETUA II DPR KABUPATEN KEEROM",
    akd: ["KOMISI_III", "PANITIA_KHUSUS", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/sigit.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-004",
    userId: "user-anggota-004",
    jabatan: "WAKIL KETUA III DPR KABUPATEN KEEROM",
    // displayFormat: "Drs. AGUS PRIYANTO ® ANGGOTA KOMISI I",
    akd: ["KOMISI_I", "BADAN_ANGGARAN"],
    status: "inactive",
    avatar: "/avatars/agus.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-006",
    userId: "user-anggota-006",
    jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
    akd: ["KOMISI_III", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-007",
    userId: "user-anggota-007",
    jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
    // displayFormat: "Hj. SITI NURHALIZA, S.E. ® ANGGOTA KOMISI II",
    akd: ["KOMISI_II", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-008",
    userId: "user-anggota-008",
    jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
    // displayFormat: "Hj. SITI NURHALIZA, S.E. ® ANGGOTA KOMISI II",
    akd: ["KOMISI_II", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-009",
    userId: "user-anggota-009",
    jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
    // displayFormat: "Hj. SITI NURHALIZA, S.E. ® ANGGOTA KOMISI II",
    akd: ["KOMISI_III", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-010",
    userId: "user-anggota-010",
    jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
    // displayFormat: "Hj. SITI NURHALIZA, S.E. ® ANGGOTA KOMISI II",
    akd: ["KOMISI_III", "BADAN_MUSYAWARAH", "BADAN_ANGGARAN"],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

export const mockAnggotaStats: AnggotaStats = {
  total: 5,
  active: 4,
  inactive: 1,
  byAKD: {
    KOMISI_I: 2,
    KOMISI_II: 2,
    KOMISI_III: 1,
    BADAN_MUSYAWARAH: 1,
    BADAN_ANGGARAN: 1,
    PANITIA_KHUSUS: 1,
  },
};

export const calculateStats = (anggota: AnggotaDewan[]): AnggotaStats => {
  const active = anggota.filter((a) => a.status === "active").length;

  const byAKD: Partial<Record<AKD, number>> = {};

  anggota.forEach((a) => {
    a.akd.forEach((akd) => {
      byAKD[akd] = (byAKD[akd] ?? 0) + 1;
    });
  });

  return {
    total: anggota.length,
    active,
    inactive: anggota.length - active,
    byAKD,
  };
};
