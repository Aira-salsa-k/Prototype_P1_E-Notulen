"use client";

import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  DocumentTextIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { MeetingFormData } from "../MeetingFormModal";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";

interface MeetingInfoStepProps {
  control: Control<MeetingFormData>;
}

export function MeetingInfoStep({ control }: MeetingInfoStepProps) {
  const { categories, variants } = useJenisRapatStore();

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in w-full">
      {/* LEFT COLUMN: Main Info */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-50">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Detail Utama</h3>
              <p className="text-xs text-gray-400">Judul dan kategori rapat</p>
            </div>
          </div>

          <Controller
            name="title"
            control={control}
            rules={{ required: "Judul rapat wajib diisi" }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Judul Rapat"
                placeholder="Contoh: Rapat Paripurna I Masa Sidang I"
                variant="bordered"
                labelPlacement="outside"
                size="lg"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                classNames={{
                  inputWrapper: "bg-white",
                  label: "font-semibold text-gray-700",
                }}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="meetingVariantID"
              control={control}
              rules={{ required: "Jenis rapat wajib dipilih" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  label="Jenis / Kategori Rapat"
                  placeholder="Cari Jenis Rapat..."
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  defaultItems={variants}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  inputProps={{
                    classNames: {
                      inputWrapper: "bg-white",
                      label: "font-semibold text-gray-700",
                    },
                  }}
                >
                  {(variant: any) => {
                    const cat = categories.find(
                      (c) => c.id === variant.categoryId,
                    );
                    return (
                      <AutocompleteItem
                        key={variant.id}
                        textValue={`${variant.subName || cat?.name}`}
                      >
                        <div className="flex flex-col py-1">
                          <span className="font-bold text-base">
                            {variant.subName || cat?.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {cat?.name}
                          </span>
                        </div>
                      </AutocompleteItem>
                    );
                  }}
                </Autocomplete>
              )}
            />
            <Controller
              name="masaSidang"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Masa Sidang"
                  placeholder="Masa Sidang I Tahun 2024"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{
                    inputWrapper: "bg-white",
                    label: "font-semibold text-gray-700",
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-50">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <MapPinIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Lokasi & Referensi
              </h3>
              <p className="text-xs text-gray-400">
                Tempat dan dasar pelaksanaan
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="room"
              control={control}
              rules={{ required: "Lokasi wajib diisi" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  startContent={
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                  }
                  label="Lokasi / Ruangan"
                  placeholder="Nama Ruangan"
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  classNames={{
                    inputWrapper: "bg-white",
                    label: "font-semibold text-gray-700",
                  }}
                />
              )}
            />
            <Controller
              name="dasarSurat"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Dasar Surat"
                  placeholder="No. Surat Undangan..."
                  variant="bordered"
                  labelPlacement="outside"
                  size="lg"
                  classNames={{
                    inputWrapper: "bg-white",
                    label: "font-semibold text-gray-700",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Time & Agenda */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-50">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <CalendarDaysIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Waktu Pelaksanaan
              </h3>
              <p className="text-xs text-gray-400">Jadwal tanggal dan jam</p>
            </div>
          </div>

          <Controller
            name="date"
            control={control}
            rules={{ required: "Tanggal wajib diisi" }}
            render={({ field }) => (
              <DatePicker
                label="Tanggal"
                variant="bordered"
                labelPlacement="outside"
                value={field.value}
                onChange={field.onChange}
                className="bg-white"
                size="lg"
              />
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Jam mulai wajib diisi" }}
              render={({ field, fieldState }) => (
                <TimeInput
                  label="Jam Mulai"
                  variant="bordered"
                  labelPlacement="outside"
                  hourCycle={24}
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  size="lg"
                />
              )}
            />
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "Jam selesai wajib diisi" }}
              render={({ field, fieldState }) => (
                <TimeInput
                  label="Jam Selesai"
                  variant="bordered"
                  labelPlacement="outside"
                  hourCycle={24}
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  size="lg"
                />
              )}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 h-auto">
          <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-50">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Agenda</h3>
          </div>
          <Controller
            name="agenda"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Agenda Rapat"
                placeholder="Deskripsikan agenda rapat..."
                variant="bordered"
                labelPlacement="outside"
                minRows={6}
                classNames={{
                  inputWrapper: "bg-white",
                }}
                size="lg"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
