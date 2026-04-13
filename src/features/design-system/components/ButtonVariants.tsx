import React, { useState } from "react";
import { AppButton } from "@/components/ui/button/AppButton";
import { Card, CardBody } from "@heroui/card";
import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

function VariantPreview({
  name,
  code,
  component,
  description,
}: {
  name: string;
  code: string;
  component: React.ReactNode;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm border border-gray-100 bg-white group h-full">
      <CardBody className="p-6 flex flex-col items-center">
        <div className="h-16 flex items-center justify-center transform scale-100 hover:scale-110 transition-transform duration-200">
          {component}
        </div>
        <div className="text-center w-full mt-4">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <p className="font-bold text-gray-900 text-sm">{name}</p>
            {copied ? (
              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <button onClick={handleCopy}>
                <ClipboardIcon className="w-4 h-4 text-gray-300 hover:text-indigo-500 transition-colors" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-gray-500 mb-3 h-8 line-clamp-2">
            {description}
          </p>

          <div
            className="bg-gray-50 rounded p-2 relative group/code cursor-pointer transition-colors hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100"
            onClick={handleCopy}
          >
            <code className="text-[10px] text-indigo-700 font-mono block truncate">
              {code}
            </code>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/code:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {copied ? "Berhasil Disalin!" : "Klik untuk Salin Kode"}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export const ButtonVariants = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        4. Buttons (AppButton Variants)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VariantPreview
          name="Ungu (Primary)"
          code="bg-indigo-900/89 text-indigo-50 hover:bg-indigo-800 hover:text-indigo-100 active:bg-indigo-900"
          component={<AppButton color="ungu">Simpan Data</AppButton>}
          description="Warna utama untuk aksi primary."
        />
        <VariantPreview
          name="Ungu Muda (Secondary)"
          code="bg-indigo-100 text-indigo-900 hover:bg-indigo-200/60 active:bg-indigo-200"
          component={<AppButton color="ungu-muda">Download Dokumen</AppButton>}
          description="Warna soft (Indigo-100). Cocok untuk tombol download atau aksi sekunder."
        />
        <VariantPreview
          name="Btn Batal (Ghost/Cancel)"
          code="text-indigo-800 hover:bg-indigo-200/30 active:bg-indigo-300/70"
          component={<AppButton color="btn-batal">Batalkan</AppButton>}
          description="Digunakan eksklusif untuk aksi batal/cancel."
        />
        <VariantPreview
          name="Kuning (Warning/Edit)"
          code="bg-amber-300/90 text-amber-800 hover:bg-amber-300/68 active:bg-amber-300/70"
          component={<AppButton color="kuning">Edit Data</AppButton>}
          description="Warna Amber-300 dengan opacity tinggi (90%) untuk edit."
        />
        <VariantPreview
          name="Merah (Danger/Delete)"
          code="bg-red-600/80 text-white hover:bg-red-700 active:bg-red-800"
          component={<AppButton color="merah">Hapus Permanen</AppButton>}
          description="Red-600 untuk aksi destruktif."
        />
        <VariantPreview
          name="Hijau (Live Button)"
          code="bg-lime-400/50 text-lime-900 active:bg-green-800 font-semibold"
          component={<AppButton color="hijau">Live Button</AppButton>}
          description="Lime-400 untuk aksi live button."
        />
      </div>
      <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
        <span className="font-bold">Note:</span> Varian seperti "hijau",
        "olive", dan "biru-muda" saat ini belum digunakan secara aktif di flow
        utama.
        <AppButton color="ungu" size="lg">
          Simpan Data
        </AppButton>
        <AppButton color="ungu" size="md">
          Simpan Data
        </AppButton>
        <AppButton color="ungu" size="sm">
          Simpan Data
        </AppButton>
        <AppButton color="ungu" size="xs">
          Simpan Data
        </AppButton>
      </div>
    </section>
  );
};
