import { mockMeetingCategories } from "./meeting-category";
import { mockSubMeetingCategories } from "./meeting-sub-category";
import { mockUsers } from "./user";
import { generateMockSekretarisDewan } from "./sekretaris-dewan";
// app/mocks/meeting.ts
import {
  Meeting,
  MeetingAccessControl,
  MeetingResolved,
  MeetingDetail,
} from "../types/meeting";

export const mockMeetings: Meeting[] = [
  {
    id: "meeting-001",
    title: "RAPAT PARIPURNA PENYAMPAIAN LKPJ BUPATI KEEROM TAHUN ANGGARAN 2023",
    meetingCategoryID: "m4", // Pleno
    subMeetingCategoryID: "var-4", // Pembahasan LKPJ
    agenda:
      "Mendengarkan Pidato Pengantar Bupati Keerom terhadap Laporan Keterangan Pertanggungjawaban (LKPJ) Akhir Tahun Anggaran 2023.",
    date: "2026-02-01",
    startTime: "09:00",
    endTime: "12:30",
    room: "RUANG PARIPURNA UTAMA - GEDUNG DPRD",
    status: "completed",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 123/UND/DPRD/2026",
    accessControl: {
      id: "access-001",
      meetingId: "meeting-001",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-001",
        "user-anggota-002",
        "user-anggota-003",
        "user-anggota-004",
        "user-anggota-005",
        "user-anggota-006",
        "user-anggota-007",
        "user-anggota-008",
        "user-anggota-009",
        "user-anggota-010",
      ],
      allowedNotulisIds: ["user-notulis-001", "user-notulis-002"],
      createdAt: new Date("2026-02-01"),
      updatedAt: new Date("2026-02-01"),
    },
    auditLogs: [
      {
        id: "log-init-1",
        action: "CREATE",
        userId: "user-admin-001",
        userName: "Administrator",
        timestamp: new Date("2026-02-01T10:00:00"),
        details: "Jadwal rapat dibuat.",
      },
      {
        id: "log-start-1",
        action: "START",
        userId: "user-sekwan-001",
        userName: "Sekretaris Dewan",
        timestamp: new Date("2026-02-01T09:05:00"),
        details: "Rapat dimulai tepat waktu.",
      },
    ],
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-001",
    notulisIds: ["user-notulis-001", "user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-001",
      "user-anggota-002",
      "user-anggota-003",
      "user-anggota-004",
      "user-anggota-005",
      "user-anggota-006",
      "user-anggota-007",
      "user-anggota-008",
      "user-anggota-009",
      "user-anggota-010",
    ],
    invitedMitraKerjaIds: ["mitra-001", "mitra-003"],
    invitedTenagaAhliIds: ["tenaga-ahli-001", "tenaga-ahli-002"],
  },
  {
    id: "meeting-002",
    title:
      "RAPAT DENGAR PENDAPAT KOMISI II DENGAN DINAS KESEHATAN TERKAIT PELAYANAN RSUD KEEROM",
    meetingCategoryID: "m2", // Komisi II
    subMeetingCategoryID: "var-2", // Evaluasi Tahunan Komisi II
    agenda:
      "Evaluasi kualitas pelayanan kesehatan di RSUD Keerom dan pembahasan ketersediaan obat-obatan serta tenaga medis.",
    date: "2026-01-05",
    startTime: "10:00",
    endTime: "14:00",
    room: "RUANG RAPAT KOMISI II - GEDUNG DPRD",
    status: "live",
    hasAccess: true,
    accessControl: {
      id: "access-002",
      meetingId: "meeting-002",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: [
        "user-anggota-002",
        "user-anggota-008",
        "user-anggota-007",
        "user-anggota-008",
      ],
      allowedNotulisIds: ["user-notulis-001"],
      createdAt: new Date("2026-01-03"),
      updatedAt: new Date("2026-01-03"),
    },
    auditLogs: [
      {
        id: "log-init-2",
        action: "CREATE",
        userId: "user-admin-001",
        userName: "Administrator",
        timestamp: new Date("2026-01-01T08:00:00"),
      },
      {
        id: "log-start-2",
        action: "START",
        userId: "user-sekwan-002",
        userName: "Sekwan",
        timestamp: new Date("2026-01-05T10:02:00"),
      },
    ],
    createdAt: new Date("2026-05-28"),
    updatedAt: new Date("2026-01-03"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-002",
    pimpinanRapatId: "user-anggota-002",
    notulisIds: ["user-notulis-001"],
    invitedAnggotaDewanIds: [
      "user-anggota-002",
      "user-anggota-008",
      "user-anggota-007",
      "user-anggota-008",
    ],
    invitedMitraKerjaIds: ["mitra-003"],
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },
  {
    id: "meeting-003",
    title: "RAPAT KERJA BADAN ANGGARAN PEMBAHASAN KUA-PPAS TAHUN 2025",
    meetingCategoryID: "m5", // Banggar
    subMeetingCategoryID: "var-5", // RKA Perubahan Banggar
    agenda:
      "Finalisasi Kebijakan Umum Anggaran dan Prioritas Plafon Anggaran Sementara (KUA-PPAS) untuk APBD Tahun Anggaran 2025.",
    date: "2026-01-15",
    startTime: "13:00",
    endTime: "17:30",
    room: "RUANG RAPAT BADAN ANGGARAN",
    status: "scheduled",
    hasAccess: true,
    accessControl: {
      id: "access-003",
      meetingId: "meeting-003",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-001",
        "user-anggota-002",
        "user-anggota-003",
        "user-anggota-005",
        "user-anggota-006",
        "user-anggota-009",
        "user-anggota-010",
      ],
      allowedNotulisIds: ["user-notulis-002"],
      createdAt: new Date("2026-01-12"),
      updatedAt: new Date("2026-01-12"),
    },
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-12"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    notulisIds: ["user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-001",
      "user-anggota-002",
      "user-anggota-003",
      "user-anggota-005",
      "user-anggota-006",
      "user-anggota-009",
      "user-anggota-010",
    ],
    invitedMitraKerjaIds: ["mitra-001"],
    invitedTenagaAhliIds: ["tenaga-ahli-002"],
  },
  {
    id: "meeting-004",
    title: "RAPAT KOMISI I PEMBAHASAN RANPERDA TENTANG KAMPUNG ADAT",
    meetingCategoryID: "m1", // Komisi I
    subMeetingCategoryID: "var-1", // Rapat Dengar Pendapat
    agenda:
      "Pembahasan Rancangan Peraturan Daerah tentang Kampung Adat di Kabupaten Keerom bersama Dinas Pemberdayaan Masyarakat Kampung.",
    date: "2026-02-10",
    startTime: "09:00",
    endTime: "12:00",
    room: "RUANG RAPAT KOMISI I",
    status: "scheduled",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 125/UND/DPRD/2026",
    accessControl: {
      id: "access-004",
      meetingId: "meeting-004",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-001",
        "user-anggota-003",
        "user-anggota-004",
        "user-anggota-006",
      ],
      allowedNotulisIds: ["user-notulis-001"],
      createdAt: new Date("2026-02-05"),
      updatedAt: new Date("2026-02-05"),
    },
    createdAt: new Date("2026-02-05"),
    updatedAt: new Date("2026-02-05"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-003",
    notulisIds: ["user-notulis-001"],
    invitedAnggotaDewanIds: [
      "user-anggota-001",
      "user-anggota-003",
      "user-anggota-004",
      "user-anggota-006",
    ],
    invitedMitraKerjaIds: ["mitra-001"],
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },
  {
    id: "meeting-005",
    title:
      "RAPAT KERJA KOMISI III DENGAN DINAS PEKERJAAN UMUM DAN PENATAAN RUANG",
    meetingCategoryID: "m3", // Komisi III
    subMeetingCategoryID: "var-3", // Rapat Kerja
    agenda:
      "Evaluasi Proyek Pembangunan Infrastruktur Jalan dan Jembatan Tahun Anggaran 2025.",
    date: "2026-01-20",
    startTime: "10:00",
    endTime: "14:00",
    room: "RUANG RAPAT KOMISI III",
    status: "completed",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 120/UND/DPRD/2026",
    accessControl: {
      id: "access-005",
      meetingId: "meeting-005",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-002",
        "user-anggota-006",
        "user-anggota-007",
      ],
      allowedNotulisIds: ["user-notulis-002"],
      createdAt: new Date("2026-01-15"),
      updatedAt: new Date("2026-01-15"),
    },
    auditLogs: [
      {
        id: "log-init-5",
        action: "CREATE",
        userId: "user-admin-001",
        userName: "Administrator",
        timestamp: new Date("2026-01-15T08:00:00"),
        details: "Jadwal rapat dibuat.",
      },
      {
        id: "log-start-5",
        action: "START",
        userId: "user-sekwan-001",
        userName: "Sekretaris Dewan",
        timestamp: new Date("2026-01-20T10:05:00"),
        details: "Rapat dimulai.",
      },
      {
        id: "log-end-5",
        action: "END",
        userId: "user-sekwan-001",
        userName: "Sekretaris Dewan",
        timestamp: new Date("2026-01-20T14:00:00"),
        details: "Rapat selesai.",
      },
    ],
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-20"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-002",
    notulisIds: ["user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-002",
      "user-anggota-006",
      "user-anggota-007",
    ],
    invitedMitraKerjaIds: ["mitra-002"],
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },
];

export const mockMeetingResolved: MeetingResolved[] = mockMeetings.map(
  (meeting) => ({
    ...meeting,
    meetingCategory:
      mockMeetingCategories.find((c) => c.id === meeting.meetingCategoryID) ||
      null,
    subMeetingCategory: meeting.subMeetingCategoryID
      ? mockSubMeetingCategories.find(
          (s) => s.id === meeting.subMeetingCategoryID,
        ) || null
      : null,
    sekretaris: (() => {
      const profile = generateMockSekretarisDewan().find(
        (s) => s.id === meeting.sekretarisId,
      );
      return mockUsers.find((u) => u.id === profile?.userId) || null;
    })(),
    notulis: mockUsers.filter((u) => meeting.notulisIds.includes(u.id)),
  }),
);
