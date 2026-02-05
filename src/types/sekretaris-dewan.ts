// app/types/sekwan.ts

export interface SekretarisDewanProfile {
  id: string; // Business/Profile ID (e.g. sekwan-001)
  userId: string; // Reference to auth user (e.g. user-sekwan-001)

  jabatan: string;
  nip: string;
  periodeStart: Date;
  periodeEnd: Date;
  // signatureTemplate?: string; // Template tanda tangan
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SekretarisDewanStats {
  total: number;
  active: number;
  inactive: number;
}
