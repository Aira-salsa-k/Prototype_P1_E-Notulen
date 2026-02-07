"use client";

import { AppButton } from "@/components/ui/button/AppButton";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";

interface MeetingTypeHeaderProps {
  onAdd?: () => void;
  onToggleFilter?: () => void;
  isFilterOpen?: boolean;
  totalCategories?: number;
  totalVariants?: number;
}

export function MeetingTypeHeader({
  onAdd,
  onToggleFilter,
  isFilterOpen,
  totalCategories = 0,
  totalVariants = 0,
}: MeetingTypeHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Manajemen Data Anggota Rapat
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="text-gray-600 font-medium">
              Total {totalCategories} Kategori Utama
            </span>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-indigo-50/50 border border-indigo-100">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-indigo-700 font-medium">
                {totalVariants} Keseluruhan Jenis Rapat
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <AppButton
            variant="flat"
            color="ungu-muda"
            startContent={<FunnelIcon className="h-4 w-4" />}
            onPress={onToggleFilter}
            className={
              isFilterOpen
                ? "bg-indigo-100 text-indigo-700 border-indigo-200 w-full sm:w-auto"
                : "w-full sm:w-auto"
            }
          >
            {isFilterOpen ? "Tutup Filter" : "Filter"}
          </AppButton>

          {onAdd && (
            <AppButton
              color="kuning"
              className="font-semibold w-full sm:w-auto"
              startContent={<PlusIcon className="h-4 w-4" />}
              onPress={onAdd}
            >
              Tambah Jenis Rapat
            </AppButton>
          )}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-200 to-transparent" />
    </div>
  );
}
