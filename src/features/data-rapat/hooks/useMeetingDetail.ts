import { useState, useEffect } from "react";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { useAttendance } from "@/features/notulen/hooks/useAttendance";
import { mockUsers } from "@/mocks/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { Meeting } from "@/types/meeting";

export function useMeetingDetail(meetingId: string, role: string) {
  const { meetings, actions: meetingActions } = useDataRapatStore();
  const { categories, variants } = useJenisRapatStore();
  const { users: allNotulisUsers } = useNotulisStore();
  const { actions: notulenActions } = useNotulenStore();

  const [meeting, setMeeting] = useState<Meeting | null>(null);

  // Also incude useAttendance here as it depends on meeting
  const { records: participants } = useAttendance(meeting || ({} as Meeting));

  // Initialize Notulen
  useEffect(() => {
    if (meetingId) {
      notulenActions.initializeMeeting(meetingId);
    }
  }, [meetingId, notulenActions]);

  // Find Meeting & Auto-set Pimpinan
  useEffect(() => {
    const found = meetings.find((m) => m.id === meetingId);
    if (found) {
      setMeeting(found);

      if (
        role !== "anggota_dewan" &&
        !found.pimpinanRapatId &&
        found.invitedAnggotaDewanIds &&
        found.invitedAnggotaDewanIds.length > 0
      ) {
        meetingActions.updateMeeting(found.id, {
          pimpinanRapatId: found.invitedAnggotaDewanIds[0],
        });
      }
    }
  }, [meetingId, meetings, role, meetingActions]);

  // Derived Data
  const variant = variants.find((v) => v.id === meeting?.subMeetingCategoryID);
  const category = categories.find((c) => c.id === meeting?.meetingCategoryID);

  const sekwanProfile = generateMockSekretarisDewan().find(
    (s) => s.id === meeting?.sekretarisId,
  );
  const sekwanUser = mockUsers.find((u) => u.id === sekwanProfile?.userId);

  const notulisUsers =
    meeting?.notulisIds
      ?.map((id) => allNotulisUsers.find((u) => u.id === id))
      .filter(Boolean) || [];

  return {
    meeting,
    participants,
    relations: {
      category,
      variant,
      sekwanUser,
      sekwanProfile,
      notulisUsers,
    },
  };
}
