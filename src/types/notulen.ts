// app/types/notulen.ts
import { ParticipantType } from "./attendance";
import { AttendanceRecord } from "./attendance";
import { User } from "./user";
import { Meeting } from "./meeting";

export interface NotulenSection {
  id: string;
  meetingID: string;
  participanID: string;
  participantType: "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
  displayFormat: string; // Format: "NAMA ® JABATAN"
  points: NotulenPoint[];
  order: number; // Urutan tampilan dalam PDF (1, 2, 3, ...)
  isLocked: boolean;
  lockedBy?: string; // User ID yang mengunci
  lockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotulenPoint {
  id: string;
  sectionId: string;
  content: string;
  order: number;
  createdBy: string; // User ID
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingMinutes {
  id: string;
  meetingId: string;
  kesimpulan?: string;
  catatan?: string;
  dokumentasi: string[]; // Array of image URLs
  pdfUrl?: string; // Generated PDF URL
  isSigned: boolean;
  signedAt?: Date;
  signedBy?: string; // Sekwan ID
  signatureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotulenProgress {
  totalSections: number;
  completedSections: number;
  lockedSections: number;
  totalPoints: number;
  lastUpdated: Date;
}

export interface NotulenInputForm {
  meetingId: string;
  sections: Array<{
    participantID: string;
    participantType: "ANGGOTA_DEWAN" | "MITRA_KERJA" | "TENAGA_AHLI";
    displayFormat: string;
    points: Array<{
      content: string;
      order: number;
    }>;
  }>;
  kesimpulan?: string;
  catatan?: string;
  dokumentasi?: File[]; // Untuk upload file
}

export type SignatureContext = "NOTULEN" | "ABSEN";

export interface Signature {
  id: string;
  userId: string;
  context: SignatureContext;
  template: string;
}

export interface NotulenSignature {
  sekwanId: string;
  name: string;
  jabatan: string;
}