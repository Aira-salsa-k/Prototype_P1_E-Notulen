"use client";

import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardBody } from "@heroui/card";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import { useMemo, useEffect } from "react";
import { mockMeetingCategories } from "@/mocks/meeting-category";
import { mockMeetingTypeVariants } from "@/mocks/meeting-variants";
import { mockMeetings } from "@/mocks/meeting";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

export default function MeetingTypes() {
  const { currentUser } = useAuthStore();
  const {
    categories,
    isInitialized: isJenisInitialized,
    _hasHydrated: isJenisHydrated,
    actions: jenisActions,
  } = useJenisRapatStore();

  const {
    meetings,
    isInitialized: isDataInitialized,
    _hasHydrated: isDataHydrated,
    actions: dataActions,
  } = useDataRapatStore();

  // 1. SILENT INITIALIZATION
  // Ensure we have data even if user lands directly on dashboard
  useEffect(() => {
    if (isJenisHydrated && !isJenisInitialized) {
      jenisActions.setCategories(mockMeetingCategories);
      jenisActions.setVariants(mockMeetingTypeVariants);
      jenisActions.markAsInitialized();
    }
    if (isDataHydrated && !isDataInitialized) {
      dataActions.setMeetings(mockMeetings);
      dataActions.markAsInitialized();
    }
  }, [
    isJenisHydrated,
    isJenisInitialized,
    jenisActions,
    isDataHydrated,
    isDataInitialized,
    dataActions,
  ]);

  const activeCategories = useMemo(() => {
    return categories.filter((c) => c.isActive);
  }, [categories]);

  // 2. ROLE-BASED FILTERING (Adjusted with Mock)
  const filteredCategories = useMemo(() => {
    if (!currentUser) return [];

    // Admin/Sekwan see all active types
    if (checkIsAdminLike(currentUser)) return activeCategories;

    // Others see only types relevant to their meetings
    const userMeetingCategoryIds = new Set(
      meetings
        .filter((m) => {
          if (currentUser.role === "ANGGOTA_DEWAN") {
            return m.invitedAnggotaDewanIds?.includes(currentUser.id);
          }
          if (currentUser.role === "NOTULIS") {
            return m.notulisIds?.includes(currentUser.id);
          }
          if (currentUser.role === "SEKWAN") {
            const profiles = generateMockSekretarisDewan();
            const profile = profiles.find((p) => p.userId === currentUser.id);
            return m.sekretarisId === profile?.id;
          }
          return false;
        })
        .map((m) => m.meetingCategoryID),
    );

    return activeCategories.filter((c) => userMeetingCategoryIds.has(c.id));
  }, [activeCategories, currentUser, meetings]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Jenis Rapat Terdaftar
        </h2>
      </div>

      <Card className="border border-gray-200 shadow-sm mb-8">
        <CardBody className="p-6">
          <div className="flex flex-wrap gap-2 text-center items-center justify-center">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <MeetingTypeBadge
                  key={item.id}
                  categoryName={item.name}
                  color={item.color}
                  size="md"
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">
                Belum ada jenis rapat terdaftar.
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
