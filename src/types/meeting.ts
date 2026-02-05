import { SemanticTone } from "./common";

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
import { SekretarisDewanProfile } from "./sekretaris-dewan";
import { AttendanceRecord } from "./attendance";
import { NotulenSection, NotulenPoint, MeetingMinutes } from "./notulen";
export interface Meeting {
  id: string;
  title: string;
  meetingCategoryID: string;
  subMeetingCategoryID?: string;
  agenda: string;
  dasarSurat?: string; // e.g. "Surat Undangan No. 123"
  masaSidang?: string; // e.g. "Masa Sidang I Tahun 2024"
  // date: Date;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  status: "scheduled" | "live" | "completed";
  hasAccess: boolean;
  accessControl: MeetingAccessControl;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // admin/notulis/user ID

  // Penandatangan dan Notulis
  pimpinanRapatId?: string; // ID Anggota Dewan yang memimpin rapat
  sekretarisId: string; // ID user dengan role 'sekwan'
  notulisIds: string[]; // Array user ID dengan role 'notulis'

  // Daftar yang diundang (reference)
  invitedAnggotaDewanIds: string[];
  invitedMitraKerjaIds: string[];
  invitedTenagaAhliIds: string[];

  // Attendance
  attendanceRecords?: AttendanceRecord[];

  // Notulen Persistence
  notulenSections?: NotulenSection[];
  minutesData?: MeetingMinutes | null;

  // Lifecycle & Audits
  actualStartTime?: Date;
  actualEndTime?: Date;
  auditLogs?: MeetingAuditLog[];
}

export interface MeetingAuditLog {
  id: string;
  action: "CREATE" | "UPDATE" | "START" | "END" | "SNAPSHOT_ATTENDANCE";
  userId: string;
  userName: string;
  timestamp: Date;
  details?: string;
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

export interface MeetingTypeMemberConfig {
  memberId: string;
  name: string;
  jabatan: string;
  meetingRole?: string; // e.g. Ketua, Wakil, Anggota
  displayFormat: string; // The "Format Notulen" field
}

export interface MeetingCategory {
  id: string; // pleno, komisi-1
  name: string; // Pleno, Komisi I
  color: SemanticTone;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingTypeVariant {
  id: string;
  categoryId: string;
  subName?: string; // Optional: e.g. "Pembangunan", "LKPJ"
  defaultSekretarisId?: string; // Optional default sekwan
  members: MeetingTypeMemberConfig[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  sekretaris: SekretarisDewanProfile;
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
