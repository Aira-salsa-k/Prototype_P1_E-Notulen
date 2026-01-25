// app/mocks/sekretaris-dewan.ts
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

export const generateMockSekretarisDewan = (): SekretarisDewanProfile[] => [

  {
    id: "sekwan-001",
    userId: "user-anggota-005", // Doris
    jabatan: "SEKRETARIS NON ANGGOTA DPRD KAB. KEEROM",
    periodeStart: new Date("2023-01-01"),
    periodeEnd: new Date("2027-12-31"),
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];
