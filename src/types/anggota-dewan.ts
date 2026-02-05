export type AKD =
  | "KOMISI_I"
  | "KOMISI_II"
  | "KOMISI_III"
  | "BADAN_MUSYAWARAH"
  | "BADAN_ANGGARAN"
  | "BADAN_KEHORMATAN"
  | "BADAN_PEMBENTUKAN_PERATURAN_DAERAH"
  | "PANITIA_KHUSUS";

export interface AnggotaStats {
  total: number;
  active: number;
  inactive: number;
  byAKD: Partial<Record<AKD, number>>;
}

export interface AnggotaFilter {
  search: string;
}

/////////////////////////////////deep
// app/types/anggota-dewan.ts
export interface AnggotaDewan {
  id: string;
  userId: string; // Reference to User
  jabatan: string;
  // displayFormat?: string; // Format: "NAMA ® JABATAN"
  akd: AKD[];
  status: "active" | "inactive";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// app/types/tenaga-ahli.ts
