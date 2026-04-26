// app/mocks/mitra-kerja.ts
import { MitraKerja, MitraInstitution, AKD } from "@/types";

export const mockMitraInstitutions: MitraInstitution[] = [];

export const mockMitraKerja: MitraKerja[] = [];

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
