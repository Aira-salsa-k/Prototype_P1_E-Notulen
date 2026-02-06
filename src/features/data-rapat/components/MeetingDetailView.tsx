"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";

// Hooks
import { useMeetingDetail } from "@/features/data-rapat/hooks/useMeetingDetail";
import { useMeetingActions } from "@/features/data-rapat/hooks/useMeetingActions";

// Components
import { MeetingHeader } from "./detail/MeetingHeader";
import { MeetingInfoCard } from "./detail/MeetingInfoCard";
import { MeetingTabs } from "./detail/MeetingTabs";
import { MeetingPreview } from "./detail/MeetingPreview";

interface MeetingDetailViewProps {
  meetingId: string;
  role: "admin" | "notulis" | "anggota_dewan" | "sekwan";
}

export function MeetingDetailView({ meetingId, role }: MeetingDetailViewProps) {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { actions: storeActions } = useDataRapatStore();

  const { meeting, participants, relations } = useMeetingDetail(
    meetingId,
    role,
  );
  const { startMeeting, finishMeeting } = useMeetingActions();

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <p>Memuat data rapat...</p>
      </div>
    );
  }

  // Calculate if the 5-hour countdown has finished
  const closingTime = meeting.closingStartedAt
    ? new Date(meeting.closingStartedAt).getTime() + 5 * 60 * 60 * 1000
    : null;
  const isTimeUp = closingTime ? new Date().getTime() > closingTime : false;

  const isReadOnly =
    role === "anggota_dewan" || meeting.status === "completed" || isTimeUp;
  const showPreview =
    role === "anggota_dewan" ||
    (role === "notulis" && (meeting.status === "completed" || isTimeUp));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <MeetingHeader
        meeting={meeting}
        currentUser={currentUser}
        onBack={() => router.back()}
        onStart={() => startMeeting(meeting, currentUser)}
        onFinish={() => finishMeeting(meeting, currentUser)}
      />

      <MeetingInfoCard
        meeting={meeting}
        relations={relations}
        isReadOnly={isReadOnly}
        onUpdatePimpinan={(id) =>
          storeActions.updateMeeting(meeting.id, { pimpinanRapatId: id })
        }
      />

      {showPreview ? (
        <MeetingPreview meeting={meeting} participants={participants} />
      ) : (
        <MeetingTabs meeting={meeting} isReadOnly={isReadOnly} />
      )}
    </div>
  );
}
