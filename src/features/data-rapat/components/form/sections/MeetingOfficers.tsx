"use client";

import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectItem } from "@heroui/select";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Chip } from "@heroui/chip";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { MeetingFormData } from "../../MeetingFormModal";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";

export function MeetingOfficers() {
  const { control } = useFormContext<MeetingFormData>();

  // Get real data from stores
  const { sekretarisDewan: sekwanProfiles, users: sekwanUsers } =
    useSekretarisDewanStore();
  const { notulisList, users: notulisUsers } = useNotulisStore();

  // Resolve Sekwan with user names (only active)
  const sekwans = useMemo(() => {
    return sekwanProfiles
      .filter((s) => s.isActive)
      .map((s) => {
        const user = sekwanUsers.find((u) => u.id === s.userId);
        return {
          id: s.id,
          name: user?.name || "Unknown",
          jabatan: s.jabatan,
        };
      });
  }, [sekwanProfiles, sekwanUsers]);

  // Resolve Notulis with user names (only active)
  const resolvedNotulis = useMemo(() => {
    return notulisList
      .filter((n) => n.isActive)
      .map((n) => {
        const user = notulisUsers.find((u) => u.id === n.userID);
        return {
          id: n.userID, // Use userID consistently
          name: user?.name || "Unknown",
          username: user?.username || "-",
        };
      });
  }, [notulisList, notulisUsers]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 h-full">
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
                  label: "font-semibold text-gray-700",
                },
              }}
            >
              {(s: any) => (
                <AutocompleteItem key={s.id} textValue={s.name}>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{s.name}</span>
                    <span className="text-xs text-gray-500">{s.jabatan}</span>
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
            <div className="space-y-1">
              <Select
                selectionMode="multiple"
                label="Notulis Bertugas"
                placeholder="Pilih Notulis (Bisa lebih dari satu)"
                variant="bordered"
                labelPlacement="outside"
                size="lg"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                items={resolvedNotulis}
                selectedKeys={new Set(field.value || [])}
                onSelectionChange={(keys) => {
                  // HeroUI returns a Set of keys
                  const selectedArray = Array.from(keys) as string[];
                  field.onChange(selectedArray);
                }}
                classNames={{
                  trigger: "bg-white min-h-12",
                  label: "font-semibold text-gray-700",
                  errorMessage: "text-sm mt-1",
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2 py-1">
                      {items.map((item) => (
                        <Chip
                          key={item.key}
                          size="sm"
                          variant="flat"
                          color="secondary"
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
            </div>
          )}
        />
      </div>
    </div>
  );
}
