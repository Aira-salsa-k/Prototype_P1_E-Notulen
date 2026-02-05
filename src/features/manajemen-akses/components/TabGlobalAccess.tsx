"use client";

import { Card, CardBody } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Chip } from "@heroui/chip";
import {
  LockClosedIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useAccessStore } from "../store/useAccessStore";
import { useUIStore } from "@/store/useUIStore";

export default function TabGlobalAccess() {
  const globalAccess = useAccessStore((state) => state.globalAccess);
  const toggleGlobalAccess = useAccessStore(
    (state) => state.toggleGlobalAccess,
  );
  const showNotification = useUIStore((state) => state.showNotification);

  const handleToggle = () => {
    toggleGlobalAccess();
    if (globalAccess) {
      showNotification(
        "warning",
        "Akses Global Sistem Dimatikan! Hanya Admin yang bisa login.",
      );
    } else {
      showNotification("success", "Akses Global Sistem Diaktifkan Kembali.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <Card
        className={`border-2 transition-colors ${globalAccess ? "border-success-100 bg-success-50/20" : "border-danger-100 bg-danger-50/20"}`}
      >
        <CardBody className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4 max-w-xl">
            <div
              className={`p-4 rounded-2xl ${globalAccess ? "bg-success-100 text-success-600" : "bg-danger-100 text-danger-600"}`}
            >
              {globalAccess ? (
                <GlobeAltIcon className="w-8 h-8" />
              ) : (
                <LockClosedIcon className="w-8 h-8" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {globalAccess
                  ? "Sistem Online [Publik]"
                  : "Mode Maintenance / Terkunci"}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {globalAccess
                  ? "Semua pengguna (Anggota Dewan, Notulis, Sekretaris) dapat mengakses sistem secara normal sesuai hak akses masing-masing."
                  : "Akses sistem dikunci secara global. Hanya Administrator yang dapat login dan mengakses dashboard. Pengguna lain akan diarahkan ke halaman maintenance."}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Switch
              size="lg"
              color={globalAccess ? "success" : "danger"}
              isSelected={globalAccess}
              onValueChange={handleToggle}
              classNames={{
                wrapper:
                  "group-data-[selected=true]:bg-success-500 group-data-[selected=false]:bg-danger-500",
                thumb:
                  "group-data-[selected=true]:bg-white group-data-[selected=false]:bg-white",
              }}
              startContent={<GlobeAltIcon />}
              endContent={<LockClosedIcon />}
            />
            <Chip
              variant="flat"
              color={globalAccess ? "success" : "danger"}
              className="font-bold uppercase tracking-wider"
            >
              {globalAccess ? "SYSTEM ACTIVE" : "SYSTEM LOCKED"}
            </Chip>
          </div>
        </CardBody>
      </Card>

      {!globalAccess && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg flex items-start gap-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 shrink-0" />
          <div>
            <h4 className="font-bold text-orange-800">
              Peringatan Mode Terkunci
            </h4>
            <p className="text-sm text-orange-700 mt-1">
              Saat mode ini aktif, Notulis yang sedang mengerjakan notulensi
              mungkin akan terputus koneksinya. Pastikan untuk menginformasikan
              tim sebelum mengaktifkan mode ini.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
