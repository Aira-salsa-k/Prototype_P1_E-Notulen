// app/mocks/mitra-kerja.ts
import { MitraKerja, MitraInstitution ,AKD} from "@/types";

export const mockMitraInstitutions: MitraInstitution[] = [
  {
    id: "institution-001",
    name: "DINAS PENDIDIKAN",
    akdID: "KOMISI_I",
    color: "info",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "institution-002",
    name: "DINAS KESEHATAN",
    akdID: "KOMISI_II",
    color: "info",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "institution-003",
    name: "DINAS PUPR",
    akdID: "KOMISI_III",
    color: "warning",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "institution-004",
    name: "BADAN KEUANGAN DAERAH",
    akdID: "BADAN_ANGGARAN",
    color: "success",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const mockMitraKerja: MitraKerja[] = [
  {
    id: "mitra-001",
    institutionId: "institution-001",
    name: "Drs. BAMBANG SUTRISNO, M.Pd.",
    position: "KEPALA DINAS",
    displayFormat: "Drs. BAMBANG SUTRISNO, M.Pd. ® KEPALA DINAS PENDIDIKAN",
    akdAssociations: ["KOMISI_I"],
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "mitra-002",
    institutionId: "institution-001",
    name: "SRI WAHYUNI, S.Pd., M.Pd.",
    position: "SEKRETARIS DINAS",
    displayFormat: "SRI WAHYUNI, S.Pd., M.Pd. ® SEKRETARIS DINAS PENDIDIKAN",
    akdAssociations: ["KOMISI_I"],
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "mitra-003",
    institutionId: "institution-002",
    name: "Dr. H. AHMAD FUADI, Sp.PD.",
    position: "KEPALA DINAS",
    displayFormat: "Dr. H. AHMAD FUADI, Sp.PD. ® KEPALA DINAS KESEHATAN",
    akdAssociations: ["KOMISI_II"],
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export function calculateMitraStats(institutions: MitraInstitution[]) {
  const active = institutions.filter((i) => i.status === "active").length;
  const institutionsByAKD: Record<AKD, number> = {} as Record<AKD, number>;

  institutions.forEach((institution) => {
    institutionsByAKD[institution.akdID] =
      (institutionsByAKD[institution.akdID] || 0) + 1;
  });

  return {
    totalInstitutions: institutions.length,
    activeInstitutions: active,
    inactiveInstitutions: institutions.length - active,
    institutionsByAKD,
  };
}