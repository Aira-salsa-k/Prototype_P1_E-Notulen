import { mockMeetingCategories } from './meeting-category';
import { mockSubMeetingCategories } from './meeting-sub-category';
import { mockUsers } from './user';
// app/mocks/meeting.ts
import { Meeting, MeetingAccessControl, MeetingResolved, MeetingDetail} from "../types";

export const mockMeetings: Meeting[] = [
  {
    id: "meeting-001",
    title: "RAPAT KOMISI I MEMBAHAS RANCANGAN PERDA TENTANG PENDIDIKAN",
    meetingCategoryID: "category-komisi-i",
    subMeetingCategoryID: "sub-category-2",
    agenda: "Pembahasan Raperda tentang Sistem Pendidikan Kabupaten Keerom Tahun 2024",
    date: "2024-03-15",
    startTime: "09:00",
    endTime: "12:00",
    room: "RUANG RAPAT KOMISI I - LANTAI 2",
    status: "completed",
    hasAccess: true,
    accessControl: {
      id: "access-001",
      meetingId: "meeting-001",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: ["anggota-001", "anggota-002", "anggota-004"],
      allowedNotulisIds: ["notulis-001", "notulis-002"],
      createdAt: new Date("2024-03-14"),
      updatedAt: new Date("2024-03-14"),
    },
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-15"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    notulisIds: ["notulis-001", "notulis-002"],
    invitedAnggotaDewanIds: ["anggota-001", "anggota-002", "anggota-004"],
    invitedMitraKerjaIds: ["mitra-001", "mitra-002"],
    invitedTenagaAhliIds: ["tenaga-ahli-001"],
  },

  {
    id: "meeting-002",
    title: "RAPAT KERJA PLENO DAN RAPAT KERJA BADAN MUSYAWARAH DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM",
    meetingCategoryID: "category-banggar",
    agenda: "Pembahasan Pagu Indikatif APBD Tahun 2025",
    date: "2024-03-18",
    startTime: "13:00",
    endTime: "17:00",
    room: "RUANG RAPAT UTAMA - LANTAI 1",
    status: "live",
    hasAccess: true,
    accessControl: {
      id: "access-002",
      meetingId: "meeting-002",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: true,
      allowedAnggotaDewanIds: ["anggota-002", "anggota-005"],
      allowedNotulisIds: ["notulis-001"],
      createdAt: new Date("2024-03-17"),
      updatedAt: new Date("2024-03-17"),
    },
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-17"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-002",
    notulisIds: ["notulis-001"],
    invitedAnggotaDewanIds: ["anggota-002", "anggota-005"],
    invitedMitraKerjaIds: ["mitra-003"],
    invitedTenagaAhliIds: ["tenaga-ahli-002"],
  },
  {
    id: "meeting-003",
    title: "RAPAT PLENO PARIPURNA KE-5",
    meetingCategoryID: "category-pleno",
    subMeetingCategoryID: "sub-category-1",
    agenda: "Pengambilan Keputusan atas Beberapa Raperda",
    date: "2024-03-20",
    startTime: "08:30",
    endTime: "15:00",
    room: "RUANG PARIPURNA - LANTAI 3",
    status: "live",
    hasAccess: true,
    accessControl: {
      id: "access-003",
      meetingId: "meeting-003",
      isGlobalAccessOn: true,
      isNotulisAccessOn: true,
      isMeetingSpecificAccessOn: false,
      allowedAnggotaDewanIds: ["anggota-001", "anggota-002", "anggota-003", "anggota-005"],
      allowedNotulisIds: ["notulis-001", "notulis-002"],
      createdAt: new Date("2024-03-19"),
      updatedAt: new Date("2024-03-19"),
    },
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-19"),
    createdBy: "user-admin-001",
    sekretarisId: "sekwan-001",
    notulisIds: ["notulis-001", "notulis-002"],
    invitedAnggotaDewanIds: ["anggota-001", "anggota-002", "anggota-003", "anggota-005"],
    invitedMitraKerjaIds: [],
    invitedTenagaAhliIds: [],
  },
];

export const mockMeetingResolved: MeetingResolved[] = mockMeetings.map(meeting => ({
  ...meeting,
  meetingCategory: mockMeetingCategories.find(c => c.id === meeting.meetingCategoryID) || null,
  subMeetingCategory: meeting.subMeetingCategoryID 
    ? mockSubMeetingCategories.find(s => s.id === meeting.subMeetingCategoryID) || null
    : null,
  sekretaris: mockUsers.find(u => u.id === "user-sekwan-001") || null,
  notulis: mockUsers.filter(u => meeting.notulisIds.includes(u.id)),
}));


// import { Meeting } from "@/types/meeting";

// export const MOCK_MEETINGS: Meeting[] = [
//   {
//     id: "1",
//     title:
//       "RAPAT PLENO BADAN MUSYAWARAH DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM",
//     type: "Pleno",
//     typeDetail: "Pembangunan Jalan",
//     description: "Rapat pembahasan anggaran untuk tahun 2025",
//     room: "Ruang Rapat Hotel Grand Mahkota Kota Jayapura",
//     date: "Jumat, 19 Desember 2025",
//     time: "09:00 - 12:00",
//     status: "live",
//     hasAccess: true,
//   },
//   {
//     id: "2",
//     title:
//       "RAPAT KERJA PLENO DAN RAPAT KERJA BADAN MUSYAWARAH DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM",
//     type: "Pleno",
//     description: "Rapat koordinasi antara pleno dan badan musyawarah",
//     room: "Ruang Rapat Utama DPRD",
//     date: "Senin, 22 Desember 2025",
//     time: "14:00 - 16:00",
//     status: "completed",
//     hasAccess: false,
//   },
//   {
//     id: "3",
//     title: "RAPAT KERJA KOMISI I DEWAN PERWAKILAN RAKYAT KABUPATEN KEEROM",
//     type: "Komisi I",
//     description: "Rapat koordinasi antara pleno dan badan musyawarah",
//     room: "Ruang Rapat Utama DPRD",
//     date: "Selasa, 22 Desember 2025",
//     time: "13:00 - 17:00",
//     status: "live",
//     hasAccess: true,
//   },
// ];
