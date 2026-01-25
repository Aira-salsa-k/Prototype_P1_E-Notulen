// features/sekretaris-dewan/components/SekretarisDewanForm.fields.tsx
"use client";

import React from "react";
import { useEffect } from "react";

import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, CalendarDate } from "@internationalized/date";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Switch } from "@heroui/switch";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
import { UseFormSetValue } from "react-hook-form";
import { cn } from "@heroui/react";

interface Props {
  data: SekretarisDewanFormData;
  update: UseFormSetValue<SekretarisDewanFormData>; // Ini dari useForm
  mode: "add" | "edit";
}

export const SekretarisDewanFormFields = ({ data, update, mode }: Props) => {
  const { anggota } = useAnggotaStore();

useEffect(() => {
  if (mode === "add" && !data.jabatan) {
    update("jabatan", "Sekretaris DPR Kabupaten Keerom", { shouldValidate: true });
  }
}, [mode, data.jabatan, update]);

  return (
    <>
      {/* --- SEKSI IDENTITAS --- */}
      <Autocomplete
        scrollShadowProps={{
          isEnabled: false,
        }}
        label="Nama Anggota Dewan"
        placeholder="Cari berdasarkan nama..."
        variant="bordered"
        labelPlacement="outside"
        selectedKey={data.userId || ""}
        isDisabled={mode === "edit"}
        onSelectionChange={(key) =>
          update("userId", key as string, { shouldValidate: true })
        }
      >
        {anggota.map((a) => (
          <AutocompleteItem key={a.userId} textValue={a.name}>
            <div className="flex flex-col">
              <span className="font-bold">{a.name}</span>
              <span className="text-small text-default-500">{a.jabatan}</span>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Input
        label="Jabatan Sekretaris"
        placeholder="Masukan jabatan (e.g. Sekretaris DPR Kab)"
        labelPlacement="outside"
        variant="bordered"
        value={data.jabatan}
        onValueChange={(val) =>
          update("jabatan", val, { shouldValidate: true })
        }
        isRequired
      />

      {/* --- SEKSI PERIODE --- */}
      <DatePicker
        label="Tanggal Mulai"
        labelPlacement="outside"
        variant="bordered"
        value={
          data.periodeStart
            ? parseDate(data.periodeStart.toISOString().split("T")[0])
            : null
        }
        onChange={(date) =>
          update("periodeStart", date ? date.toDate("Asia/Jakarta") : null, {
            shouldValidate: true,
          })
        }
        isRequired
      />
      <DatePicker
        label="Tanggal Mulai"
        labelPlacement="outside"
        variant="bordered"
        value={
          data.periodeEnd
            ? parseDate(data.periodeEnd.toISOString().split("T")[0])
            : null
        }
        onChange={(date) =>
          update("periodeEnd", date ? date.toDate("Asia/Jakarta") : null, {
            shouldValidate: true,
          })
        }
        isRequired
      />

      {/* --- SEKSI STATUS --- */}
      <div className=" col-span-full space-y-3 pt-2">
        <Switch
          isSelected={data.isActive}
          onValueChange={(val) => update("isActive", val)}
          color="success"
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-full bg-content1 hover:bg-content2 items-center",
              "justify-between cursor-pointer rounded-xl gap-4 p-4 border-2 border-transparent transition-all",
              data.isActive
                ? "border-success/50 bg-success-50/20"
                : "border-default-200",
            ),
            label: "w-full",
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-medium font-bold">
              {data.isActive ? "Aktif Menjabat" : "Non-Aktif / Selesai"}
            </span>
            <span className="text-tiny text-default-400">
              {data.isActive
                ? "Profil ini akan tampil sebagai pejabat aktif di laporan."
                : "Akses dan tampilan jabatan ini akan dinonaktifkan."}
            </span>
          </div>
        </Switch>
      </div>
    </>
  );
};