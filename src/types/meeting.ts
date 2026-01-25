// import { MeetingCategory } from '@/types/meeting';
// app/types/meeting.ts

import { SemanticTone } from "./common";

// export interface MeetingCategory {
//   id: string; // pleno, komisi-1
//   name: string; // Pleno, Komisi I
//   color: SemanticTone;
// }

// export interface SubMeetingCategory {
//   id: string; // pleno, komisi-1
//   name: string; // Pleno, Komisi I
//   meetingCategoryID: string;
// }

// export interface Meeting {
//   id: string;
//   title: string;
//   meetingCategoryID: string; // ⬅️ Pleno / Komisi
//   subMeetingCategoryID?: string; // ⬅️ Sub jenis
//   agenda: string;
//   date: string;
//   time: string;
//   room: string;
//   status: "live" | "completed";
//   hasAccess: boolean;
// }

export interface Stats {
  totalMeetings: number;
  liveMeetings: number;
  completedMeetings: number;
  upcomingMeetings: number;
}

export interface MeetingResolved extends Meeting {
  meetingCategory: MeetingCategory | null;
  subMeetingCategory?: SubMeetingCategory | null;
}

///////////////deepseek

// app/types/meeting.ts

import { User } from "./user";
import { Sekwan } from "./sekretaris-dewan";
import { AttendanceRecord } from "./attendance";
import { NotulenPoint, MeetingMinutes } from "./notulen";
export interface Meeting {
  id: string;
  title: string;
  meetingCategoryID: string;
  subMeetingCategoryID?: string;
  agenda: string;
  // date: Date;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  status: "live" | "completed";
  hasAccess: boolean;
  accessControl: MeetingAccessControl;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // admin/notulis/user ID

  // Penandatangan dan Notulis
  sekretarisId: string; // ID user dengan role 'sekwan'
  notulisIds: string[]; // Array user ID dengan role 'notulis'

  // Daftar yang diundang (reference)
  invitedAnggotaDewanIds: string[];
  invitedMitraKerjaIds: string[];
  invitedTenagaAhliIds: string[];
}

export interface MeetingAccessControl {
  id: string;
  meetingId: string;
  isGlobalAccessOn: boolean;
  isNotulisAccessOn: boolean;
  isMeetingSpecificAccessOn: boolean;
  allowedAnggotaDewanIds: string[];
  allowedNotulisIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingCategory {
  id: string; // pleno, komisi-1
  name: string; // Pleno, Komisi I
  color: SemanticTone;
}

export interface SubMeetingCategory {
  id: string; // pleno, komisi-1
  name: string; // Pleno, Komisi I
  meetingCategoryID: string;
}

// Types for resolved/joined data
export interface MeetingResolved extends Omit<
  Meeting,
  "meetingCategoryID" | "subMeetingCategoryID"
> {
  meetingCategory: MeetingCategory | null;
  subMeetingCategory?: SubMeetingCategory | null;
  sekretaris: User | null;
  notulis: User[];
}

export interface MeetingStats {
  totalMeetings: number;
  liveMeetings: number;
  completedMeetings: number;
  draftMeetings: number;
  scheduledMeetings: number;
  cancelledMeetings: number;
}

export interface MeetingDetail extends Meeting {
  sekretaris: Sekwan;
  notulis: User[]; // array of user dengan role notulis
  attendance: AttendanceRecord[];
  notulenPoints: NotulenPoint[];
  notulen: MeetingMinutes | null;
  // attendanceSummary: {
  //   totalInvited: number;
  //   totalPresent: number;
  //   totalAbsent: number;
  //   terlambat: number;
  //   izin: number;
  // };
}
