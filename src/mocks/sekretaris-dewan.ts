// app/mocks/sekretaris-dewan.ts
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

/**
 * Mock Sekretaris Dewan
 * Gani (Sekwan 2) adalah yang aktif saat ini.
 * Doris (Sekwan 1) tetap disimpan untuk preview data historis.
 */
export const generateMockSekretarisDewan = (): SekretarisDewanProfile[] => [
  {
    id: "sekwan-001",
    userId: "user-sekwan-001", // Doris Anastasia Yappen, S.Pt
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
    userId: "user-sekwan-002", // Moh. Nur Abd Gani, SE
    jabatan: "SEKRETARIS NON ANGGOTA DPRD KAB. KEEROM",
    nip: "198505052012011002",
    periodeStart: new Date("2026-01-01"),
    periodeEnd: new Date("2027-12-31"),
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2026-02-07"),
  },
];
