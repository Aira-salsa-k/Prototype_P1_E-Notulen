export type ParticipantType = "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
export type AttendanceStatus =
  | "HADIR"
  | "SAKIT"
  | "IZIN"
  | "DINAS_LUAR"
  | "TANPA_KETERANGAN";

export interface AttendanceRecord {
  id: string;
  meetingId: string;
  entityId: string; // ID dari anggota/mitra/tenaga ahli/random ID for manual
  type: ParticipantType;
  status: AttendanceStatus;

  // Display Info
  name: string;
  jabatan: string;
  institution?: string; // Untuk Mitra Kerja
  displayFormat?: string; // Format tampilan di notulen (NAMA ® JABATAN)

  signature?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface AttendanceSummary {
  total: number;
  present: number;
  sick: number;
  permitted: number;
  businessTrip: number;
  alpha: number;
}
