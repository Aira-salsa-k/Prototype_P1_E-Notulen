import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  UserGroupIcon as UserGroupIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid,
  SparklesIcon as SparklesIconSolid,
} from "@heroicons/react/24/solid";
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
  akdOptions: { value: string; label: string }[];
  selectedAKD: string;
  onAKDChange: (akd: string) => void;
  isLoadingAKD: boolean;

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
  isLoadingAKD,
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
    <div className="bg-indigo-50/40 border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-indigo-900 flex items-center gap-2">
            
            2. Tambah Peserta Rapat
          </h3>
          <p className="text-sm text-indigo-700/80 mt-1 font-medium">
            Pilih peserta yang akan ditambahkan dalam daftar peserta rapat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {/* KOLOM 1: VIA AKD */}
        <div className="relative group overflow-hidden bg-white p-5 rounded-2xl border-2 border-transparent hover:border-indigo-400 shadow-sm transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserGroupIconSolid className="w-16 h-16 text-indigo-600 -mr-4 -mt-4" />
          </div>

          <div className="flex items-center gap-3 mb-9">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-900">
              <UserGroupIconSolid className="w-5 h-5" />
            </div>
            <span className="font-bold text-indigo-900">Pilih via AKD</span>
          </div>

          <div className="space-y-3 relative z-10">
            <Select
              label="Pilih Berdasarkan Kelompok AKD"
              className="w-full"
              placeholder="Pilih Komisi / Badan"
              variant="flat"
              labelPlacement="outside"
              selectedKeys={selectedAKD ? [selectedAKD] : []}
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;
                onAKDChange(val || "");
              }}
              classNames={{
                trigger:
                  "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100 min-h-[44px]",
                
              }}
            >
              {akdOptions.map((opt) => (
                <SelectItem key={opt.value} textValue={opt.label}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>

            {isLoadingAKD && (
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold px-3 py-2 bg-indigo-50 rounded-xl animate-pulse">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading Anggota...</span>
              </div>
            )}
          </div>
          <p className="text-[10.5px] text-indigo-400 mt-4 leading-relaxed italic">
            * Anggota AKD akan otomatis ditambahkan ke daftar utama.
          </p>
        </div>

        {/* KOLOM 2: CARI MANUAL ANGGOTA */}
        <div className="relative group overflow-hidden bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-300 shadow-sm transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <MagnifyingGlassIconSolid className="w-16 h-16 text-emerald-600 -mr-4 -mt-4" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <MagnifyingGlassIconSolid className="w-5 h-5" />
            </div>
            <span className="font-bold text-emerald-900">Cari Manual</span>
          </div>

          <div className="relative z-10">
            <Autocomplete
              label="Ketik Nama Anggota"
              labelPlacement="outside"
              placeholder="Cari nama..."
              variant="flat"
              className="w-full"
              onSelectionChange={(key: React.Key | null) => {
                if (key) onManualSelect(String(key));
              }}
              startContent={
                <MagnifyingGlassIconSolid className="w-4 h-4" />
              }
              classNames={{
                base: "w-full",
                popoverContent: "bg-white border-emerald-100",
              }}
            >
              {allMembers.map((item) => {
                const user = users.find((u) => u.id === item.userId);
                const name = user?.name || "Tanpa Nama";
                return (
                  <AutocompleteItem key={String(item.id)} textValue={name}>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">
                        {name}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {item.jabatan} ({item.fraksi})
                      </span>
                    </div>
                  </AutocompleteItem>
                );
              })}
            </Autocomplete>
          </div>
          <p className="text-[10.5px] text-emerald-500 mt-4 leading-relaxed italic">
            * Cari & pilih nama untuk registrasi langsung.
          </p>
        </div>

        {/* KOLOM 3: PILIH SEKWAN */}
        <div className="relative group overflow-hidden bg-white p-5 rounded-2xl border-2 border-transparent hover:border-amber-400 shadow-sm transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserIconSolid className="w-16 h-16 text-amber-500 -mr-4 -mt-4" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <UserIconSolid className="w-5 h-5" />
            </div>
            <span className="font-bold text-amber-900">Sekretaris Dewan</span>
          </div>

          <div className="relative z-10">
            <Controller
              name="defaultSekretarisId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  label="Pilih Sekwan"
                  placeholder="Cari Sekwan..."
                  labelPlacement="outside"
                  variant="flat"
                  className="w-full"
                  onSelectionChange={(key: React.Key | null) => {
                    const val = String(key || "");
                    field.onChange(val);
                    if (val) onSekwanSelect(val);
                  }}
                  selectedKey={field.value || null}
                  startContent={
                    <MagnifyingGlassIconSolid className="w-4 h-4" />
                  }
                  classNames={{
                    base: "w-full",
                    popoverContent: "bg-white border-amber-100",
                  }}
                >
                  {sekwans.map((sekwan) => {
                    const user = users.find((u) => u.id === sekwan.userId);
                    const name = user?.name || "Tanpa Nama";
                    return (
                      <AutocompleteItem key={sekwan.id} textValue={name}>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">
                            {name}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {sekwan.jabatan}
                          </span>
                        </div>
                      </AutocompleteItem>
                    );
                  })}
                </Autocomplete>
              )}
            />
          </div>
          <p className="text-[10.5px] text-amber-500 mt-4 leading-relaxed italic">
            * Pilih Sekwan jika masuk dalam peserta rapat.
          </p>
        </div>
      </div>
    </div>
  );
}
