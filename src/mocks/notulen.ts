// app/mocks/notulen.ts
import {
  NotulenSection,
  NotulenPoint,
  MeetingMinutes,
  NotulenProgress,
} from "@/types/notulen";

export const mockNotulenSections: NotulenSection[] = [
  {
    id: "section-001",
    meetingID: "meeting-001",
    participanID: "anggota-001",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "KANISIUS KANGO, S.Sos ® KETUA DPR KABUPATEN KEEROM",
    points: [
      {
        id: "point-001",
        sectionId: "section-001",
        content:
          "Membuka rapat dan menyampaikan bahwa rapat ini membahas Raperda tentang Sistem Pendidikan",
        order: 1,
        createdBy: "notulis-001",
        updatedBy: "notulis-001",
        createdAt: new Date("2024-03-15T09:05:00"),
        updatedAt: new Date("2024-03-15T09:05:00"),
      },
      {
        id: "point-002",
        sectionId: "section-001",
        content:
          "Menjelaskan pentingnya perda ini untuk meningkatkan kualitas pendidikan di Kabupaten Keerom",
        order: 2,
        createdBy: "notulis-001",
        updatedBy: "notulis-001",
        createdAt: new Date("2024-03-15T09:10:00"),
        updatedAt: new Date("2024-03-15T09:10:00"),
      },
      {
        id: "point-003",
        sectionId: "section-001",
        content:
          "Meminta kepada Dinas Pendidikan untuk mempresentasikan draft awal Raperda",
        order: 3,
        createdBy: "notulis-001",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:15:00"),
        updatedAt: new Date("2024-03-15T09:15:00"),
      },
    ],
    order: 1,
    isLocked: true,
    lockedBy: "notulis-001",
    lockedAt: new Date("2024-03-15T09:30:00"),
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T09:30:00"),
  },
  {
    id: "section-002",
    meetingID: "meeting-001",
    participanID: "mitra-001",
    participantType: "MITRA_KERJA",
    displayFormat: "Drs. BAMBANG SUTRISNO, M.Pd. ® KEPALA DINAS PENDIDIKAN",
    points: [
      {
        id: "point-004",
        sectionId: "section-002",
        content:
          "Mempresentasikan draft Raperda Sistem Pendidikan Kabupaten Keerom Tahun 2024",
        order: 1,
        createdBy: "notulis-002",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:20:00"),
        updatedAt: new Date("2024-03-15T09:20:00"),
      },
      {
        id: "point-005",
        sectionId: "section-002",
        content:
          "Menjelaskan 5 pilar utama dalam Raperda: akses pendidikan, kualitas guru, sarana prasarana, anggaran, dan monitoring",
        order: 2,
        createdBy: "notulis-001",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:25:00"),
        updatedAt: new Date("2024-03-15T09:25:00"),
      },
      {
        id: "point-006",
        sectionId: "section-002",
        content:
          "Menyampaikan bahwa anggaran yang dibutuhkan untuk implementasi sekitar Rp 45 miliar per tahun",
        order: 3,
        createdBy: "notulis-002",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:30:00"),
        updatedAt: new Date("2024-03-15T09:30:00"),
      },
    ],
    order: 2,
    isLocked: false,
    createdAt: new Date("2024-03-15T09:20:00"),
    updatedAt: new Date("2024-03-15T09:30:00"),
  },
  {
    id: "section-003",
    meetingID: "meeting-001",
    participanID: "anggota-002",
    participantType: "ANGGOTA_DEWAN",
    displayFormat: "IMAM SUJONO ® WAKIL KETUA I DPR KABUPATEN KEEROM",
    points: [
      {
        id: "point-007",
        sectionId: "section-003",
        content:
          "Menyampaikan apresiasi terhadap draft yang sudah disusun oleh Dinas Pendidikan",
        order: 1,
        createdBy: "notulis-001",
        updatedBy: "notulis-001",
        createdAt: new Date("2024-03-15T09:35:00"),
        updatedAt: new Date("2024-03-15T09:35:00"),
      },
      {
        id: "point-008",
        sectionId: "section-003",
        content:
          "Mengusulkan agar ada klausul tentang pendidikan inklusif untuk anak berkebutuhan khusus",
        order: 2,
        createdBy: "notulis-001",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:40:00"),
        updatedAt: new Date("2024-03-15T09:40:00"),
      },
      {
        id: "point-009",
        sectionId: "section-003",
        content:
          "Mempertanyakan mekanisme pengawasan penggunaan anggaran pendidikan",
        order: 3,
        createdBy: "notulis-002",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:45:00"),
        updatedAt: new Date("2024-03-15T09:45:00"),
      },
    ],
    order: 3,
    isLocked: false,
    createdAt: new Date("2024-03-15T09:35:00"),
    updatedAt: new Date("2024-03-15T09:45:00"),
  },
  {
    id: "section-004",
    meetingID: "meeting-001",
    participanID: "tenaga-ahli-001",
    participantType: "TENAGA_AHLI",
    displayFormat: "Prof. Dr. IR. SUTARNO, M.T. ® ANGGOTA TIM AHLI",
    points: [
      {
        id: "point-010",
        sectionId: "section-004",
        content:
          "Memberikan masukan tentang pentingnya standar minimum sarana pendidikan",
        order: 1,
        createdBy: "notulis-002",
        updatedBy: "notulis-002",
        createdAt: new Date("2024-03-15T09:50:00"),
        updatedAt: new Date("2024-03-15T09:50:00"),
      },
      {
        id: "point-011",
        sectionId: "section-004",
        content:
          "Mengusulkan pembentukan tim monitoring independen yang melibatkan akademisi",
        order: 2,
        createdBy: "notulis-001",
        updatedBy: "notulis-001",
        createdAt: new Date("2024-03-15T09:55:00"),
        updatedAt: new Date("2024-03-15T09:55:00"),
      },
    ],
    order: 4,
    isLocked: false,
    createdAt: new Date("2024-03-15T09:50:00"),
    updatedAt: new Date("2024-03-15T09:55:00"),
  },
];

export const mockMeetingMinutes: MeetingMinutes[] = [
  {
    id: "minutes-001",
    meetingId: "meeting-001",
    kesimpulan:
      "Raperda tentang Sistem Pendidikan Kabupaten Keerom Tahun 2024 secara substansi telah disetujui dengan beberapa catatan perbaikan. Dinas Pendidikan diminta merevisi draft dengan memasukkan klausul pendidikan inklusif dan mekanisme pengawasan anggaran yang lebih ketat. Raperda akan dibahas kembali dalam rapat lanjutan dua minggu mendatang.",
    catatan:
      "Anggota Dewan yang tidak hadir (Drs. Agus Priyanto) telah memberikan surat keterangan sakit. Notulensi telah diverifikasi oleh kedua notulis.",
    dokumentasi: [
      "/dokumentasi/meeting-001-1.jpg",
      "/dokumentasi/meeting-001-2.jpg",
      "/dokumentasi/meeting-001-3.jpg",
    ],
    pdfUrl: "/notulen/meeting-001-notulen.pdf",
    isSigned: true,
    signedAt: new Date("2024-03-15T14:00:00"),
    signedBy: "sekwan-001",
    signatureUrl: "/signatures/sekwan-001-notulen.png",
    createdAt: new Date("2024-03-15T12:00:00"),
    updatedAt: new Date("2024-03-15T14:00:00"),
  },
];

export const mockNotulenProgress: NotulenProgress = {
  totalSections: 4,
  completedSections: 1,
  lockedSections: 1,
  totalPoints: 11,
  lastUpdated: new Date("2024-03-15T09:55:00"),
};
