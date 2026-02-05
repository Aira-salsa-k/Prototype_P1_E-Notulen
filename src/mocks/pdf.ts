import { mockMeetingMinutes } from './notulen';
// app/mocks/pdf.ts

import { mockNotulenSections,mockAttendanceRecords, mockMeetingResolved, mockNotulenProgress } from "../mocks";

import {
  PDFTemplateData,
  PDFGenerationConfig,
  GeneratedPDF,
} from "@/types/pdf";

// export const mockPDFTemplateData: PDFTemplateData = {
//   meeting: mockMeetingResolved[0],
//   attendance: {
//     anggotaDewan: mockAttendanceRecords.filter(
//       (r) => r.type === "ANGGOTA_DEWAN",
//     ),
//     mitraKerja: mockAttendanceRecords.filter((r) => r.type === "MITRA_KERJA"),
//     tenagaAhli: mockAttendanceRecords.filter((r) => r.type === "TENAGA_AHLI"),
//   },
//   notulenSections: mockNotulenSections,
//   meetingMinutes: mockMeetingMinutes[0],
//   summary: mockAttendanceSummary,
// };

export const mockPDFGenerationConfig: PDFGenerationConfig = {
  includeAttendance: true,
  includeNotulen: true,
  includeSignatures: true,
  includePhotos: true,
  watermark: true,
};

export const mockGeneratedPDFs: GeneratedPDF[] = [
  {
    id: "pdf-001",
    meetingId: "meeting-001",
    pdfUrl: "/notulen/meeting-001-notulen.pdf",
    generatedAt: new Date("2024-03-15T13:30:00"),
    generatedBy: "user-notulis-001",
    config: mockPDFGenerationConfig,
    size: 2457600, // 2.4 MB
    pages: 12,
  },
];

// app/mocks/realtime.ts
import {
  CollaborationSession,
  RealtimeUpdate,
  NotulenProgressUpdate,
} from "@/types/realtime";

export const mockCollaborationSessions: CollaborationSession[] = [
  {
    meetingId: "meeting-001",
    userId: "user-notulis-001",
    userName: "Budi Santoso",
    userRole: "NOTULIS",
    sectionId: "section-001",
    isActive: true,
    lastActivity: new Date("2024-03-15T09:55:00"),
  },
  {
    meetingId: "meeting-001",
    userId: "user-notulis-002",
    userName: "Siti Aminah",
    userRole: "NOTULIS",
    sectionId: "section-002",
    isActive: true,
    lastActivity: new Date("2024-03-15T09:52:00"),
  },
  {
    meetingId: "meeting-001",
    userId: "user-anggota-001",
    userName: "KANISIUS KANGO, S.Sos",
    userRole: "ANGGOTA_DEWAN",
    isActive: true,
    lastActivity: new Date("2024-03-15T09:50:00"),
  },
];

export const mockRealtimeUpdates: RealtimeUpdate<any>[] = [
  {
    type: "UPDATE",
    entity: "notulen-point",
    data: {
      id: "point-008",
      content:
        "Mengusulkan agar ada klausul tentang pendidikan inklusif untuk anak berkebutuhan khusus",
    },
    userId: "user-notulis-001",
    timestamp: new Date("2024-03-15T09:40:00"),
  },
  {
    type: "LOCK",
    entity: "section",
    data: {
      sectionId: "section-001",
      isLocked: true,
      lockedBy: "user-notulis-001",
    },
    userId: "user-notulis-001",
    timestamp: new Date("2024-03-15T09:30:00"),
  },
];

export const mockNotulenProgressUpdate: NotulenProgressUpdate = {
  meetingId: "meeting-001",
  sectionId: "section-001",
  isLocked: true,
  lockedBy: "user-notulis-001",
  progress: mockNotulenProgress,
};
