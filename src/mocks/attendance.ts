// app/mocks/attendance.ts
import {
  AttendanceRecord,
  AttendanceSummary,
  AttendanceSheet,
} from "@/types/attendance";

export const mockAttendanceRecords: AttendanceRecord[] = [
  // Meeting 001 - Anggota Dewan
  {
    id: "attendance-001",
    meetingId: "meeting-001",
    entityId: "anggota-001",
    type: "ANGGOTA_DEWAN",
    status: "HADIR",
    displayName: "KANISIUS KANGO, S.Sos",
    displayTitle: "KETUA DPR KABUPATEN KEEROM",
    order: 1,
    // signature: "/signatures/attendance-001.png",
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T09:00:00"),
  },
  {
    id: "attendance-002",
    meetingId: "meeting-001",
    entityId: "anggota-002",
    type: "ANGGOTA_DEWAN",
    status: "HADIR",
    displayName: "IMAM SUJONO",
    displayTitle: "WAKIL KETUA I DPR KABUPATEN KEEROM",
    order: 2,
    signature: "/signatures/attendance-002.png",
    createdAt: new Date("2024-03-15T09:05:00"),
    updatedAt: new Date("2024-03-15T09:05:00"),
  },
  {
    id: "attendance-003",
    meetingId: "meeting-001",
    entityId: "anggota-004",
    type: "ANGGOTA_DEWAN",
    status: "SAKIT",
    displayName: "Drs. AGUS PRIYANTO",
    displayTitle: "ANGGOTA KOMISI I",
    order: 3,
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T09:00:00"),
  },

  // Meeting 001 - Mitra Kerja
  {
    id: "attendance-004",
    meetingId: "meeting-001",
    entityId: "mitra-001",
    type: "MITRA_KERJA",
    status: "HADIR",
    displayName: "Drs. BAMBANG SUTRISNO, M.Pd.",
    displayTitle: "KEPALA DINAS PENDIDIKAN",
    order: 1,
    signature: "/signatures/attendance-004.png",
    createdAt: new Date("2024-03-15T09:10:00"),
    updatedAt: new Date("2024-03-15T09:10:00"),
  },
  {
    id: "attendance-005",
    meetingId: "meeting-001",
    entityId: "mitra-002",
    type: "MITRA_KERJA",
    status: "DINAS_LUAR",
    displayName: "SRI WAHYUNI, S.Pd., M.Pd.",
    displayTitle: "SEKRETARIS DINAS PENDIDIKAN",
    order: 2,
    createdAt: new Date("2024-03-15T09:30:00"),
    updatedAt: new Date("2024-03-15T09:30:00"),
  },

  // Meeting 001 - Tenaga Ahli
  {
    id: "attendance-006",
    meetingId: "meeting-001",
    entityId: "tenaga-ahli-001",
    type: "TENAGA_AHLI",
    status: "HADIR",
    displayName: "Prof. Dr. IR. SUTARNO, M.T.",
    displayTitle: "ANGGOTA TIM AHLI",
    order: 1,
    signature: "/signatures/attendance-006.png",
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T09:00:00"),
  },
];

export const mockAttendanceSummary: AttendanceSummary = {
  totalInvited: 6,
  totalPresent: 4,
  totalAbsent: 1,
  totalPermission: 1,
  byType: {
    anggota_dewan: 3,
    mitra_kerja: 2,
    tenaga_ahli: 1,
  },
};

export const mockAttendanceSheets: AttendanceSheet[] = [
  {
    id: "sheet-001",
    meetingID: "meeting-001",
    participantType: "ANGGOTA_DEWAN",
    generatedAt: new Date("2024-03-15T10:00:00"),
    pdfUrl: "/attendance/meeting-001-angggota.pdf",
  },
  {
    id: "sheet-002",
    meetingID: "meeting-001",
    participantType: "MITRA_KERJA",
    generatedAt: new Date("2024-03-15T10:00:00"),
    pdfUrl: "/attendance/meeting-001-mitra.pdf",
  },
];
