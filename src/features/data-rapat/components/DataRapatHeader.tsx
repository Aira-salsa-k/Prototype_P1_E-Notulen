"use client";

import { AppButton } from "@/components/ui/button/AppButton";
import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";
import { PlusIcon } from "@heroicons/react/24/outline";
interface DataRapatHeaderProps {
  onAdd: () => void;
  stats?: {
    total: number;
    scheduled: number;
    completed: number;
    live?: number;
  };
}

export function DataRapatHeader({ onAdd, stats }: DataRapatHeaderProps) {
  const { currentUser } = useAuthStore();
  const isAdminLike = checkIsAdminLike(currentUser);
  const canCreate = isAdminLike || currentUser?.role === "NOTULIS";

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Data Jadwal Rapat
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="text-gray-600 font-medium">
              Total {stats?.total || 0} Rapat
            </span>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-red-50/50 border border-red-100">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-700 font-medium">
                {stats?.live || 0} Live
              </span>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-blue-50/50 border border-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-blue-700 font-medium">
                {stats?.scheduled || 0} Terjadwal
              </span>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-50/50 border border-green-100">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 " />
              <span className="text-green-700 font-medium">
                {stats?.completed || 0} Selesai
              </span>
            </div>
          </div>
        </div>

        {canCreate && (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <AppButton
              color="kuning"
              className="font-semibold w-full sm:w-auto shadow-sm"
              startContent={<PlusIcon className="h-4 w-4" />}
              onPress={onAdd}
            >
              Buat Jadwal Baru
            </AppButton>
          </div>
        )}
      </div>

      {/* Decorative Line */}
      <div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-200 to-transparent" />
    </div>
  );
}
