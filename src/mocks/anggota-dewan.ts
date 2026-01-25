// app/lib/mock-anggotadewan.ts
// import { AKD, AnggotaDewan, AnggotaStats } from "@/types/anggota-dewan";

// export const generateMockAnggota = (): AnggotaDewan[] => [
//   {
//     id: "1",
//     name: "KANISIUS KANGO, S.Sos",
//     jabatan: "KETUA DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_III"],
//     username: "kanisius",
//     password: "kani2039",
//     status: "active",
//     createdAt: new Date("2024-01-15"),
//     updatedAt: new Date("2024-01-20"),
//   },
//   {
//     id: "2",
//     name: "SIGIT WIDODO, A.MD.G",
//     jabatan: "WAKIL KETUA II DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_II"],
//     username: "sigit",
//     password: "sigit94",
//     status: "inactive",
//     createdAt: new Date("2024-01-16"),
//     updatedAt: new Date("2024-01-21"),
//   },
//   {
//     id: "3",
//     name: "IMAM SUJONO",
//     jabatan: "WAKIL KETUA I DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_I", "BADAN_PEMBENTUKAN_PERATURAN_DAERAH"],
//     username: "iamam",
//     password: "kiam039",
//     status: "inactive",
//     createdAt: new Date("2024-01-17"),
//     updatedAt: new Date("2024-01-22"),
//   },
//   {
//     id: "4",
//     name: "JACOBUS MEKAWA",
//     jabatan: "WAKIL KETUA III DPR KABUPATEN KEEROM",
//     akd: ["BADAN_MUSYAWARAH", "KOMISI_I"],
//     username: "jacob",
//     password: "jacob2039",
//     status: "active",
//     createdAt: new Date("2024-01-18"),
//     updatedAt: new Date("2024-01-23"),
//   },
//   {
//     id: "5",
//     name: "DORIS ANASTASIA YAPEN, S.Pt",
//     jabatan: "SEKRETARIS NON ANGGOTA",
//     akd: ["KOMISI_I", "BADAN_MUSYAWARAH", "KOMISI_III", "KOMISI_II"],
//     username: "doris",
//     password: "doris2039",
//     status: "active",
//     createdAt: new Date("2024-01-19"),
//     updatedAt: new Date("2024-01-24"),
//   },
//   {
//     id: "6",
//     name: "DIBELON  WONDA",
//     jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_I"],
//     username: "dibelon",
//     password: "kd2039",
//     status: "active",
//     createdAt: new Date("2024-01-20"),
//     updatedAt: new Date("2024-01-25"),
//   },
//   {
//     id: "7",
//     name: "JDOMINIKA TAFOR ",
//     jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_I"],
//     username: "rafor",
//     password: "kani2039",
//     status: "active",
//     createdAt: new Date("2024-01-21"),
//     updatedAt: new Date("2024-01-26"),
//   },
//   {
//     id: "8",
//     name: "KIWAN SISWANTO, SH., M.Si ",
//     jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
//     akd: ["BADAN_KEHORMATAN"],
//     username: "kiwan",
//     password: "kani2039",
//     status: "inactive",
//     createdAt: new Date("2024-01-22"),
//     updatedAt: new Date("2024-01-27"),
//   },
//   {
//     id: "9",
//     name: "LEONARDUS ABAR, SH",
//     jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
//     akd: ["BADAN_ANGGARAN"],
//     username: "abar",
//     password: "kani2039",
//     status: "inactive",
//     createdAt: new Date("2024-01-22"),
//     updatedAt: new Date("2024-01-27"),
//   },
//   {
//     id: "10",
//     name: " HJ. BAHARA BARAKA, SH",
//     jabatan: "ANGGOTA DPR KABUPATEN KEEROM",
//     akd: ["KOMISI_III"],
//     username: "bahara",
//     password: "kani2039",
//     status: "inactive",
//     createdAt: new Date("2024-01-22"),
//     updatedAt: new Date("2024-01-27"),
//   },
// ];

// app/mocks/anggota-dewan.ts
import { AKD, AnggotaDewan, AnggotaStats } from "@/types/anggota-dewan";

export const generateMockAnggota = (): AnggotaDewan[] => [
  {
    id: "anggota-001",
    userId: "user-anggota-001",
    name: "KANISIUS KANGO, S.Sos",
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
    name: "IMAM SUJONO",
    jabatan: "WAKIL KETUA I DPR KABUPATEN KEEROM",
    // displayFormat: "IMAM SUJONO ® WAKIL KETUA I DPR KABUPATEN KEEROM",
    akd: ["KOMISI_II", "BADAN_ANGGARAN", "BADAN_MUSYAWARAH"],
    status: "active",
    avatar: "/avatars/imam.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-003",
    userId: "user-anggota-003",
    name: "SIGIT WIDODO, A.Md.G",
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
    name: "JACOBUS MEKAWA",
    jabatan: "WAKIL KETUA III DPR KABUPATEN KEEROM",
    // displayFormat: "Drs. AGUS PRIYANTO ® ANGGOTA KOMISI I",
    akd: ["KOMISI_I", "BADAN_ANGGARAN"],
    status: "inactive",
    avatar: "/avatars/agus.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-005",
    userId: "user-anggota-005",
    name: "DORIS ANASTASIA YAPEN, S.Pt",
    jabatan: "SEKRETARIS NON ANGGOTA",

    akd: [
      "KOMISI_II",
      "BADAN_MUSYAWARAH",
      "BADAN_ANGGARAN",
      "BADAN_PEMBENTUKAN_PERATURAN_DAERAH",
    ],
    status: "active",
    avatar: "/avatars/siti.png",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "anggota-006",
    userId: "user-anggota-006",
    name: "DIBELON WONDA",
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