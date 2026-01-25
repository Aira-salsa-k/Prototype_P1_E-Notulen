// app/types/pdf.ts
import { MeetingResolved, AttendanceRecord, NotulenSection, MeetingMinutes,AttendanceSummary } from "../types";
export interface PDFTemplateData {
  meeting: MeetingResolved;
  attendance: {
    anggotaDewan: AttendanceRecord[];
    mitraKerja: AttendanceRecord[];
    tenagaAhli: AttendanceRecord[];
  };
  notulenSections: NotulenSection[];
  meetingMinutes: MeetingMinutes;
  summary: AttendanceSummary;
}

export interface PDFGenerationConfig {
  includeAttendance: boolean;
  includeNotulen: boolean;
  includeSignatures: boolean;
  includePhotos: boolean;
  watermark: boolean;
}

export interface GeneratedPDF {
  id: string;
  meetingId: string;
  pdfUrl: string;
  generatedAt: Date;
  generatedBy: string;
  config: PDFGenerationConfig;
  size: number;
  pages: number;
}
