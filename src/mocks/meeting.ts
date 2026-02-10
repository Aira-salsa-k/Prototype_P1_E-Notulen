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

/**
 * Mock Meeting Data - DPRD Kabupaten Keerom
 * Data ini menggambarkan berbagai jenis rapat yang ada di DPRD
 * dengan struktur data yang lengkap dan proper.
 */
export const mockMeetings: Meeting[] = [
  // ============================================================
  // RAPAT PARIPURNA - Rapat Lengkap Seluruh Anggota Dewan (BUKAN AKD)
  // ============================================================
  {
    id: "meeting-001",
    title: "RAPAT PARIPURNA PENYAMPAIAN LKPJ BUPATI KEEROM TAHUN ANGGARAN 2025",
    meetingCategoryID: "m4", // Pleno
    subMeetingCategoryID: "sub-paripurna-lkpj", // Penyampaian LKPJ
    agenda:
      "Mendengarkan Pidato Pengantar Bupati Keerom terhadap Laporan Keterangan Pertanggungjawaban (LKPJ) Akhir Tahun Anggaran 2025.",
    date: "2026-02-01",
    startTime: "09:00",
    endTime: "12:30",
    room: "RUANG PARIPURNA UTAMA - GEDUNG DPRD",
    status: "completed",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 001/UND/DPRD/II/2026",
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
        "user-anggota-011",
        "user-anggota-012",
        "user-anggota-013",
        "user-anggota-014",
        "user-anggota-015",
        "user-anggota-016",
        "user-anggota-017",
        "user-anggota-018",
        "user-anggota-019",
        "user-anggota-020",
        "user-anggota-021",
        "user-anggota-022",
        "user-anggota-023",
        "user-anggota-024",
        "user-anggota-025",
      ],
      allowedNotulisIds: ["user-notulis-001", "user-notulis-002"],
      createdAt: new Date("2026-01-25"),
      updatedAt: new Date("2026-02-01"),
    },
    createdAt: new Date("2026-01-25"),
    updatedAt: new Date("2026-02-01"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-001", // Kanisius Kango (Ketua DPRD)
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
      "user-anggota-011",
      "user-anggota-012",
      "user-anggota-013",
      "user-anggota-014",
      "user-anggota-015",
      "user-anggota-016",
      "user-anggota-017",
      "user-anggota-018",
      "user-anggota-019",
      "user-anggota-020",
      "user-anggota-021",
      "user-anggota-022",
      "user-anggota-023",
      "user-anggota-024",
      "user-anggota-025",
    ],
    invitedMitraKerjaIds: ["mitra-001", "mitra-010"], // Dinas Pendidikan, Dinas Kesehatan
    invitedTenagaAhliIds: ["tenaga-ahli-001", "tenaga-ahli-002"],
  },

  // ============================================================
  // RAPAT KOMISI I - Bidang Pemerintahan, Hukum, Ketertiban (AKD - TANPA SUB)
  // ============================================================
  {
    id: "meeting-002",
    title:
      "RAPAT KOMISI I DENGAN DINAS PENDIDIKAN TENTANG EVALUASI PENDIDIKAN TAHUN 2025",
    meetingCategoryID: "m1", // Komisi I
    subMeetingCategoryID: "m1", // AKD - Point to standard variant for members
    agenda:
      "1. Evaluasi Program Pendidikan Tahun 2025\n2. Pembahasan Anggaran Pendidikan Tahun 2026\n3. Tindak Lanjut Permasalahan Tenaga Pendidik di Distrik Terpencil",
    date: "2026-02-07",
    startTime: "09:00",
    endTime: "12:00",
    room: "RUANG RAPAT KOMISI I - GEDUNG DPRD",
    status: "live",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 015/UND/KOMISI-I/II/2026",
    accessControl: {
      id: "access-002",
      meetingId: "meeting-002",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: [
        "user-anggota-005", // Dominika Tafor (Ketua Komisi I)
        "user-anggota-006", // Nathan Bonay (Wakil Ketua)
        "user-anggota-007", // Maria Nof (Sekretaris)
        "user-anggota-008", // Marthen Naak
        "user-anggota-009", // Yakob Palimbunga
        "user-anggota-010", // Daniel Amo
        "user-anggota-011", // Lukas Maunda
      ],
      allowedNotulisIds: ["user-notulis-001"],
      createdAt: new Date("2026-02-03"),
      updatedAt: new Date("2026-02-07"),
    },
    createdAt: new Date("2026-02-03"),
    updatedAt: new Date("2026-02-07"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-005", // Dominika Tafor (Ketua Komisi I)
    notulisIds: ["user-notulis-001"],
    invitedAnggotaDewanIds: [
      "user-anggota-005",
      "user-anggota-006",
      "user-anggota-007",
      "user-anggota-008",
      "user-anggota-009",
      "user-anggota-010",
      "user-anggota-011",
    ],
    invitedMitraKerjaIds: ["mitra-001", "mitra-002"], // Kadis & Sekdis Pendidikan
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },

  // ============================================================
  // RAPAT BAPEMPERDA - Pembentukan Peraturan Daerah (AKD - TANPA SUB)
  // ============================================================
  {
    id: "meeting-003",
    title: "RAPAT BAPEMPERDA PEMBAHASAN RANPERDA TENTANG KAMPUNG ADAT",
    meetingCategoryID: "m8", // Bapemperda
    subMeetingCategoryID: "m8", // AKD - Point to standard variant for members
    agenda:
      "1. Pembahasan Daftar Inventarisasi Masalah (DIM)\n2. Finalisasi Pasal-Pasal Ranperda Kampung Adat\n3. Harmonisasi dengan Peraturan Perundang-undangan\n4. Penetapan Jadwal Pembahasan Bersama Eksekutif",
    date: "2026-02-25",
    startTime: "09:00",
    endTime: "15:00",
    room: "RUANG RAPAT BAPEMPERDA - GEDUNG DPRD",
    status: "scheduled",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 035/UND/BAPEMPERDA/II/2026",
    accessControl: {
      id: "access-007",
      meetingId: "meeting-003",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-016", // Teddi Suseno (Ketua)
        "user-anggota-009", // Yakob Palimbunga (Wakil Ketua)
        "user-anggota-021", // Bahara Baraka
        "user-anggota-017", // Kristian Pray
        "user-anggota-019", // Richie Ricardo Tafor
        "user-anggota-011", // Lukas Maunda
        "user-anggota-014", // Antonius Psebo
      ],
      allowedNotulisIds: ["user-notulis-002"],
      createdAt: new Date("2026-02-20"),
      updatedAt: new Date("2026-02-20"),
    },
    createdAt: new Date("2026-02-20"),
    updatedAt: new Date("2026-02-20"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-016", // Teddi Suseno (Ketua Bapemperda)
    notulisIds: ["user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-016",
      "user-anggota-009",
      "user-anggota-021",
      "user-anggota-017",
      "user-anggota-019",
      "user-anggota-011",
      "user-anggota-014",
    ],
    invitedMitraKerjaIds: [],
    invitedTenagaAhliIds: ["tenaga-ahli-001", "tenaga-ahli-002"],
  },
];

/**
 * Resolved Meeting Data
 * Data rapat yang sudah di-resolve dengan kategori, sub-kategori, dan informasi terkait
 */
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
