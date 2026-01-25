// app/types/forms.ts
// Cukup satu baris untuk mengambil berbagai tipe
import { User, Meeting, AttendanceStatus } from "../types";
export interface MeetingFormData {
  title: string;
  meetingCategoryID: string;
  subMeetingCategoryID?: string;
  agenda: string;
  date: Date;
  startTime: string;
  endTime: string;
  room: string;
  sekretarisId: string;
  notulisIds: string[];
  invitedAnggotaDewanIds: string[];
  invitedMitraKerjaIds: string[];
  invitedTenagaAhliIds: string[];
}

export interface AttendanceFormData {
  meetingId: string;
  records: {
    entityId: string;
    entityType: "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
    status: AttendanceStatus;
  }[];
}

export interface NotulenPointFormData {
  sectionId: string;
  content: string;
}

export interface NotulenSectionFormData {
  meetingId: string;
  personId: string;
  personType: "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
  displayFormat: string;
}

export interface SignNotulenFormData {
  meetingId: string;
  signatureData: string; // Base64 signature image
}

export interface SectionOrderForm {
  meetingId: string;
  sections: Array<{
    sectionId: string;
    order: number; // Nomor urut baru (1, 2, 3, ...)
  }>;
}

export interface PointOrderForm {
  sectionId: string;
  points: Array<{
    pointId: string;
    order: number; // Nomor urut baru dalam section (1, 2, 3, ...)
  }>;
}

