"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { MeetingFormData } from "../../MeetingFormModal";

export function MeetingAgenda() {
  const { control } = useFormContext<MeetingFormData>();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 flex-1">
      <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
          <DocumentTextIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-xl">
            Masa Sidang & Agenda Rapat
          </h3>
          <p className="text-sm text-gray-500">Deskripsi agenda pembahasan</p>
        </div>
      </div>

      <Controller
        name="masaSidang"
        rules={{ required: "Masa sidang wajib diisi" }}
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Masa Sidang"
            placeholder="Masa Sidang I Tahun 2024"
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
        name="agenda"
        rules={{ required: "Agenda wajib diisi" }}
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="Agenda Rapat"
            placeholder="Deskripsikan agenda rapat..."
            variant="bordered"
            labelPlacement="outside"
            minRows={8}
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
  );
}
