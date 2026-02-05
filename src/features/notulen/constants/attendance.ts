import { AttendanceStatus } from "@/types/attendance";

export const STATUS_OPTIONS: { key: AttendanceStatus; label: string; color: "success" | "warning" | "danger" | "primary" | "default" }[] = [
    { key: "HADIR", label: "Hadir", color: "success" },
    { key: "IZIN", label: "Izin", color: "warning" },
    { key: "SAKIT", label: "Sakit", color: "danger" },
    { key: "DINAS_LUAR", label: "Dinas Luar", color: "primary" },
    { key: "TANPA_KETERANGAN", label: "Tanpa Keterangan", color: "default" },
];

export const AKD_LIST = [
    { id: "ALL", name: "SEMUA AKD" },
    { id: "KOMISI_I", name: "KOMISI I" },
    { id: "KOMISI_II", name: "KOMISI II" },
    { id: "KOMISI_III", name: "KOMISI III" },
    { id: "BADAN_ANGGARAN", name: "BANGGAR" },
    { id: "BADAN_MUSYAWARAH", name: "BAMUS" },
    { id: "BADAN_PEMBENTUKAN_PERATURAN_DAERAH", name: "BAPEMPERDA" },
    { id: "BADAN_KEHORMATAN", name: "BK" },
];
