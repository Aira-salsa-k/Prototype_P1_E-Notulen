// app/mocks/notulen.ts
import {
  NotulenSection,
  NotulenPoint,
  MeetingMinutes,
  NotulenProgress,
} from "@/types/notulen";

/**
 * Mock Notulen Progress - Status progress notulensi rapat
 */
export const mockNotulenProgress: NotulenProgress = {
  totalSections: 3,
  completedSections: 2,
  lockedSections: 2,
  totalPoints: 7,
  lastUpdated: new Date("2026-02-01T12:30:00"),
};

/**
 * Mock Notulen Sections - Data poin-poin pembicara dalam rapat
 *
 * Struktur:
 * - Setiap section = satu pembicara
 * - Setiap point = satu poin yang disampaikan pembicara
 * - participantType menentukan kategori pembicara
 * - displayFormat mengikuti format "NAMA ® JABATAN RAPAT"
 */

// ============================================================
// NOTULEN POINTS UNTUK MEETING 001 - PARIPURNA LKPJ
// ============================================================
const notulenPointsMeeting001: NotulenPoint[] = [
  // Poin dari Ketua DPRD
  {
    id: "point-001-001",
    sectionId: "section-001-001",
    content:
      "Mengucapkan selamat datang kepada seluruh peserta Rapat Paripurna Penyampaian LKPJ Bupati Keerom Tahun Anggaran 2025.",
    order: 1,
    createdBy: "user-notulis-001",
    createdAt: new Date("2026-02-01T09:15:00"),
    updatedAt: new Date("2026-02-01T09:15:00"),
  },
  {
    id: "point-001-002",
    sectionId: "section-001-001",
    content:
      "Menyampaikan bahwa rapat ini merupakan agenda penting dalam rangka mendengarkan pertanggungjawaban Bupati atas pelaksanaan APBD Tahun Anggaran 2025.",
    order: 2,
    createdBy: "user-notulis-001",
    createdAt: new Date("2026-02-01T09:20:00"),
    updatedAt: new Date("2026-02-01T09:20:00"),
  },
  {
    id: "point-001-003",
    sectionId: "section-001-001",
    content:
      "Membuka sidang secara resmi dan mempersilakan Bupati Keerom untuk menyampaikan pidato pengantar LKPJ.",
    order: 3,
    createdBy: "user-notulis-001",
    createdAt: new Date("2026-02-01T09:25:00"),
    updatedAt: new Date("2026-02-01T09:25:00"),
  },
  // Poin dari Wakil Ketua I
  {
    id: "point-001-004",
    sectionId: "section-001-002",
    content:
      "Menyampaikan apresiasi atas capaian pembangunan di bidang infrastruktur dasar, khususnya jalan dan jembatan penghubung antar distrik.",
    order: 1,
    createdBy: "user-notulis-001",
    createdAt: new Date("2026-02-01T10:00:00"),
    updatedAt: new Date("2026-02-01T10:00:00"),
  },
  {
    id: "point-001-005",
    sectionId: "section-001-002",
    content:
      "Meminta penjelasan mengenai realisasi anggaran sektor pendidikan yang masih di bawah target 80%.",
    order: 2,
    createdBy: "user-notulis-001",
    createdAt: new Date("2026-02-01T10:05:00"),
    updatedAt: new Date("2026-02-01T10:05:00"),
  },
  // Poin dari Kepala Dinas Pendidikan
  {
    id: "point-001-006",
    sectionId: "section-001-003",
    content:
      "Menyampaikan bahwa realisasi anggaran pendidikan terkendala oleh keterlambatan pengadaan barang dan jasa.",
    order: 1,
    createdBy: "user-notulis-002",
    createdAt: new Date("2026-02-01T10:30:00"),
    updatedAt: new Date("2026-02-01T10:30:00"),
  },
  {
    id: "point-001-007",
    sectionId: "section-001-003",
    content:
      "Berkomitmen untuk meningkatkan penyerapan anggaran pada tahun anggaran berikutnya dengan perbaikan perencanaan.",
    order: 2,
    createdBy: "user-notulis-002",
    createdAt: new Date("2026-02-01T10:35:00"),
    updatedAt: new Date("2026-02-01T10:35:00"),
  },
];

export const mockNotulenSections: NotulenSection[] = [
  // ============================================================
  // MEETING 001 - PARIPURNA LKPJ (COMPLETED)
  // ============================================================
  {
    id: "section-001-001",
    meetingID: "meeting-001",
    participanID: "anggota-001",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "KANISIUS KANGO, S.SOS ® KETUA DPR KABUPATEN KEEROM",
    points: notulenPointsMeeting001.filter(
      (p) => p.sectionId === "section-001-001",
    ),
    order: 1,
    isLocked: true,
    lockedBy: "user-notulis-001",
    lockedAt: new Date("2026-02-01T12:30:00"),
    createdAt: new Date("2026-02-01T09:15:00"),
    updatedAt: new Date("2026-02-01T12:30:00"),
  },
  {
    id: "section-001-002",
    meetingID: "meeting-001",
    participanID: "anggota-002",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "IMAM SUJONO ® WAKIL KETUA I DPR KABUPATEN KEEROM",
    points: notulenPointsMeeting001.filter(
      (p) => p.sectionId === "section-001-002",
    ),
    order: 2,
    isLocked: true,
    lockedBy: "user-notulis-001",
    lockedAt: new Date("2026-02-01T12:30:00"),
    createdAt: new Date("2026-02-01T10:00:00"),
    updatedAt: new Date("2026-02-01T12:30:00"),
  },
  {
    id: "section-001-003",
    meetingID: "meeting-001",
    participanID: "mitra-001",
    participantType: "MITRA_KERJA",
    displayFormat: "DRS. BAMBANG SUTRISNO, M.PD. ® KEPALA DINAS PENDIDIKAN",
    points: notulenPointsMeeting001.filter(
      (p) => p.sectionId === "section-001-003",
    ),
    order: 3,
    isLocked: true,
    lockedBy: "user-notulis-002",
    lockedAt: new Date("2026-02-01T12:30:00"),
    createdAt: new Date("2026-02-01T10:30:00"),
    updatedAt: new Date("2026-02-01T12:30:00"),
  },

  // ============================================================
  // MEETING 002 - RAPAT KERJA KOMISI I (LIVE - Sedang berlangsung)
  // ============================================================
  {
    id: "section-002-001",
    meetingID: "meeting-002",
    participanID: "anggota-005",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "DOMINIKA TAFOR, SH ® KETUA KOMISI I",
    points: [
      {
        id: "point-002-001",
        sectionId: "section-002-001",
        content:
          "Membuka rapat dan menyampaikan tujuan pertemuan yaitu evaluasi program pendidikan tahun 2025.",
        order: 1,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-02-07T09:05:00"),
        updatedAt: new Date("2026-02-07T09:05:00"),
      },
      {
        id: "point-002-002",
        sectionId: "section-002-001",
        content:
          "Meminta Dinas Pendidikan untuk mempresentasikan capaian kinerja tahun 2025.",
        order: 2,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-02-07T09:10:00"),
        updatedAt: new Date("2026-02-07T09:10:00"),
      },
    ],
    order: 1,
    isLocked: true,
    lockedBy: "user-notulis-001",
    lockedAt: new Date("2026-02-07T09:05:00"),
    createdAt: new Date("2026-02-07T09:05:00"),
    updatedAt: new Date("2026-02-07T09:10:00"),
  },
  {
    id: "section-002-002",
    meetingID: "meeting-002",
    participanID: "mitra-001",
    participantType: "MITRA_KERJA",
    displayFormat: "DRS. BAMBANG SUTRISNO, M.PD. ® KEPALA DINAS PENDIDIKAN",
    points: [
      {
        id: "point-002-003",
        sectionId: "section-002-002",
        content:
          "Menyampaikan bahwa Angka Partisipasi Sekolah (APS) meningkat 5% dibanding tahun sebelumnya.",
        order: 1,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-02-07T09:20:00"),
        updatedAt: new Date("2026-02-07T09:20:00"),
      },
      {
        id: "point-002-004",
        sectionId: "section-002-002",
        content:
          "Menjelaskan bahwa program beasiswa untuk anak kurang mampu telah menjangkau 1.500 siswa.",
        order: 2,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-02-07T09:25:00"),
        updatedAt: new Date("2026-02-07T09:25:00"),
      },
      {
        id: "point-002-005",
        sectionId: "section-002-002",
        content:
          "Menyampaikan kendala kekurangan guru di distrik terpencil dan meminta dukungan DPRD untuk penambahan formasi ASN.",
        order: 3,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-02-07T09:30:00"),
        updatedAt: new Date("2026-02-07T09:30:00"),
      },
    ],
    order: 2,
    isLocked: false,
    createdAt: new Date("2026-02-07T09:20:00"),
    updatedAt: new Date("2026-02-07T09:30:00"),
  },

  // ============================================================
  // MEETING 004 - RAPAT KOMISI III (COMPLETED)
  // ============================================================
  {
    id: "section-004-001",
    meetingID: "meeting-004",
    participanID: "anggota-019",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "RICHIE RICARDO TAFOR, SE ® KETUA KOMISI III",
    points: [
      {
        id: "point-004-001",
        sectionId: "section-004-001",
        content:
          "Membuka rapat dan menyampaikan agenda pembahasan evaluasi proyek infrastruktur.",
        order: 1,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:05:00"),
        updatedAt: new Date("2026-01-20T10:05:00"),
      },
      {
        id: "point-004-002",
        sectionId: "section-004-001",
        content:
          "Meminta penjelasan mengenai keterlambatan proyek jalan penghubung distrik Arso-Waris.",
        order: 2,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:10:00"),
        updatedAt: new Date("2026-01-20T10:10:00"),
      },
    ],
    order: 1,
    isLocked: true,
    lockedBy: "user-notulis-002",
    lockedAt: new Date("2026-01-20T14:00:00"),
    createdAt: new Date("2026-01-20T10:05:00"),
    updatedAt: new Date("2026-01-20T14:00:00"),
  },
  {
    id: "section-004-002",
    meetingID: "meeting-004",
    participanID: "anggota-020",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "HINDARTO EDI WIBOWO ® WAKIL KETUA KOMISI III",
    points: [
      {
        id: "point-004-003",
        sectionId: "section-004-002",
        content:
          "Menyoroti kondisi jembatan di wilayah Skouw yang sudah tidak layak dan membahayakan pengguna jalan.",
        order: 1,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:30:00"),
        updatedAt: new Date("2026-01-20T10:30:00"),
      },
      {
        id: "point-004-004",
        sectionId: "section-004-002",
        content:
          "Meminta Dinas PUPR segera melakukan kajian teknis untuk perbaikan jembatan tersebut.",
        order: 2,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:35:00"),
        updatedAt: new Date("2026-01-20T10:35:00"),
      },
    ],
    order: 2,
    isLocked: true,
    lockedBy: "user-notulis-002",
    lockedAt: new Date("2026-01-20T14:00:00"),
    createdAt: new Date("2026-01-20T10:30:00"),
    updatedAt: new Date("2026-01-20T14:00:00"),
  },

  // ============================================================
  // MEETING 008 - RAPAT BADAN KEHORMATAN (COMPLETED)
  // ============================================================
  {
    id: "section-008-001",
    meetingID: "meeting-008",
    participanID: "anggota-006",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "DRS. NATHAN BONAY, M.SI ® KETUA BADAN KEHORMATAN",
    points: [
      {
        id: "point-008-001",
        sectionId: "section-008-001",
        content:
          "Membuka rapat dan menyampaikan agenda evaluasi penegakan kode etik semester I tahun 2026.",
        order: 1,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-01-25T14:05:00"),
        updatedAt: new Date("2026-01-25T14:05:00"),
      },
      {
        id: "point-008-002",
        sectionId: "section-008-001",
        content:
          "Menyampaikan bahwa tidak ada laporan pengaduan pelanggaran kode etik yang masuk selama semester I.",
        order: 2,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-01-25T14:10:00"),
        updatedAt: new Date("2026-01-25T14:10:00"),
      },
      {
        id: "point-008-003",
        sectionId: "section-008-001",
        content:
          "Mengapresiasi kedisiplinan seluruh anggota dewan dalam mengikuti sidang-sidang.",
        order: 3,
        createdBy: "user-notulis-001",
        createdAt: new Date("2026-01-25T14:15:00"),
        updatedAt: new Date("2026-01-25T14:15:00"),
      },
    ],
    order: 1,
    isLocked: true,
    lockedBy: "user-notulis-001",
    lockedAt: new Date("2026-01-25T16:00:00"),
    createdAt: new Date("2026-01-25T14:05:00"),
    updatedAt: new Date("2026-01-25T16:00:00"),
  },
];

/**
 * Mock Meeting Minutes - Risalah Rapat (Kesimpulan & Dokumentasi)
 */
export const mockMeetingMinutes: MeetingMinutes[] = [
  // Meeting 001 - Paripurna LKPJ (Completed with full data)
  {
    id: "minutes-001",
    meetingId: "meeting-001",
    kesimpulan:
      "Rapat Paripurna telah mendengarkan penyampaian LKPJ Bupati Keerom Tahun Anggaran 2025. DPRD akan melakukan pembahasan lebih lanjut melalui Komisi-Komisi terkait dan menyusun rekomendasi yang akan disampaikan pada Rapat Paripurna Penyampaian Rekomendasi LKPJ.",
    catatan:
      "Rapat berjalan dengan lancar dan kondusif. Seluruh fraksi memberikan pandangan umum terhadap LKPJ yang disampaikan.",
    decisions: [
      "DPRD menerima penyampaian LKPJ Bupati Keerom Tahun Anggaran 2025.",
      "Pembahasan lanjutan akan dilakukan oleh masing-masing Komisi sesuai bidang tugasnya.",
      "Badan Musyawarah akan menjadwalkan Rapat Paripurna Penyampaian Rekomendasi dalam waktu 30 hari kerja.",
    ],
    dokumentasi: [
      "/dokumentasi/meeting-001/foto-1.jpg",
      "/dokumentasi/meeting-001/foto-2.jpg",
      "/dokumentasi/meeting-001/foto-3.jpg",
    ],
    lampiranAbsensi: {
      anggotaDewan: "/lampiran/meeting-001/absensi-anggota.pdf",
      mitraKerja: "/lampiran/meeting-001/absensi-mitra.pdf",
    },
    pdfUrl: "/notulen/meeting-001/risalah-rapat.pdf",
    isSigned: true,
    signedAt: new Date("2026-02-03T10:00:00"),
    signedBy: "sekwan-001",
    signatureUrl: "/signatures/sekwan-doris.png",
    createdAt: new Date("2026-02-01T12:30:00"),
    updatedAt: new Date("2026-02-03T10:00:00"),
  },
  // Meeting 004 - Komisi III (Completed)
  {
    id: "minutes-004",
    meetingId: "meeting-004",
    kesimpulan:
      "Rapat Kerja Komisi III dengan Dinas PUPR telah membahas evaluasi proyek infrastruktur tahun 2025. Terdapat beberapa proyek yang mengalami keterlambatan dan perlu mendapat perhatian khusus pada tahun anggaran berikutnya.",
    catatan:
      "Dinas PUPR diminta untuk menyampaikan laporan progress proyek secara berkala kepada Komisi III.",
    decisions: [
      "Dinas PUPR segera melakukan percepatan proyek jalan Arso-Waris.",
      "Kajian teknis jembatan Skouw harus selesai dalam waktu 2 minggu.",
      "Laporan progress proyek disampaikan setiap bulan kepada Komisi III.",
    ],
    dokumentasi: [
      "/dokumentasi/meeting-004/foto-1.jpg",
      "/dokumentasi/meeting-004/foto-2.jpg",
    ],
    lampiranAbsensi: {
      anggotaDewan: "/lampiran/meeting-004/absensi-anggota.pdf",
    },
    pdfUrl: "/notulen/meeting-004/risalah-rapat.pdf",
    isSigned: true,
    signedAt: new Date("2026-01-22T09:00:00"),
    signedBy: "sekwan-001",
    signatureUrl: "/signatures/sekwan-doris.png",
    createdAt: new Date("2026-01-20T14:00:00"),
    updatedAt: new Date("2026-01-22T09:00:00"),
  },
  // Meeting 008 - BK (Completed)
  {
    id: "minutes-008",
    meetingId: "meeting-008",
    kesimpulan:
      "Evaluasi penegakan kode etik semester I tahun 2026 menunjukkan hasil yang positif. Tidak ada laporan pelanggaran kode etik yang masuk. Tingkat kehadiran anggota dewan dalam sidang-sidang mencapai 95%.",
    decisions: [
      "Badan Kehormatan mengapresiasi kedisiplinan seluruh anggota dewan.",
      "Mekanisme pengaduan masyarakat akan disosialisasikan lebih luas.",
    ],
    dokumentasi: ["/dokumentasi/meeting-008/foto-1.jpg"],
    isSigned: true,
    signedAt: new Date("2026-01-27T10:00:00"),
    signedBy: "sekwan-001",
    createdAt: new Date("2026-01-25T16:00:00"),
    updatedAt: new Date("2026-01-27T10:00:00"),
  },
  // Meeting 002 - Komisi I (Live - belum selesai)
  {
    id: "minutes-002",
    meetingId: "meeting-002",
    dokumentasi: [],
    isSigned: false,
    createdAt: new Date("2026-02-07T09:00:00"),
    updatedAt: new Date("2026-02-07T09:00:00"),
  },
];

/**
 * Helper function untuk mendapatkan notulen sections berdasarkan meeting ID
 */
export const getNotulenSectionsByMeetingId = (
  meetingId: string,
): NotulenSection[] => {
  return mockNotulenSections.filter(
    (section) => section.meetingID === meetingId,
  );
};

/**
 * Helper function untuk mendapatkan meeting minutes berdasarkan meeting ID
 */
export const getMeetingMinutesByMeetingId = (
  meetingId: string,
): MeetingMinutes | undefined => {
  return mockMeetingMinutes.find((minutes) => minutes.meetingId === meetingId);
};
