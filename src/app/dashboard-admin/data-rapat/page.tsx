"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useDataRapatCRUD } from "@/features/data-rapat/hooks/useDataRapatCRUD";
import { DataRapatHeader } from "@/features/data-rapat/components/DataRapatHeader";
import { DataRapatFilter } from "@/features/data-rapat/components/DataRapatFilter";
import { DataRapatList } from "@/features/data-rapat/components/DataRapatList";
import { mockMeetings } from "@/mocks/meeting";
import { mockMeetingTypeVariants } from "@/mocks/meeting-variants";
import { mockMeetingCategories } from "@/mocks/meeting-category";
import { mockNotulis } from "@/mocks/notulis";
import { mockUsers } from "@/mocks/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { Meeting } from "@/types/meeting";
import { ClientOnly } from "@/components/utils/ClientOnly";
import { MeetingFormModal } from "@/features/data-rapat/components/MeetingFormModal";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";

export default function DataRapatPage() {
  const router = useRouter();
  const { meetings, isInitialized, _hasHydrated, actions } =
    useDataRapatStore();
  const { isLoading, addMeeting, updateMeeting, deleteMeeting } =
    useDataRapatCRUD();

  // Local State
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  const {
    variants,
    isInitialized: jenisRapatInitialized,
    _hasHydrated: jenisRapatHydrated,
    actions: jenisRapatActions,
  } = useJenisRapatStore();

  const {
    isInitialized: notulisInitialized,
    _hasHydrated: notulisHydrated,
    setNotulisList,
    setUsers: setNotulisUsers,
    markAsInitialized: markNotulisInit,
  } = useNotulisStore();

  const {
    isInitialized: sekwanInitialized,
    _hasHydrated: sekwanHydrated,
    setSekretarisDewan,
    setUsers: setSekwanUsers,
    markAsInitialized: markSekwanInit,
  } = useSekretarisDewanStore();

  // Initialize Jenis Rapat Data
  useEffect(() => {
    if (jenisRapatHydrated && !jenisRapatInitialized) {
      jenisRapatActions.setCategories(mockMeetingCategories);
      jenisRapatActions.setVariants(mockMeetingTypeVariants);
      jenisRapatActions.markAsInitialized();
    }
  }, [jenisRapatHydrated, jenisRapatInitialized, jenisRapatActions]);

  // Initialize Notulis Data
  useEffect(() => {
    if (notulisHydrated && !notulisInitialized) {
      setNotulisList(mockNotulis);
      setNotulisUsers(mockUsers);
      markNotulisInit();
    }
  }, [
    notulisHydrated,
    notulisInitialized,
    setNotulisList,
    setNotulisUsers,
    markNotulisInit,
  ]);

  // Initialize Sekwan Data
  useEffect(() => {
    if (sekwanHydrated && !sekwanInitialized) {
      setSekretarisDewan(generateMockSekretarisDewan());
      setSekwanUsers(mockUsers);
      markSekwanInit();
    }
  }, [
    sekwanHydrated,
    sekwanInitialized,
    setSekretarisDewan,
    setSekwanUsers,
    markSekwanInit,
  ]);

  // Initialize Data
  useEffect(() => {
    if (_hasHydrated) {
      if (!isInitialized) {
        actions.setMeetings(mockMeetings);
        actions.markAsInitialized();
      }
    }
  }, [_hasHydrated, isInitialized, actions, meetings]);

  // Auto-Sync scheduled meetings with latest variants
  useEffect(() => {
    if (!isInitialized || variants.length === 0) return;

    meetings.forEach((meeting) => {
      if (meeting.status === "scheduled") {
        const variant = variants.find(
          (v: any) => v.id === meeting.subMeetingCategoryID,
        );
        if (variant) {
          const currentIds = meeting.invitedAnggotaDewanIds || [];
          const templateIds = variant.members.map((m: any) => m.memberId);

          const isDifferent =
            currentIds.length !== templateIds.length ||
            currentIds.some((id, idx) => id !== templateIds[idx]);

          if (isDifferent) {
            // Update in a way that doesn't trigger immediate loop if possible,
            // though Zustand/React will handle it.
            actions.updateMeeting(meeting.id, {
              invitedAnggotaDewanIds: templateIds,
              updatedAt: new Date(),
            });
          }
        }
      }
    });
    // We intentionally only depend on variants and isInitialized for the auto-sync trigger
    // to avoid excessive re-runs when meetings update their fields normally.
  }, [isInitialized, variants, actions]);

  // Derived State
  const filteredMeetings = useMemo(() => {
    return meetings.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.dasarSurat &&
          m.dasarSurat.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [meetings, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: meetings.length,
      scheduled: meetings.filter((m) => m.status === "scheduled").length,
      live: meetings.filter((m) => m.status === "live").length,
      completed: meetings.filter((m) => m.status === "completed").length,
    };
  }, [meetings]);

  // Handlers
  const handleCreate = () => {
    setEditingMeeting(null);
    setIsModalOpen(true);
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    let success = false;
    if (editingMeeting) {
      success = await updateMeeting(editingMeeting.id, data);
    } else {
      success = await addMeeting({ ...data, status: "scheduled" });
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal rapat ini?")) {
      await deleteMeeting(id);
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

        <div className="min-h-[800px]">
          <DataRapatList
            meetings={filteredMeetings}
            onView={(m) => router.push(`/dashboard-admin/data-rapat/${m.id}`)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </ClientOnly>

      <MeetingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingMeeting}
        isLoading={isLoading}
      />
    </div>
  );
}
