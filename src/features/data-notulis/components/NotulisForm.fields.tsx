"use client";

import React from "react";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import { NotulisFormData } from "../types/notulis-form-data";
import { cn } from "@heroui/react";

interface Props {
  data: NotulisFormData;
  update: UseFormSetValue<NotulisFormData>;
  register: UseFormRegister<NotulisFormData>;
  mode: "add" | "edit";
}

export const NotulisFormFields = ({ data, update, register, mode }: Props) => {
  return (
    <>
      <Input
        {...register("name", { required: true })}
        label="Nama Lengkap"
        placeholder="Masukan nama lengkap..."
        variant="bordered"
        labelPlacement="outside"
        value={data.name}
        onValueChange={(val) => update("name", val, { shouldValidate: true })}
        isRequired
      />

      <Input
        {...register("NIP", { required: true })}
        label="NIP"
        placeholder="Masukan NIP..."
        variant="bordered"
        labelPlacement="outside"
        value={data.NIP}
        onValueChange={(val) => update("NIP", val, { shouldValidate: true })}
        isRequired
      />

      <Input
        {...register("username", { required: true })}
        label="Username"
        placeholder="Masukan username..."
        variant="bordered"
        labelPlacement="outside"
        value={data.username}
        onValueChange={(val) =>
          update("username", val, { shouldValidate: true })
        }
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">@</span>
          </div>
        }
        isRequired
      />

      {mode === "add" && (
        <Input
          {...register("password")}
          label="Password"
          type="password"
          placeholder="Masukan password..."
          variant="bordered"
          labelPlacement="outside"
          value={data.password}
          onValueChange={(val) =>
            update("password", val, { shouldValidate: true })
          }
          description="Default: default123 jika dikosongkan"
        />
      )}

      <div className="col-span-full space-y-3 pt-2">
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
              {data.isActive ? "Status Aktif" : "Non-Aktif"}
            </span>
            <span className="text-tiny text-default-400">
              {data.isActive
                ? "Notulis ini dapat ditugaskan dalam rapat."
                : "Notulis ini tidak akan muncul dalam pilihan penugasan."}
            </span>
          </div>
        </Switch>
      </div>
    </>
  );
};
