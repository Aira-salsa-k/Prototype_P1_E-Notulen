// app/types/sekwan.ts


export interface SekretarisDewanProfile {
  id: string;
  userId: string; // Reference to AnggotaDewan's userId

  jabatan: string; 
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