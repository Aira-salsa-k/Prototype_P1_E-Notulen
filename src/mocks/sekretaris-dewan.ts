// app/mocks/sekretaris-dewan.ts
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

export const generateMockSekretarisDewan = (): SekretarisDewanProfile[] => [
  {
    id: "sekwan-001",
    userId: "user-sekwan-001", // Linked to Doris (or Sekretaris Dewan in general mock)
    jabatan: "SEKRETARIS NON ANGGOTA DPRD KAB. KEEROM",
    nip: "198001012010012001",
    periodeStart: new Date("2025-01-01"),
    periodeEnd: new Date("2025-12-31"),
    isActive: false,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "sekwan-002",
    userId: "user-sekwan-002", // Linked to Moh. Nur Gani S.E.
    jabatan: "SEKRETARIS NON ANGGOTA DPRD KAB. KEEROM",
    nip: "198505052012011002",
    periodeStart: new Date("2026-01-01"),
    periodeEnd: new Date("2027-12-31"),
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];
