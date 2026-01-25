// app/types/attendance.ts
import { Meeting } from "./meeting";

// export interface MeetingPartnerAttendance {
//   id: string;
//   meetingID: string; // rapat A
//   institutionID: string; // dinas pendidikan
//   personID?: string; // syahid (opsional)
//   status: "hadir" | "tidak_hadir" | "diwakilkan";
//   note?: string; // opsional
// }

// export interface MeetingPartnerAttendanceResolved extends MeetingPartnerAttendance {
//   meeting?: Meeting;
//   institution?: PartnerInstitution;
//   person?: PartnerPerson;
// }

///////////////////////deep
// app/types/attendance.ts
export type ParticipantType = "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
export type AttendanceStatus = "HADIR" | "SAKIT" | "IZIN" | "DINAS_LUAR" | "TANPA_KETERANGAN";

export interface AttendanceRecord {
  id: string;
  meetingId: string;

  entityId: string; // ID dari anggota/mitra/tenaga ahli

  // atau pakai refID?: string;
  // anggota dewan -> anggota.id
  // mitra kerja -> partnerPerson.id

  type: ParticipantType;

  status: AttendanceStatus;

  displayName: string;
  displayTitle?: string;
  // contoh:
  // "KETUA DPRD KABUPATEN"
  // "KEPALA DINAS PENDIDIKAN"

  order: number; // urutan di dokumen

  signature?: string; // URL tanda tangan digital/klo kedepannya mau, klo saat ini kan masih manual hanya display namanya aja
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSummary {
  totalInvited: number;
  totalPresent: number;
  totalAbsent: number;
  totalPermission: number;
  byType: {
    anggota_dewan: number;
    mitra_kerja: number;
    tenaga_ahli: number;
  };
}

// app/types/attendance.ts
export interface AttendanceSheet {
  id: string;
  meetingID: string;
  participantType: "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
  generatedAt: Date;
  pdfUrl?: string;
}
