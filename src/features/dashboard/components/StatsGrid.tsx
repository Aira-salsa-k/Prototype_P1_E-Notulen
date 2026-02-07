"use client";

import { Card, CardBody } from "@heroui/card";
import { useMemo, useEffect } from "react";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { AnggotaDewan } from "@/types/anggota-dewan";

interface StatsCardProps {
  title: string;
  value: number;
  description?: string;
  color: "blue" | "green" | "red" | "yellow" | "purple";
}

function StatsCard({ title, value, description, color }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    red: "bg-red-300/20 border-red-200/50",
    yellow: "bg-yellow-50 border-yellow-100",
    purple: "bg-cyan-100/30 border-cyan-100",
  };

  return (
    <Card className={`border ${colorClasses[color]} shadow-sm`}>
      <CardBody className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
          <div className="text-md font-medium text-gray-600">{title}</div>
          {description && (
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { mockMeetings } from "@/mocks/meeting";
import { mockMeetingCategories } from "@/mocks/meeting-category";
import { mockMeetingTypeVariants } from "@/mocks/meeting-variants";

import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

export default function StatsGrid() {
  const {
    meetings,
    isInitialized: isDataInitialized,
    _hasHydrated: isDataHydrated,
    actions: dataActions,
  } = useDataRapatStore();
  const {
    isInitialized: isCategoriesInitialized,
    _hasHydrated: isCategoriesHydrated,
    actions: categoriesActions,
  } = useJenisRapatStore();
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
    if (isCategoriesHydrated && !isCategoriesInitialized) {
      categoriesActions.setCategories(mockMeetingCategories);
      categoriesActions.setVariants(mockMeetingTypeVariants);
      categoriesActions.markAsInitialized();
    }
  }, [
    isDataHydrated,
    isDataInitialized,
    dataActions,
    isCategoriesHydrated,
    isCategoriesInitialized,
    categoriesActions,
  ]);

  // Filter meetings based on role
  const relevantMeetings = meetings.filter((m) => {
    if (!currentUser) return false;
    if (checkIsAdminLike(currentUser)) return true;

    if (currentUser.role === "NOTULIS") {
      return m.notulisIds?.includes(currentUser.id);
    }

    if (currentUser.role === "SEKWAN") {
      const profiles = generateMockSekretarisDewan();
      const profile = profiles.find((p) => p.userId === currentUser.id);
      return m.sekretarisId === profile?.id;
    }

    if (currentUser.role === "ANGGOTA_DEWAN") {
      return (
        m.invitedAnggotaDewanIds?.includes(currentUser.id) ||
        (myAnggotaId && m.invitedAnggotaDewanIds?.includes(myAnggotaId))
      );
    }

    return false;
  });

  const total = relevantMeetings.length;
  const live = relevantMeetings.filter((m) => m.status === "live").length;
  const completed = relevantMeetings.filter(
    (m) => m.status === "completed",
  ).length;
  // const scheduled = relevantMeetings.filter(m => m.status === 'scheduled').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard title="Rapat Terdaftar" value={total} color="blue" />
      <StatsCard
        title="Rapat Live"
        value={live}
        color="red"
        description="Sedang berlangsung"
      />
      <StatsCard title="Rapat Selesai" value={completed} color="blue" />
    </div>
  );
}
