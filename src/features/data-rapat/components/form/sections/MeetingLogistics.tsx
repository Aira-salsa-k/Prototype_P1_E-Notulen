"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { MeetingFormData } from "../../MeetingFormModal";

export function MeetingLogistics() {
  const { control } = useFormContext<MeetingFormData>();

  return (
    <div className="space-y-6">
      {/* Waktu Pelaksanaan */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-50">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
            <CalendarDaysIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-xl">
              Waktu Pelaksanaan
            </h3>
            <p className="text-sm text-gray-500">Jadwal tanggal dan jam</p>
          </div>
        </div>

        <Controller
          name="date"
          control={control}
          rules={{ required: "Tanggal wajib diisi" }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Tanggal"
              variant="bordered"
              labelPlacement="outside"
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              classNames={{
                base: "bg-white",
                label: "font-semibold text-gray-700",
              }}
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
                  label: "font-semibold text-gray-700",
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
                classNames={{
                  inputWrapper: "bg-white",
                  label: "font-semibold text-gray-700",
                }}
                size="lg"
              />
            )}
          />
        </div>
      </div>

      {/* Lokasi & Referensi */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-50">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <MapPinIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-xl">
              Lokasi & Referensi
            </h3>
            <p className="text-sm text-gray-500">
              Tempat dan dasar pelaksanaan
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Controller
            name="room"
            control={control}
            rules={{ required: "Lokasi wajib diisi" }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                startContent={<MapPinIcon className="w-5 h-5 text-gray-400" />}
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
            rules={{ required: "Dasar surat wajib diisi" }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Dasar Surat"
                placeholder="No. Surat Undangan..."
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
        </div>
      </div>
    </div>
  );
}
