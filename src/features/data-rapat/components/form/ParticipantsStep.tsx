"use client";

import { useMemo } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { MeetingFormData } from "../MeetingFormModal";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { mockUsers } from "@/mocks/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

interface ParticipantsStepProps {
  control: Control<MeetingFormData>;
  watch: UseFormWatch<MeetingFormData>;
}

export function ParticipantsStep({ control, watch }: ParticipantsStepProps) {
  const { variants } = useJenisRapatStore();

  const sekwans = useMemo(() => {
    const profiles = generateMockSekretarisDewan();
    return profiles.map((s) => {
      const user = mockUsers.find((u) => u.id === s.userId);
      return {
        id: s.id,
        name: user?.name || "Unknown",
        jabatan: s.jabatan,
      };
    });
  }, []);

  const notulisList = useMemo(() => {
    return mockUsers.filter(
      (u) =>
        (u.id.includes("notulis") || u.username.includes("notulis")) &&
        u.isActive,
    );
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in w-full h-full">
      {/* LEFT COLUMN: Config */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 sticky top-0">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-50">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <UserGroupIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-xl">Petugas Rapat</h3>
              <p className="text-sm text-gray-500">
                Tentukan sekwan dan notulis yang bertugas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Controller
              name="sekretarisId"
              control={control}
              rules={{ required: "Pilih Penanggung Jawab / Sekwan" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  label="Penanggung Jawab (Sekwan)"
                  placeholder="Cari nama Sekwan..."
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  defaultItems={sekwans}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  className="max-w-full"
                  inputProps={{
                    classNames: {
                      inputWrapper: "bg-white",
                    },
                  }}
                >
                  {(s: any) => (
                    <AutocompleteItem key={s.id} textValue={s.name}>
                      <div className="flex flex-col">
                        <span className="font-semibold text-base">
                          {s.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {s.jabatan}
                        </span>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />

            <Controller
              name="notulisIds"
              control={control}
              rules={{ required: "Pilih minimal satu notulis" }}
              render={({ field, fieldState }) => (
                <Select
                  selectionMode="multiple"
                  label="Notulis Bertugas"
                  placeholder="Pilih Notulis (Bisa lebih dari satu)"
                  variant="bordered"
                
                  size="lg"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  items={notulisList}
                  selectedKeys={new Set(field.value || [])}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys) as string[];
                    field.onChange(val);
                  }}
                  classNames={{
                    trigger: "bg-white",
                  }}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip
                            key={item.key}
                            size="md"
                            variant="flat"
                            color="secondary"
                            className="pl-2"
                          >
                            {item.textValue}
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(n: any) => (
                    <SelectItem key={n.id} textValue={n.name}>
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-base">{n.name}</span>
                        <span className="text-tiny text-gray-400">
                          Username: {n.username}
                        </span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview - LEGA / WIDE */}
      <div className="h-full">
        <Card className="bg-white border text-card-foreground shadow-sm h-full max-h-[700px]">
          <CardBody className="p-0 flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <UserGroupIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg uppercase tracking-tight">
                    Daftar Undangan
                  </h4>
                  <p className="text-xs text-gray-500">
                    Anggota dewan yang terafiliasi
                  </p>
                </div>
              </div>
              <Chip size="lg" color="primary" variant="shadow">
                {watch("invitedAnggotaDewanIds").length} Peserta
              </Chip>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
              {watch("invitedAnggotaDewanIds").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {watch("invitedAnggotaDewanIds").map((id, index) => {
                    const variant = variants.find(
                      (v) => v.id === watch("meetingVariantID"),
                    );
                    const member = variant?.members.find(
                      (m) => m.memberId === id,
                    );

                    return (
                      <div
                        key={id}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-sm font-bold shrink-0 transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-800 text-base truncate group-hover:text-blue-700">
                            {member?.name || id}
                          </div>
                          <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">
                            {member?.meetingRole || "Anggota"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center text-gray-400 italic">
                  <UserGroupIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-base font-semibold">Belum ada peserta.</p>
                  <p className="text-sm">
                    Pilih Kategori Rapat di Tahap 1 untuk memuat daftar.
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
