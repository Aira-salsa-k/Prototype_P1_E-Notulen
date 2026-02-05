"use client";

import { useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MeetingTable } from "@/features/data-rapat/components/MeetingTable";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { useRouter } from "next/navigation";
import { DataRapatHeader } from "@/features/data-rapat/components/DataRapatHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { mockMeetings } from "@/mocks/meeting";

import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

export default function DataRapatSekwanPage() {
  const router = useRouter();
  const { meetings, isInitialized, _hasHydrated, actions } = useMeetingStore();
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const sekwanProfile = useMemo(() => {
    if (!currentUser) return null;
    const profiles = generateMockSekretarisDewan();
    return profiles.find((p) => p.userId === currentUser.id);
  }, [currentUser]);

  // Initialize Data if not already done
  useEffect(() => {
    if (_hasHydrated && !isInitialized) {
      actions.setMeetings(mockMeetings);
      actions.markAsInitialized();
    }
  }, [_hasHydrated, isInitialized, actions]);

  // Filter: Meetings where I am the secretary (sekretarisId)
  const myMeetings = meetings.filter(
    (m) => sekwanProfile && m.sekretarisId === sekwanProfile.id,
  );

  const filteredMeetings = myMeetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.agenda.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = useMemo(() => {
    return {
      total: myMeetings.length,
      scheduled: myMeetings.filter((m) => m.status === "scheduled").length,
      live: myMeetings.filter((m) => m.status === "live").length,
      completed: myMeetings.filter((m) => m.status === "completed").length,
    };
  }, [myMeetings]);

  return (
    <div className="space-y-6">
      <DataRapatHeader onAdd={() => {}} stats={stats} />

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <Input
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          }
          placeholder="Cari agenda..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          variant="bordered"
        />
      </div>

      <MeetingTable
        meetings={filteredMeetings}
        role="sekwan"
        onView={(m) => router.push(`/dashboard-sekwan/data-rapat/${m.id}`)}
      />

      {filteredMeetings.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          <p>Tidak ada agenda rapat untuk Anda saat ini.</p>
          <p className="text-xs mt-2">(ID Simulasi: {currentUser?.id})</p>
        </div>
      )}
    </div>
  );
}
