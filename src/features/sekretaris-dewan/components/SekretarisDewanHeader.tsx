// app/components/anggota-dewan/AnggotaDewanHeader.tsx
import { AppButton } from "@/components/ui/button/AppButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnggotaStats } from "@/types/anggota-dewan";
import { SekretarisDewanStats } from "@/types/sekretaris-dewan";
interface SekretarisDewanHeaderProps {
  stats?: SekretarisDewanStats;
  onAdd?: () => void;
}

export default function SekretarisDewanHeader({
  stats,
  onAdd,
}: SekretarisDewanHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Data Sekretaris Dewan
          </h1>
          <div className="flex items-center gap-4 mt-2"></div>
        </div>

        <div className="flex items-center gap-3">
         
          <AppButton
            color="kuning"
            className="bg-amber-300/70 text-amber-800 font-semibold"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={onAdd}
          >
            Tambah Sekretaris Dewan
          </AppButton>
        </div>
      </div>

      {/* keknya ga perlu stats gpp */}
      {/* Stats Overview  */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-1">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sekretaris Dewan</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total  Sekretaris Dewan Aktif</p>
              <p className="text-2xl font-bold text-gray-600">{stats?.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Sekretaris Dewan Tidak Aktif
              </p>
              <p className="text-2xl font-bold text-gray-600">
                {stats?.inactive}
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
