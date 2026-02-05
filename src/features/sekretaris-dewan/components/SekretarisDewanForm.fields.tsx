// features/sekretaris-dewan/components/SekretarisDewanForm.fields.tsx
"use client";

import React, { useEffect } from "react";

import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { parseDate } from "@internationalized/date";
import { Switch } from "@heroui/switch";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
import { UseFormSetValue } from "react-hook-form";
import { cn } from "@heroui/react";

interface Props {
  data: SekretarisDewanFormData;
  update: UseFormSetValue<SekretarisDewanFormData>; // Ini dari useForm
  mode: "add" | "edit";
}

export const SekretarisDewanFormFields = ({ data, update, mode }: Props) => {
  useEffect(() => {
    if (mode === "add" && !data.jabatan) {
      update("jabatan", "Sekretaris DPR Kabupaten Keerom", {
        shouldValidate: true,
      });
    }
  }, [mode, data.jabatan, update]);

  return (
    <>
      {/* --- SEKSI IDENTITAS AKUN --- */}
      <Input
        label="Nama Lengkap"
        placeholder="Nama lengkap sekretaris..."
        variant="bordered"
        labelPlacement="outside"
        value={data.name}
        onValueChange={(val) => update("name", val, { shouldValidate: true })}
        isRequired
      />

      <Input
        label="NIP Sekretaris"
        placeholder="Masukan NIP (e.g. 1980...)"
        labelPlacement="outside"
        variant="bordered"
        value={data.nip}
        onValueChange={(val) => update("nip", val, { shouldValidate: true })}
        isRequired
      />

      <Input
        label="Username"
        placeholder="Username login..."
        variant="bordered"
        labelPlacement="outside"
        value={data.username}
        onValueChange={(val) =>
          update("username", val, { shouldValidate: true })
        }
        isRequired
      />

      {(mode === "add" || data.password !== undefined) && (
        <Input
          label="Password"
          placeholder={
            mode === "edit"
              ? "Kosongkan jika tidak ingin mengubah"
              : "Password login..."
          }
          variant="bordered"
          labelPlacement="outside"
          type="password"
          value={data.password || ""}
          onValueChange={(val) =>
            update("password", val, { shouldValidate: true })
          }
          isRequired={mode === "add"}
        />
      )}

      {/* --- SEKSI PERIODE --- */}
      {(() => {
        const formatDateValue = (val: any) => {
          if (!val) return null;
          try {
            const dateObj = typeof val === "string" ? new Date(val) : val;
            return parseDate(dateObj.toISOString().split("T")[0]);
          } catch (e) {
            return null;
          }
        };

        return (
          <>
            <DatePicker
              label="Tanggal Mulai"
              labelPlacement="outside"
              variant="bordered"
              value={formatDateValue(data.periodeStart)}
              onChange={(date) =>
                update(
                  "periodeStart",
                  date ? date.toDate("Asia/Jakarta") : null,
                  {
                    shouldValidate: true,
                  },
                )
              }
              isRequired
            />
            <DatePicker
              label="Tanggal Selesai"
              labelPlacement="outside"
              variant="bordered"
              value={formatDateValue(data.periodeEnd)}
              onChange={(date) =>
                update(
                  "periodeEnd",
                  date ? date.toDate("Asia/Jakarta") : null,
                  {
                    shouldValidate: true,
                  },
                )
              }
              isRequired
            />
          </>
        );
      })()}

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

      {/* --- SEKSI STATUS --- */}
      <div className="space-y-3">
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
