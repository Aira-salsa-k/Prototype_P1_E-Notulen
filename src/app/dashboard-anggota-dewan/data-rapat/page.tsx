"use client";

import { useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DataRapatList } from "@/features/data-rapat/components/DataRapatList";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { useRouter } from "next/navigation";
import { DataRapatHeader } from "@/features/data-rapat/components/DataRapatHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { ClientOnly } from "@/components/utils/ClientOnly";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { AnggotaDewan } from "@/types/anggota-dewan";

export default function DataRapatAnggotaPage() {
  const router = useRouter();
  const { meetings, isInitialized, _hasHydrated, actions } = useMeetingStore();
  const { anggota: allAnggota } = useAnggotaStore();
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Resolve current user's Anggota ID
  const myAnggotaId = useMemo(() => {
    if (!currentUser) return null;
    const profile = allAnggota.find(
      (a: AnggotaDewan) => a.userId === currentUser.id,
    );
    return profile?.id || null;
  }, [currentUser, allAnggota]);

  // Filter: Meetings where I am invited (Check both User ID and Anggota ID)
  const myMeetings = meetings.filter(
    (m) =>
      currentUser &&
      m.invitedAnggotaDewanIds &&
      (m.invitedAnggotaDewanIds.includes(currentUser.id) ||
        (myAnggotaId && m.invitedAnggotaDewanIds.includes(myAnggotaId))),
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
          id="search-meeting-input"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          }
          placeholder="Cari agenda..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          variant="bordered"
        />
      </div>

      <ClientOnly>
        <DataRapatList
          meetings={filteredMeetings}
          onView={(m) =>
            router.push(`/dashboard-anggota-dewan/data-rapat/${m.id}`)
          }
        />
      </ClientOnly>

      {filteredMeetings.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          <p>Tidak ada agenda rapat untuk Anda saat ini.</p>
          <p className="text-xs mt-2">(ID Simulasi: {currentUser?.id})</p>
        </div>
      )}
    </div>
  );
}
