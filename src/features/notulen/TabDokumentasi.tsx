"use client";

import { useRef } from "react";
import { Button } from "@heroui/button";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";

interface TabDokumentasiProps {
  isReadOnly?: boolean;
}

// Utility to convert file to base64 with resizing to save localStorage space
const processImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress as JPEG with 0.6 quality for aggressive space saving in localStorage
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        resolve(compressedBase64);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function TabDokumentasi({
  isReadOnly = false,
}: TabDokumentasiProps) {
  const { minutesData, actions } = useNotulenStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const anggotaDewanRef = useRef<HTMLInputElement>(null);
  const mitraKerjaRef = useRef<HTMLInputElement>(null);
  const tenagaAhliRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (isReadOnly) return;
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      try {
        const base64 = await processImage(files[i]);
        actions.addDocumentation(base64);
      } catch (err) {
        console.error("Failed to upload image:", err);
      }
    }
    // Reset input
    e.target.value = "";
  };

  const handleAbsensiClick = (
    type: "anggotaDewan" | "mitraKerja" | "tenagaAhli",
  ) => {
    if (isReadOnly) return;
    if (type === "anggotaDewan") anggotaDewanRef.current?.click();
    if (type === "mitraKerja") mitraKerjaRef.current?.click();
    if (type === "tenagaAhli") tenagaAhliRef.current?.click();
  };

  const onAbsensiChange = async (
    type: "anggotaDewan" | "mitraKerja" | "tenagaAhli",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await processImage(file);
      actions.updateLampiranAbsensi(type, base64);
    } catch (err) {
      console.error("Failed to upload scan:", err);
    }
    // Reset input
    e.target.value = "";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={onFileChange}
      />
      <input
        type="file"
        ref={anggotaDewanRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => onAbsensiChange("anggotaDewan", e)}
      />
      <input
        type="file"
        ref={mitraKerjaRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => onAbsensiChange("mitraKerja", e)}
      />
      <input
        type="file"
        ref={tenagaAhliRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => onAbsensiChange("tenagaAhli", e)}
      />

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Dokumentasi Kegiatan
          </h3>
          <p className="text-gray-500 text-sm">
            Upload foto kegiatan rapat untuk lampiran notulensi.
          </p>
        </div>
        {!isReadOnly && (
          <Button
            color="primary"
            startContent={<PhotoIcon className="w-5 h-5" />}
            onPress={handleUploadClick}
          >
            Upload Foto
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {minutesData?.dokumentasi.map((url, idx) => (
          <div
            key={idx}
            className="relative group border rounded-xl overflow-hidden aspect-video bg-gray-100"
          >
            <img
              src={url}
              alt={`Dokumentasi ${idx}`}
              className="w-full h-full object-cover"
            />
            {!isReadOnly && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Button
                  isIconOnly
                  color="danger"
                  variant="flat"
                  onPress={() => actions.removeDocumentation(url)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </Button>
              </div>
            )}
          </div>
        ))}

        {(!minutesData?.dokumentasi ||
          minutesData.dokumentasi.length === 0) && (
          <div className="col-span-full py-12 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400">
            <PhotoIcon className="w-12 h-12 mb-2" />
            <p>Belum ada dokumentasi diupload.</p>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Lampiran Absensi
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Upload file scan daftar hadir (Absensi) untuk masing-masing kategori.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Anggota Dewan */}
          <div className="space-y-3">
            <p className="font-semibold text-sm text-gray-700">Anggota Dewan</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-0 flex flex-col items-center justify-center min-h-[300px] aspect-[3/4] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.anggotaDewan ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.anggotaDewan}
                    alt="Absen Dewan"
                    className="w-full h-full object-cover object-top"
                  />
                  {!isReadOnly && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() =>
                          actions.updateLampiranAbsensi("anggotaDewan", "")
                        }
                      >
                        Hapus
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <Button
                    size="sm"
                    variant="flat"
                    isDisabled={isReadOnly}
                    onPress={() => handleAbsensiClick("anggotaDewan")}
                  >
                    Upload Scan
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* 2. Mitra Kerja */}
          <div className="space-y-3">
            <p className="font-semibold text-sm text-gray-700">Mitra Kerja</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-0 flex flex-col items-center justify-center min-h-[300px] aspect-[3/4] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.mitraKerja ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.mitraKerja}
                    alt="Absen Mitra"
                    className="w-full h-full object-cover object-top"
                  />
                  {!isReadOnly && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() =>
                          actions.updateLampiranAbsensi("mitraKerja", "")
                        }
                      >
                        Hapus
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <Button
                    size="sm"
                    variant="flat"
                    isDisabled={isReadOnly}
                    onPress={() => handleAbsensiClick("mitraKerja")}
                  >
                    Upload Scan
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* 3. Tenaga Ahli */}
          <div className="space-y-3">
            <p className="font-semibold text-sm text-gray-700">Tenaga Ahli</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-0 flex flex-col items-center justify-center min-h-[300px] aspect-[3/4] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.tenagaAhli ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.tenagaAhli}
                    alt="Absen TA"
                    className="w-full h-full object-cover object-top"
                  />
                  {!isReadOnly && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() =>
                          actions.updateLampiranAbsensi("tenagaAhli", "")
                        }
                      >
                        Hapus
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <Button
                    size="sm"
                    variant="flat"
                    isDisabled={isReadOnly}
                    onPress={() => handleAbsensiClick("tenagaAhli")}
                  >
                    Upload Scan
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
