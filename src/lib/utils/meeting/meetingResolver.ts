import { mockSubMeetingCategories } from "../../../mocks";
import { mockMeetingCategories } from "../../../mocks";
// import { MOCK_MEETING_CATEGORIES } from "@/mocks/meeting-category";
import { Meeting, MeetingResolved } from "@/types/meeting";
import { User } from "@/types/user";

export function resolveMeeting(
  meeting: Meeting,
  users: User[],
): MeetingResolved {
  const meetingCategory =
    mockMeetingCategories.find((c) => c.id === meeting.meetingCategoryID) ??
    null;

  const subMeetingCategory =
    mockSubMeetingCategories.find(
      (s) => s.id === meeting.subMeetingCategoryID,
    ) ?? null;

  const sekretaris = users.find((u) => u.id === meeting.sekretarisId) ?? null;

  const notulis = users.filter((u) => meeting.notulisIds.includes(u.id));

  return {
    ...meeting,
    meetingCategory,
    subMeetingCategory,
    sekretaris,
    notulis,
  };
}
