// app/types/anggota-dewan.ts
// export interface AnggotaDewan {
//   id: string;
//   name: string;
//   jabatan: string;
//   akd: AKD[];
//   username: string;
//   password: string;
//   status: "active" | "inactive";
//   avatar?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

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
  status: "all" | "active" | "inactive";
  akd: AKD[];
  search: string;
  sortBy: "name" | "jabatan" | "akd" | "status";
  sortOrder: "asc" | "desc";
}



/////////////////////////////////deep
// app/types/anggota-dewan.ts
export interface AnggotaDewan {
  id: string;
  userId: string; // Reference to User
  name: string;
  jabatan: string;
  // displayFormat?: string; // Format: "NAMA ® JABATAN"
  akd: AKD[];
  status: "active" | "inactive";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}


// app/types/tenaga-ahli.ts
