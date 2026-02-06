"use client";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useFormContext, Controller } from "react-hook-form";
import { MeetingCategory } from "@/types/meeting";
import { SemanticTone } from "@/types/common";
import React from "react";

import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

interface MeetingTypeFormInfoProps {
  categories: MeetingCategory[];
  isEdit: boolean;
  isNewCategory: boolean;
  onCategoryChange: (val: string) => void;
}

export function MeetingTypeFormInfo({
  categories,
  isEdit,
  isNewCategory,
  onCategoryChange,
}: MeetingTypeFormInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const colors: { key: SemanticTone; label: string }[] = [
    { key: "info", label: "INFO" },
    { key: "success", label: "SUCCESS" },
    { key: "warning", label: "WARNING" },
    { key: "neutral", label: "NEUTRAL" },
    { key: "accent", label: "ACCENT" },
    { key: "teal", label: "TEAL" },
    { key: "cyan", label: "CYAN" },
    { key: "indigo", label: "INDIGO" },
    { key: "lime", label: "LIME" },
  ];

  return (
    <div className="bg-white px-2">
      <h3 className="font-bold text-gray-800 pb-4 text-base border-b border-gray-200 mb-6">
        1. Pilih Kategori dan sub kategori rapat
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Selection */}
        <div className="space-y-4">
          {!isEdit ? (
            <div className="space-y-4">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Pilih Kategori"
                    placeholder="Pilih atau Buat Baru"
                    variant="bordered"
                    labelPlacement="outside"
                    selectedKeys={
                      isNewCategory ? ["NEW"] : field.value ? [field.value] : []
                    }
                    onSelectionChange={(k) =>
                      onCategoryChange(Array.from(k)[0] as string)
                    }
                  >
                    {[
                      ...categories.map((c) => (
                        <SelectItem key={c.id} textValue={c.name}>
                          {c.name}
                        </SelectItem>
                      )),
                      <SelectItem
                        key="NEW"
                        className="text-primary font-semibold"
                      >
                        + Buat Kategori Baru
                      </SelectItem>,
                    ]}
                  </Select>
                )}
              />

              {isNewCategory && (
                <div className="p-4 bg-primary-50/50 rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-300 border border-primary-100">
                  <Input
                    {...register("categoryName", { required: isNewCategory })}
                    label="Nama Kategori Baru"
                    placeholder="Misal: Rapat Koordinasi"
                    labelPlacement="outside"
                    variant="bordered"
                    className="bg-white"
                  />
                  <Controller
                    name="categoryColor"
                    control={control}
                    render={({ field }) => (
                      <Select
                        items={colors}
                        selectedKeys={field.value ? [field.value] : ["info"]}
                        onSelectionChange={(keys) =>
                          field.onChange(Array.from(keys)[0])
                        }
                        label="Warna Label"
                        labelPlacement="outside"
                        variant="bordered"
                        className="bg-white"
                        renderValue={(items) => {
                          return items.map((item) => (
                            <div
                              key={item.key}
                              className="flex items-center gap-2"
                            >
                              <div
                                className={`w-3 h-3 rounded-full bg-${item.data?.key}-500`}
                              ></div>
                              <span>{item.data?.label}</span>
                            </div>
                          ));
                        }}
                      >
                        {(c) => (
                          <SelectItem
                            key={c.key}
                            startContent={
                              <div
                                className={`w-3 h-3 rounded-full bg-${c.key}-500`}
                              ></div>
                            }
                          >
                            {c.label}
                          </SelectItem>
                        )}
                      </Select>
                    )}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center h-[56px] mt-6">
              Mode Edit: Kategori tidak dapat diubah.
            </div>
          )}
        </div>

        {/* Variant/SubName Input */}
        <div className="space-y-4">
          <Input
            {...register("subName")}
            label="Nama Sub Jenis Rapat (Opsional)"
            labelPlacement="outside"
            placeholder="Contoh: LKPJ, Pembahasan APBD"
            variant="bordered"
          />
        </div>
      </div>
    </div>
  );
}
