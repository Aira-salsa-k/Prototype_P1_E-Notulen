"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { MeetingFormData } from "../../MeetingFormModal";

export function MeetingMainInfo() {
  const { control } = useFormContext<MeetingFormData>();

  // Use selectors for better reactivity
  const variants = useJenisRapatStore((state) => state.variants);
  const categories = useJenisRapatStore((state) => state.categories);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
          <DocumentTextIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-xl">Detail Utama</h3>
          <p className="text-sm text-gray-500">Informasi dasar rapat</p>
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
              const cat = categories.find((c) => c.id === variant.categoryId);
              return (
                <AutocompleteItem
                  key={variant.id}
                  textValue={`${variant.subName || cat?.name || "Rapat"}`}
                >
                  <div className="flex flex-col py-1">
                    <span className="font-bold text-base">
                      {variant.subName || cat?.name}
                    </span>
                    <span className="text-xs text-gray-400">{cat?.name}</span>
                  </div>
                </AutocompleteItem>
              );
            }}
          </Autocomplete>
        )}
      />
    </div>
  );
}
