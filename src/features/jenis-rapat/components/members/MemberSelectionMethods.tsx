import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Tabs, Tab } from "@heroui/tabs";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { Controller, useFormContext } from "react-hook-form"; // Import controller
import { MeetingTypeVariant } from "@/types/meeting";
import { User } from "@/types/user";

interface MemberSelectionMethodsProps {
  akdOptions: string[];
  selectedAKD: string;
  onAKDChange: (akd: string) => void;
  onLoadAKDPreview: () => void;

  allMembers: any[];
  onManualSelect: (memberId: string) => void;

  sekwans: SekretarisDewanProfile[];
  onSekwanSelect: (sekwanId: string) => void;
  users: User[];
}

export function MemberSelectionMethods({
  akdOptions,
  selectedAKD,
  onAKDChange,
  onLoadAKDPreview,
  allMembers,
  onManualSelect,
  sekwans,
  onSekwanSelect,
  users,
}: MemberSelectionMethodsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<MeetingTypeVariant>();

  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
          3. Tambah Peserta Rapat
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Pilih metode penambahan peserta. Hasil seleksi akan masuk ke tabel
          preview di bawah sebelum ditambahkan ke daftar utama.
        </p>
      </div>

      <Tabs
        aria-label="Metode Tambah Peserta"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary font-medium",
        }}
      >
        {/* TAB 1: VIA AKD */}
        <Tab
          key="akd"
          title={
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>Pilih via AKD</span>
            </div>
          }
        >
          <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-2 items-end">
              <Select
                label="Pilih Kelompok AKD"
                className="max-w-xs"
                placeholder="Pilih Komisi / Badan"
                variant="bordered"
                labelPlacement="outside"
                selectedKeys={selectedAKD ? [selectedAKD] : []}
                onSelectionChange={(k) =>
                  onAKDChange(Array.from(k)[0] as string)
                }
              >
                {akdOptions.map((opt) => (
                  <SelectItem key={opt}>{opt}</SelectItem>
                ))}
              </Select>
              <Button
                color="primary"
                variant="flat"
                isDisabled={!selectedAKD}
                onPress={onLoadAKDPreview}
                startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
              >
                Tampilkan Anggota
              </Button>
            </div>
          </div>
        </Tab>

        {/* TAB 2: MANUAL & SEKWAN (GABUNGAN) */}
        <Tab
          key="manual-sekwan"
          title={
            <div className="flex items-center space-x-2">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Cari Manual & Sekwan</span>
            </div>
          }
        >
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
            {/* KOLOM KIRI: CARI MANUAL ANGGOTA */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold border-b pb-2 border-gray-200">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Cari Anggota Dewan</span>
              </div>
              <Autocomplete
                labelPlacement="outside"
                placeholder="Ketik nama anggota..."
                variant="bordered"
                className="bg-white"
                onSelectionChange={(key) => {
                  if (key) onManualSelect(key as string);
                }}
                startContent={
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                }
              >
                {allMembers.map((item) => {
                  const user = users.find((u) => u.id === item.userId);
                  const name = user?.name || "Tanpa Nama";
                  return (
                    <AutocompleteItem key={String(item.id)} textValue={name}>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-gray-500">
                          {item.jabatan} ({item.fraksi})
                        </span>
                      </div>
                    </AutocompleteItem>
                  );
                })}
              </Autocomplete>
              <p className="text-[10px] text-gray-400">
                * Klik nama untuk menambahkan ke preview.
              </p>
            </div>

            {/* KOLOM KANAN: PILIH SEKWAN */}
            <div className="space-y-2 p-4 bg-blue-50/50 rounded-xl border border-dashed border-blue-200">
              <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold border-b pb-2 border-blue-200">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Pilih Sekretaris Dewan</span>
              </div>
              <Controller
                name="defaultSekretarisId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    placeholder="Cari & Pilih Sekwan (Opsional)"
                    labelPlacement="outside"
                    variant="bordered"
                    className="bg-white"
                    onSelectionChange={(key) => {
                      const val = key as string;
                      field.onChange(val || "");
                      if (val) onSekwanSelect(val);
                    }}
                    selectedKey={field.value || null}
                    startContent={
                      <UserIcon className="w-4 h-4 text-gray-400" />
                    }
                  >
                    {sekwans.map((sekwan) => {
                      const user = users.find((u) => u.id === sekwan.userId);
                      const name = user?.name || "Tanpa Nama";
                      return (
                        <AutocompleteItem key={sekwan.id} textValue={name}>
                          <div className="flex flex-col">
                            <span className="font-medium">{name}</span>
                            <span className="text-xs text-gray-500">
                              {sekwan.jabatan}
                            </span>
                          </div>
                        </AutocompleteItem>
                      );
                    })}
                  </Autocomplete>
                )}
              />
              <p className="text-[10px] text-blue-400">
                * Memilih sekwan akan otomatis memasukkannya ke preview.
              </p>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
