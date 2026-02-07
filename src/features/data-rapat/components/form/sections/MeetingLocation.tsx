"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MeetingFormData } from "../../MeetingFormModal";

export function MeetingLocation() {
  const { control } = useFormContext<MeetingFormData>();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
          <MapPinIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-xl">
            Lokasi & Referensi
          </h3>
          <p className="text-sm text-gray-500">Tempat dan dasar pelaksanaan</p>
        </div>
      </div>
      <div className="space-y-6">
        <Controller
          name="room"
          control={control}
          rules={{ required: "Lokasi wajib diisi" }}
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              startContent={<MapPinIcon className="w-5 h-5 text-gray-400" />}
              label="Lokasi / Ruangan"
              placeholder="Nama Ruangan"
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              minRows={2}
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
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label="Dasar Surat (Opsional)"
              placeholder="No. Surat Undangan..."
              variant="bordered"
              labelPlacement="outside"
              size="lg"
              minRows={2}
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
  );
}
