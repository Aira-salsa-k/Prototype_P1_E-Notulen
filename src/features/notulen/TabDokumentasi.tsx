"use client";

import { Button } from "@heroui/button";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";

interface TabDokumentasiProps {
  isReadOnly?: boolean;
}

export default function TabDokumentasi({
  isReadOnly = false,
}: TabDokumentasiProps) {
  const { minutesData, actions } = useNotulenStore();

  const handleUpload = () => {
    if (isReadOnly) return;
    // Mock File Upload (Cycle through mock photos)
    const mockPhotos = [
      "/foto_rapat/foto-1.jpeg",
      "/foto_rapat/foto-2.jpeg",
      "/foto_rapat/foto-3.jpeg",
      "/foto_rapat/foto-4.jpeg",
    ];

    // Add all mock photos at once for demo purposes, or can be sequential
    mockPhotos.forEach((url) => {
      // Prevent adding duplicates if already exists
      if (!minutesData?.dokumentasi.includes(url)) {
        actions.addDocumentation(url);
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
            onPress={handleUpload}
          >
            Upload Foto
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.anggotaDewan ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.anggotaDewan}
                    alt="Absen Dewan"
                    className="w-full h-full object-contain"
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
                    onPress={() =>
                      actions.updateLampiranAbsensi(
                        "anggotaDewan",
                        "/scan_absen/scan_absen_anggota_dewan.png",
                      )
                    }
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
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.mitraKerja ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.mitraKerja}
                    alt="Absen Mitra"
                    className="w-full h-full object-contain"
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
                    onPress={() =>
                      actions.updateLampiranAbsensi(
                        "mitraKerja",
                        "/scan_absen/scan_absen_anggota_dewan.png",
                      )
                    }
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
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 overflow-hidden relative group">
              {minutesData?.lampiranAbsensi?.tenagaAhli ? (
                <>
                  <img
                    src={minutesData.lampiranAbsensi.tenagaAhli}
                    alt="Absen TA"
                    className="w-full h-full object-contain"
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
                    onPress={() =>
                      actions.updateLampiranAbsensi(
                        "tenagaAhli",
                        "/scan_absen/scan_absen_anggota_dewan.png",
                      )
                    }
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
