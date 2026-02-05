"use client";

import { KopSuratForm } from "@/features/kop-surat/components/KopSuratForm";
import { KopSuratPreview } from "@/features/kop-surat/components/KopSuratPreview";

export default function KopSuratPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto px-4 py-1 relative">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Pengaturan Kop Surat
        </h1>
        <p className="text-gray-500 text-sm">
          Atur tampilan kop surat untuk dokumen cetak (Notulen, Daftar Hadir,
          dll).
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <KopSuratForm />
        </div>

        <div className="sticky top-6">
          <div className="mb-2 text-sm font-semibold text-gray-500">
            Preview Tampilan (A4)
          </div>
          <KopSuratPreview />
        </div>
      </div>
    </div>
  );
}
