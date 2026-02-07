"use client";

// app/components/dashboard/LiveMeetings.tsx

import MeetingCard from "./MeetingCard";
import { mockUsers } from "@/mocks/user";
import { resolveMeeting } from "@/lib/utils/meeting/meetingResolver";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { useMemo, useEffect } from "react";
import { mockMeetings } from "@/mocks/meeting";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { AnggotaDewan } from "@/types/anggota-dewan";

import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

export default function LiveMeetings() {
  const {
    meetings,
    isInitialized: isDataInitialized,
    _hasHydrated: isDataHydrated,
    actions: dataActions,
  } = useDataRapatStore();
  const { anggota: allAnggota } = useAnggotaStore();
  const { currentUser } = useAuthStore();

  // Resolve current user's Anggota ID
  const myAnggotaId = useMemo(() => {
    if (!currentUser || currentUser.role !== "ANGGOTA_DEWAN") return null;
    const profile = allAnggota.find(
      (a: AnggotaDewan) => a.userId === currentUser.id,
    );
    return profile?.id || null;
  }, [currentUser, allAnggota]);

  // Initialization fallback
  useEffect(() => {
    if (isDataHydrated && !isDataInitialized) {
      dataActions.setMeetings(mockMeetings);
      dataActions.markAsInitialized();
    }
  }, [isDataHydrated, isDataInitialized, dataActions]);

  const liveOnly = meetings
    .filter((m) => {
      // 1. Must be LIVE
      if (m.status !== "live") return false;

      // 2. Permission Check
      if (!currentUser) return false;

      // Admin/Sekwan (Temporal) see ALL
      if (checkIsAdminLike(currentUser)) return true;

      // Notulis see ASSIGNED only
      if (currentUser.role === "NOTULIS") {
        return m.notulisIds?.includes(currentUser.id);
      }

      // Sekwan (Inactive) see ASSIGNED only
      if (currentUser.role === "SEKWAN") {
        const profiles = generateMockSekretarisDewan();
        const profile = profiles.find((p) => p.userId === currentUser.id);
        return m.sekretarisId === profile?.id;
      }

      // Anggota Dewan see INVITED only (check both User ID and Anggota ID)
      if (currentUser.role === "ANGGOTA_DEWAN") {
        return (
          m.invitedAnggotaDewanIds?.includes(currentUser.id) ||
          (myAnggotaId && m.invitedAnggotaDewanIds?.includes(myAnggotaId))
        );
      }

      return false;
    })
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
