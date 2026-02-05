// app/mocks/notulen.ts
import {
  NotulenSection,
  NotulenPoint,
  MeetingMinutes,
  NotulenProgress,
} from "@/types/notulen";

export const mockNotulenSections: NotulenSection[] = [
  // MEETING 001
  {
    id: "section-001",
    meetingID: "meeting-001",
    participanID: "user-anggota-001",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "KANISIUS KANGO, S.Sos ® KETUA DPR KABUPATEN KEEROM",
    points: [
      {
        id: "point-001",
        sectionId: "section-001",
        content:
          "Membuka rapat dan menyampaikan agenda utama penyampaian LKPJ Bupati Tahun 2023.",
        order: 1,
        createdBy: "user-notulis-001",
        updatedBy: "user-notulis-001",
        createdAt: new Date("2026-02-01T09:05:00"),
        updatedAt: new Date("2026-02-01T09:05:00"),
      },
      {
        id: "point-002",
        sectionId: "section-001",
        content:
          "Menekankan pentingnya transparansi dalam laporan pertanggungjawaban anggaran daerah.",
        order: 2,
        createdBy: "user-notulis-001",
        updatedBy: "user-notulis-001",
        createdAt: new Date("2026-02-01T09:10:00"),
        updatedAt: new Date("2026-02-01T09:10:00"),
      },
    ],
    order: 1,
    isLocked: true,
    lockedBy: "user-notulis-001",
    lockedAt: new Date("2026-02-01T09:30:00"),
    createdAt: new Date("2026-02-01T09:00:00"),
    updatedAt: new Date("2026-02-01T09:30:00"),
  },
  {
    id: "section-002",
    meetingID: "meeting-001",
    participanID: "mitra-001",
    participantType: "MITRA_KERJA",
    displayFormat: "Drs. BAMBANG SUTRISNO, M.Pd. ® DINAS PENDIDIKAN",
    points: [
      {
        id: "point-004",
        sectionId: "section-002",
        content:
          "Memaparkan capaian kinerja bidang pendidikan selama tahun anggaran 2023.",
        order: 1,
        createdBy: "user-notulis-002",
        updatedBy: "user-notulis-002",
        createdAt: new Date("2026-02-01T09:20:00"),
        updatedAt: new Date("2026-02-01T09:20:00"),
      },
      {
        id: "point-005",
        sectionId: "section-002",
        content:
          "Menjelaskan kendala teknis dalam pembangunan beberapa sekolah di wilayah terpencil.",
        order: 2,
        createdBy: "user-notulis-001",
        updatedBy: "user-notulis-002",
        createdAt: new Date("2026-02-01T09:25:00"),
        updatedAt: new Date("2026-02-01T09:25:00"),
      },
    ],
    order: 2,
    isLocked: true,
    createdAt: new Date("2026-02-01T09:20:00"),
    updatedAt: new Date("2026-02-01T09:30:00"),
  },

  // MEETING 005
  {
    id: "section-005-001",
    meetingID: "meeting-005",
    participanID: "user-anggota-005",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "LEONARDUS BAKOT ® ANGGOTA DPRK KEEROM",
    points: [
      {
        id: "point-005-001",
        sectionId: "section-005-001",
        content:
          "Mempertanyakan keterlambatan pengerjaan jembatan di Distrik Arso Timur.",
        order: 1,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:15:00"),
        updatedAt: new Date("2026-01-20T10:15:00"),
      },
      {
        id: "point-005-002",
        sectionId: "section-005-001",
        content:
          "Meminta rincian penggunaan anggaran untuk pemeliharaan jalan provinsi.",
        order: 2,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:20:00"),
        updatedAt: new Date("2026-01-20T10:20:00"),
      },
    ],
    order: 1,
    isLocked: true,
    createdAt: new Date("2026-01-20T10:10:00"),
    updatedAt: new Date("2026-01-20T10:30:00"),
  },
  {
    id: "section-005-002",
    meetingID: "meeting-005",
    participanID: "mitra-002",
    participantType: "MITRA_KERJA",
    displayFormat: "Ir. SUPARNO, M.T. ® DINAS PEKERJAAN UMUM",
    points: [
      {
        id: "point-005-003",
        sectionId: "section-005-002",
        content:
          "Menjelaskan bahwa keterlambatan disebabkan oleh faktor cuaca ekstrem selama bulan November-Desember.",
        order: 1,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:35:00"),
        updatedAt: new Date("2026-01-20T10:35:00"),
      },
      {
        id: "point-005-004",
        sectionId: "section-005-002",
        content:
          "Menyatakan komitmen untuk menyelesaikan proyek jembatan pada akhir kuartal pertama 2026.",
        order: 2,
        createdBy: "user-notulis-002",
        createdAt: new Date("2026-01-20T10:40:00"),
        updatedAt: new Date("2026-01-20T10:40:00"),
      },
    ],
    order: 2,
    isLocked: true,
    createdAt: new Date("2026-01-20T10:30:00"),
    updatedAt: new Date("2026-01-20T11:00:00"),
  },
];

export const mockMeetingMinutes: MeetingMinutes[] = [
  {
    id: "minutes-001",
    meetingId: "meeting-001",
    kesimpulan:
      "LKPJ Bupati Keerom Tahun 2023 secara umum diterima untuk dibahas lebih lanjut di tingkat komisi. Beberapa catatan teknis terkait bidang pendidikan dan kesehatan akan menjadi fokus pembahasan utama.",
    catatan: "Rapat berlangsung kondusif. Seluruh fraksi hadir lengkap.",
    decisions: [
      "Pembentukan Pansus LKPJ direncanakan pada sidang berikutnya.",
      "Jadwal kunjungan lapangan ditetapkan mulai tanggal 5 Februari 2026.",
    ],
    dokumentasi: [
      "/foto_rapat/foto-1.jpeg",
      "/foto_rapat/foto-2.jpeg",
      "/foto_rapat/foto-3.jpeg",
      "/foto_rapat/foto-4.jpeg",
    ],
    lampiranAbsensi: {
      anggotaDewan: "/scan_absen/scan_absen_anggota_dewan.png",
      mitraKerja: "/scan_absen/scan_absen_mitra_kerja.png",
      tenagaAhli: "/scan_absen/scan_absen_tenaga_ahli.png",
    },
    isSigned: true,
    signedAt: new Date("2026-02-01T14:00:00"),
    signedBy: "sekwan-001",
    signatureUrl: "/signatures/sekwan-001-notulen.png",
    createdAt: new Date("2026-02-01T12:00:00"),
    updatedAt: new Date("2026-02-01T14:00:00"),
  },
  {
    id: "minutes-005",
    meetingId: "meeting-005",
    kesimpulan:
      "Dinas PU diminta memberikan laporan tertulis mendalam terkait progres jembatan Arso Timur setiap minggu. Komisi III akan menjadwalkan inspeksi mendadak ke lokasi proyek.",
    catatan: "Kepala Dinas PU hadir membawa tim teknis lengkap.",
    decisions: [
      "Percepatan pengerjaan jembatan Arso Timur.",
      "Audit teknis untuk pemeliharaan jalan provinsi di wilayah selatan.",
    ],
    dokumentasi: ["/foto_rapat/foto-1.jpeg", "/foto_rapat/foto-3.jpeg"],
    lampiranAbsensi: {
      anggotaDewan: "/scan_absen/scan_absen_anggota_dewan.png",
      mitraKerja: "/scan_absen/scan_absen_mitra_kerja.png",
    },
    isSigned: true,
    signedAt: new Date("2026-01-20T16:00:00"),
    signedBy: "sekwan-001",
    createdAt: new Date("2026-01-20T14:00:00"),
    updatedAt: new Date("2026-01-20T16:00:00"),
  },
];

export const mockNotulenProgress: NotulenProgress = {
  totalSections: 4,
  completedSections: 4,
  lockedSections: 4,
  totalPoints: 12,
  lastUpdated: new Date("2026-02-01T11:00:00"),
};
