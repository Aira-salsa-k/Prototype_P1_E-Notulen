// app/mocks/tenaga-ahli.ts
import { TenagaAhli } from "@/types/tenaga-ahli";

export const mockTenagaAhli: TenagaAhli[] = [
  {
    id: "tenaga-ahli-001",
    name: "Prof. Dr. IR. SUTARNO, M.T.",
    jabatan: "ANGGOTA TIM AHLI",
    bidang: "TEKNIK SIPIL DAN PERENCANAAN WILAYAH",
    displayFormat: "Prof. Dr. IR. SUTARNO, M.T. ® ANGGOTA TIM AHLI",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tenaga-ahli-002",
    name: "Dr. SRI MULYANI, S.E., M.Ak.",
    jabatan: "KONSULTAN KEUANGAN DAERAH",
    bidang: "MANAJEMEN KEUANGAN DAN ANGGARAN",
    displayFormat: "Dr. SRI MULYANI, S.E., M.Ak. ® KONSULTAN KEUANGAN DAERAH",
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "tenaga-ahli-003",
    name: "H. MUHAMMAD YASIN, S.H., M.H.",
    jabatan: "KONSULTAN HUKUM",
    bidang: "HUKUM TATA NEGARA DAN PERATURAN DAERAH",
    displayFormat: "H. MUHAMMAD YASIN, S.H., M.H. ® KONSULTAN HUKUM",
    status: "inactive",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];
