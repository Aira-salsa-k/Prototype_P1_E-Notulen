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
  // RAPAT PARIPURNA - Rapat Lengkap Seluruh Anggota Dewan
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
  // RAPAT KOMISI I - Bidang Pemerintahan, Hukum, Ketertiban
  // ============================================================
  {
    id: "meeting-002",
    title:
      "RAPAT KERJA KOMISI I DENGAN DINAS PENDIDIKAN TENTANG EVALUASI PENDIDIKAN TAHUN 2025",
    meetingCategoryID: "m1", // Komisi I
    subMeetingCategoryID: "sub-raker-komisi", // Rapat Kerja Komisi
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
  // RAPAT KOMISI II - Bidang Ekonomi, Keuangan, Industri
  // ============================================================
  {
    id: "meeting-003",
    title:
      "RAPAT DENGAR PENDAPAT KOMISI II DENGAN DINAS KESEHATAN TERKAIT PELAYANAN RSUD KEEROM",
    meetingCategoryID: "m2", // Komisi II
    subMeetingCategoryID: "sub-rdpu-komisi", // Rapat Dengar Pendapat Umum
    agenda:
      "1. Evaluasi kualitas pelayanan kesehatan di RSUD Keerom\n2. Pembahasan ketersediaan obat-obatan esensial\n3. Evaluasi ketersediaan tenaga medis dan paramedis\n4. Rencana pengembangan fasilitas kesehatan",
    date: "2026-02-10",
    startTime: "10:00",
    endTime: "14:00",
    room: "RUANG RAPAT KOMISI II - GEDUNG DPRD",
    status: "scheduled",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 020/UND/KOMISI-II/II/2026",
    accessControl: {
      id: "access-003",
      meetingId: "meeting-003",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: [
        "user-anggota-012", // Leonardus Abar (Ketua Komisi II)
        "user-anggota-013", // Iwan Siswanto (Wakil Ketua)
        "user-anggota-014", // Antonius Psebo (Sekretaris)
        "user-anggota-015", // Mansyur
        "user-anggota-016", // Teddi Suseno
        "user-anggota-017", // Kristian Pray
        "user-anggota-018", // Anton Nangai
      ],
      allowedNotulisIds: ["user-notulis-001", "user-notulis-002"],
      createdAt: new Date("2026-02-05"),
      updatedAt: new Date("2026-02-05"),
    },
    createdAt: new Date("2026-02-05"),
    updatedAt: new Date("2026-02-05"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-012", // Leonardus Abar (Ketua Komisi II)
    notulisIds: ["user-notulis-001", "user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-012",
      "user-anggota-013",
      "user-anggota-014",
      "user-anggota-015",
      "user-anggota-016",
      "user-anggota-017",
      "user-anggota-018",
    ],
    invitedMitraKerjaIds: ["mitra-010"], // Dinas Kesehatan
    invitedTenagaAhliIds: ["tenaga-ahli-002"],
  },

  // ============================================================
  // RAPAT KOMISI III - Bidang Pembangunan
  // ============================================================
  {
    id: "meeting-004",
    title:
      "RAPAT KERJA KOMISI III DENGAN DINAS PEKERJAAN UMUM DAN PENATAAN RUANG",
    meetingCategoryID: "m3", // Komisi III
    subMeetingCategoryID: "sub-raker-komisi", // Rapat Kerja Komisi
    agenda:
      "1. Evaluasi Proyek Pembangunan Infrastruktur Jalan\n2. Pembahasan Proyek Jembatan Penghubung\n3. Review Anggaran Tahun 2025\n4. Rencana Pembangunan Tahun 2026",
    date: "2026-01-20",
    startTime: "10:00",
    endTime: "14:00",
    room: "RUANG RAPAT KOMISI III - GEDUNG DPRD",
    status: "completed",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 010/UND/KOMISI-III/I/2026",
    accessControl: {
      id: "access-004",
      meetingId: "meeting-004",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: [
        "user-anggota-019", // Richie Ricardo Tafor (Ketua Komisi III)
        "user-anggota-020", // Hindarto Edi Wibowo (Wakil Ketua)
        "user-anggota-021", // Bahara Baraka (Sekretaris)
        "user-anggota-022", // Dibelon Wonda
        "user-anggota-023", // Ana Maria Borotian
        "user-anggota-024", // Yahya Sauri
        "user-anggota-025", // Munaji
      ],
      allowedNotulisIds: ["user-notulis-002"],
      createdAt: new Date("2026-01-15"),
      updatedAt: new Date("2026-01-20"),
    },
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-20"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-019", // Richie Ricardo Tafor (Ketua Komisi III)
    notulisIds: ["user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-019",
      "user-anggota-020",
      "user-anggota-021",
      "user-anggota-022",
      "user-anggota-023",
      "user-anggota-024",
      "user-anggota-025",
    ],
    invitedMitraKerjaIds: [], // Akan diisi saat ada mitra kerja PUPR
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },

  // ============================================================
  // RAPAT BADAN ANGGARAN (BANGGAR)
  // ============================================================
  {
    id: "meeting-005",
    title: "RAPAT KERJA BADAN ANGGARAN PEMBAHASAN KUA-PPAS TAHUN ANGGARAN 2026",
    meetingCategoryID: "m5", // Banggar
    subMeetingCategoryID: "sub-banggar-kua-ppas", // Pembahasan KUA-PPAS
    agenda:
      "1. Finalisasi Kebijakan Umum Anggaran (KUA)\n2. Pembahasan Prioritas dan Plafon Anggaran Sementara (PPAS)\n3. Sinkronisasi dengan Rencana Kerja Pemerintah Daerah (RKPD)\n4. Penetapan Jadwal Pembahasan RAPBD",
    date: "2026-02-15",
    startTime: "13:00",
    endTime: "17:30",
    room: "RUANG RAPAT BADAN ANGGARAN - GEDUNG DPRD",
    status: "scheduled",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 025/UND/BANGGAR/II/2026",
    accessControl: {
      id: "access-005",
      meetingId: "meeting-005",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-001", // Kanisius Kango (Ketua)
        "user-anggota-002", // Imam Sujono (Wakil Ketua I)
        "user-anggota-003", // Sigit Widodo (Wakil Ketua II)
        "user-anggota-004", // Jakobus Mekawa (Wakil Ketua II)
        "user-anggota-015", // Mansyur
        "user-anggota-022", // Dibelon Wonda
        "user-anggota-013", // Iwan Siswanto
        "user-anggota-012", // Leonardus Abar
        "user-anggota-018", // Anton Nangai
        "user-anggota-023", // Ana Maria Borotian
        "user-anggota-020", // Hindarto Edi Wibowo
        "user-anggota-025", // Munaji
        "user-anggota-024", // Yahya Sauri
      ],
      allowedNotulisIds: ["user-notulis-001", "user-notulis-002"],
      createdAt: new Date("2026-02-10"),
      updatedAt: new Date("2026-02-10"),
    },
    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-02-10"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-001", // Kanisius Kango (Ketua Banggar)
    notulisIds: ["user-notulis-001", "user-notulis-002"],
    invitedAnggotaDewanIds: [
      "user-anggota-001",
      "user-anggota-002",
      "user-anggota-003",
      "user-anggota-004",
      "user-anggota-015",
      "user-anggota-022",
      "user-anggota-013",
      "user-anggota-012",
      "user-anggota-018",
      "user-anggota-023",
      "user-anggota-020",
      "user-anggota-025",
      "user-anggota-024",
    ],
    invitedMitraKerjaIds: [],
    invitedTenagaAhliIds: ["tenaga-ahli-001", "tenaga-ahli-002"],
  },

  // ============================================================
  // RAPAT BADAN MUSYAWARAH (BAMUS)
  // ============================================================
  {
    id: "meeting-006",
    title: "RAPAT BADAN MUSYAWARAH PENYUSUNAN AGENDA MASA SIDANG II TAHUN 2026",
    meetingCategoryID: "m6", // Bamus
    subMeetingCategoryID: "sub-bamus-agenda", // Penyusunan Agenda Masa Sidang
    agenda:
      "1. Evaluasi Pelaksanaan Masa Sidang I\n2. Penyusunan Rencana Kerja Masa Sidang II\n3. Penetapan Jadwal Rapat-Rapat Komisi\n4. Koordinasi Antar Alat Kelengkapan Dewan",
    date: "2026-02-20",
    startTime: "09:00",
    endTime: "12:00",
    room: "RUANG RAPAT BADAN MUSYAWARAH - GEDUNG DPRD",
    status: "scheduled",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 030/UND/BAMUS/II/2026",
    accessControl: {
      id: "access-006",
      meetingId: "meeting-006",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: [
        "user-anggota-001", // Kanisius Kango (Ketua)
        "user-anggota-002", // Imam Sujono (Wakil Ketua I)
        "user-anggota-003", // Sigit Widodo (Wakil Ketua II)
        "user-anggota-004", // Jakobus Mekawa (Wakil Ketua II)
        "user-anggota-008", // Marthen Naak
        "user-anggota-015", // Mansyur
        "user-anggota-012", // Leonardus Abar
        "user-anggota-013", // Iwan Siswanto
        "user-anggota-010", // Daniel Amo
        "user-anggota-018", // Anton Nangai
        "user-anggota-020", // Hindarto Edi Wibowo
        "user-anggota-006", // Nathan Bonay
        "user-anggota-016", // Teddi Suseno
      ],
      allowedNotulisIds: ["user-notulis-001"],
      createdAt: new Date("2026-02-15"),
      updatedAt: new Date("2026-02-15"),
    },
    createdAt: new Date("2026-02-15"),
    updatedAt: new Date("2026-02-15"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-001", // Kanisius Kango (Ketua Bamus)
    notulisIds: ["user-notulis-001"],
    invitedAnggotaDewanIds: [
      "user-anggota-001",
      "user-anggota-002",
      "user-anggota-003",
      "user-anggota-004",
      "user-anggota-008",
      "user-anggota-015",
      "user-anggota-012",
      "user-anggota-013",
      "user-anggota-010",
      "user-anggota-018",
      "user-anggota-020",
      "user-anggota-006",
      "user-anggota-016",
    ],
    invitedMitraKerjaIds: [],
    invitedTenagaAhliIds: [],
  },

  // ============================================================
  // RAPAT BADAN PEMBENTUKAN PERATURAN DAERAH (BAPEMPERDA)
  // ============================================================
  {
    id: "meeting-007",
    title: "RAPAT BAPEMPERDA PEMBAHASAN RANPERDA TENTANG KAMPUNG ADAT",
    meetingCategoryID: "m8", // Bapemperda
    subMeetingCategoryID: "sub-bapemperda-ranperda", // Pembahasan Ranperda
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
      meetingId: "meeting-007",
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

  // ============================================================
  // RAPAT BADAN KEHORMATAN (BK)
  // ============================================================
  {
    id: "meeting-008",
    title: "RAPAT BADAN KEHORMATAN EVALUASI KODE ETIK ANGGOTA DEWAN",
    meetingCategoryID: "m9", // BK
    subMeetingCategoryID: "sub-bk-etik", // Evaluasi Kode Etik
    agenda:
      "1. Evaluasi Penegakan Kode Etik Semester I\n2. Pembahasan Mekanisme Pengaduan Masyarakat\n3. Review Tata Tertib DPRD\n4. Laporan Kehadiran Anggota Dewan",
    date: "2026-01-25",
    startTime: "14:00",
    endTime: "16:00",
    room: "RUANG RAPAT BADAN KEHORMATAN - GEDUNG DPRD",
    status: "completed",
    hasAccess: true,
    masaSidang: "Masa Sidang I Tahun 2026",
    dasarSurat: "Surat Undangan Nomor 005/UND/BK/I/2026",
    accessControl: {
      id: "access-008",
      meetingId: "meeting-008",
      isGlobalAccessOn: false,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: [
        "user-anggota-006", // Nathan Bonay (Ketua BK)
        "user-anggota-008", // Marthen Naak (Sekretaris)
        "user-anggota-007", // Maria Nof
      ],
      allowedNotulisIds: ["user-notulis-001"],
      createdAt: new Date("2026-01-20"),
      updatedAt: new Date("2026-01-25"),
    },
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-25"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    pimpinanRapatId: "user-anggota-006", // Nathan Bonay (Ketua BK)
    notulisIds: ["user-notulis-001"],
    invitedAnggotaDewanIds: [
      "user-anggota-006",
      "user-anggota-008",
      "user-anggota-007",
    ],
    invitedMitraKerjaIds: [],
    invitedTenagaAhliIds: [],
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
