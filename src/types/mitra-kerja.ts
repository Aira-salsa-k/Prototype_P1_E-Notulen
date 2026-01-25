// app/types/partner.ts
import { SemanticTone, AKD } from "./index";

// app/types/mitra-kerja.ts
export interface MitraKerja {
  id: string;
  institutionId: string;
  name: string;
  position?: string;
  displayFormat: string;
  akdAssociations: string[]; // Array of AKD IDs
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface MitraInstitution {
  id: string;
  name: string; // Dinas Pendidikan
  akdID: AKD; // Komisi I, Komisi II
  color?: SemanticTone;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface MitraKerjaStats {
  totalInstitutions: number;
  activeInstitutions: number;
  inactiveInstitutions: number;
  institutionsByAKD: Record<AKD, number>;
}