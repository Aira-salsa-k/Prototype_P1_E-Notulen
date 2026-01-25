// app/components/dashboard/LiveMeetings.tsx

import MeetingCard from "./MeetingCard";
import { mockMeetings } from "@/mocks/meeting";
import { MeetingResolved } from "@/types/meeting";
// import { resolveMeeting } from "@/lib/meeting/meetingResolver";
import { mockUsers } from "@/mocks/user";

import { resolveMeeting } from "@/lib/utils/meeting/meetingResolver";

export default function LiveMeetings() {
  const liveOnly = mockMeetings
    .filter((m) => m.status === "live")
    .map((meeting) => resolveMeeting(meeting, mockUsers));

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold  text-gray-900">
          Rapat yang Sedang Live
        </h2>
      </div>

      <div className="space-y-6">
        {liveOnly.length > 0 ? (
          liveOnly.map((meeting, index) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              defaultOpen={index === 0}
            />
          ))
        ) : (
          <div className="border-2 border-dashed border-gray-200  rounded-2xl  p-6 text-gray-500 text-center">
            Tidak ada rapat yang sedang berlangsung
          </div>
        )}
      </div>
    </div>
  );
}
