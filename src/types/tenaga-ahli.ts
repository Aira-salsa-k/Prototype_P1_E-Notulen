export interface TenagaAhli {
  id: string;
  name: string;
  jabatan: string;
  bidang?: string;
  displayFormat: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
