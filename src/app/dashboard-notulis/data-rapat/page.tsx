"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mockMeetings } from "@/mocks/meeting";
import { DataRapatHeader } from "@/features/data-rapat/components/DataRapatHeader";
import { DataRapatFilter } from "@/features/data-rapat/components/DataRapatFilter";
import { DataRapatList } from "@/features/data-rapat/components/DataRapatList";
import { MeetingFormModal } from "@/features/data-rapat/components/MeetingFormModal";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { Meeting } from "@/types/meeting";
import { useAuthStore } from "@/store/useAuthStore";
import { ClientOnly } from "@/components/utils/ClientOnly";

export default function DataRapatNotulisPage() {
  const router = useRouter();
  const { meetings, isInitialized, _hasHydrated, actions } = useMeetingStore();
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  // Initialize Data
  useEffect(() => {
    if (_hasHydrated) {
      if (!isInitialized) {
        actions.setMeetings(mockMeetings);
        actions.markAsInitialized();
      }
    }
  }, [_hasHydrated, isInitialized, actions, meetings]);

  // Filter meetings: Only show those assigned to this notulis OR created by them
  const myMeetings = useMemo(() => {
    return meetings.filter(
      (m) =>
        currentUser &&
        (m.notulisIds.includes(currentUser.id) ||
          m.createdBy === currentUser.id),
    );
  }, [meetings, currentUser]);

  const filteredMeetings = useMemo(() => {
    return myMeetings.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.agenda.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [myMeetings, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: myMeetings.length,
      scheduled: myMeetings.filter((m) => m.status === "scheduled").length,
      live: myMeetings.filter((m) => m.status === "live").length,
      completed: myMeetings.filter((m) => m.status === "completed").length,
    };
  }, [myMeetings]);

  const handleCreate = () => {
    setEditingMeeting(null);
    setIsModalOpen(true);
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingMeeting) {
      actions.updateMeeting(editingMeeting.id, data);
    } else {
      const newMeeting = {
        ...data,
        id: `meeting-${Date.now()}`,
        status: "scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: currentUser?.id,
      };
      actions.addMeeting(newMeeting);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal rapat ini?")) {
      actions.deleteMeeting(id);
    }
  };

  if (!_hasHydrated) return null;

  return (
    <div className="max-w-screen-4xl mx-auto px-4 py-1 relative">
      <DataRapatHeader onAdd={handleCreate} stats={stats} />

      <ClientOnly>
        <DataRapatFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={() => setSearchQuery("")}
        />

        <div className="min-h-[800px] mt-6">
          <DataRapatList
            meetings={filteredMeetings}
            onView={(m) => router.push(`/dashboard-notulis/data-rapat/${m.id}`)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </ClientOnly>

      {isModalOpen && (
        <MeetingFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingMeeting}
        />
      )}
    </div>
  );
}
