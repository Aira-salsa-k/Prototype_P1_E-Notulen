"use client";

import { AppButton } from "@/components/ui/button/AppButton";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";

interface NotulisHeaderProps {
  onAdd?: () => void;
  onToggleFilter?: () => void;
  isFilterOpen?: boolean;
}

export default function NotulisHeader({
  onAdd,
  onToggleFilter,
  isFilterOpen,
}: NotulisHeaderProps) {
  const { currentUser } = useAuthStore();
  const isAdminLike = checkIsAdminLike(currentUser);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Notulis</h1>
          <p className="text-gray-500 mt-1">Kelola data dan akun notulis.</p>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            variant="flat"
            color="ungu-muda"
            startContent={<FunnelIcon className="h-4 w-4" />}
            onPress={onToggleFilter}
            className={
              isFilterOpen
                ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                : ""
            }
          >
            {isFilterOpen ? "Tutup Filter" : "Filter"}
          </AppButton>

          {isAdminLike && (
            <AppButton
              color="kuning"
              className="font-semibold"
              startContent={<PlusIcon className="h-4 w-4" />}
              onPress={onAdd}
            >
              Tambah Notulis Baru
            </AppButton>
          )}
        </div>
      </div>
    </div>
  );
}
