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
export const mockMeetings: Meeting[] = [];

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
