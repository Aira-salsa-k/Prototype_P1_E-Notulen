
// app/components/mitra-kerja/MitraKerjaHeader.tsx
import React from "react";
// Assuming these are Heroicons or similar
import {
  FunnelIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@heroui/input";
import { AppButton } from "@/components/ui/button/AppButton";
import { Badge } from "@heroui/badge";

interface MitraKerjaHeaderProps {
  totalInstitutions: number;
  activeInstitutions: number;
  onAdd: () => void;
  onFilter: () => void;
}

export default function MitraKerjaHeader({ 
  totalInstitutions, 
  activeInstitutions, 
  onAdd, 
  onFilter 
}: MitraKerjaHeaderProps) {
  return (
    <div className="mb-8">
      {/* Container Utama: 
          - Tetap 'col' sampai ukuran 'lg' agar tidak sesak.
          - 'lg:flex-row' baru sejajar di layar besar.
          - 'lg:items-end' memastikan search & button sejajar dengan base teks.
      */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        {/* Judul & Statistik */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight break-words">
            Data Mitra Kerja
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
            <span className="text-gray-600 font-medium">
              Total {totalInstitutions} Instansi
            </span>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-50/50 border border-green-100">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 font-medium">
                {activeInstitutions} Aktif
              </span>
            </div>
          </div>
        </div>

     
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-72 relative">
            <Input
              isClearable
              radius="lg"
              placeholder="Cari nama mitra kerja..."
              startContent={
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              }
              size="lg"
              className="w-full"
            
            />
          </div>

          <AppButton
            color="kuning"
            startContent={<PlusIcon className="h-4 w-4" />}
            onPress={onAdd}
            // Tombol jadi full width di mobile (di bawah sm),
            // lalu menyesuaikan konten di atas sm.
            className="w-full sm:w-auto shadow-sm"
          >
            Tambah Mitra Kerja
          </AppButton>
        </div>
      </div>

      {/* Garis Dekoratif Modern */}
      <div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-200 to-transparent" />
    </div>
  );
}