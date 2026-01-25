// app/components/anggota-dewan/AnggotaDewanHeader.tsx
import { AppButton } from "@/components/ui/button/AppButton";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { AnggotaStats } from "@/types/anggota-dewan";

interface AnggotaDewanHeaderProps {
  stats: AnggotaStats;
  onAdd?: () => void;
  onFilter?: () => void;
}

export default function AnggotaDewanHeader({
  stats,
  onAdd,
  onFilter,
}: AnggotaDewanHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Data Anggota Dewan
          </h1>
          <div className="flex items-center gap-4 mt-2"></div>
        </div>

        <div className="flex items-center gap-3">
          <AppButton
            // variant="bordered"
            color="ungu-muda"
            startContent={<FunnelIcon className="h-4 w-4" />}
            onPress={onFilter}
            className="hidden sm:flex"
          >
            Filter
          </AppButton>

          <AppButton
            color="kuning"
            className="bg-amber-300/70 text-amber-800 font-semibold"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={onAdd}
          >
            Tambah Anggota Dewan
          </AppButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-1">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Anggota Dewan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Anggota Dewan Aktif</p>
              <p className="text-2xl font-bold text-gray-600">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Aggota Dewan Tidak Aktif
              </p>
              <p className="text-2xl font-bold text-gray-600">
                {stats.inactive}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
