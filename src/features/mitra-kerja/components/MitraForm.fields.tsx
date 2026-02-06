// app/components/mitra-kerja/MitraForm.fields.tsx
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { AKD } from "@/types";
import { AKD_OPTIONS } from "@/lib/akd";
import { MitraFormData } from "../types/MitraFormData";

interface Props {
  data: MitraFormData;
  update: <K extends keyof MitraFormData>(
    key: K,
    value: MitraFormData[K],
  ) => void;
  mode: "add" | "edit";
}

export function MitraFormFields({ data, update, mode }: Props) {
  return (
    <>
      <Input
        label="Nama Instansi"
        labelPlacement="outside"
        placeholder="Masukkan nama instansi"
        value={data.name}
        onValueChange={(val) => update("name", val.toUpperCase())}
        autoFocus
        isRequired
      />

      <Select
        label="AKD"
        labelPlacement="outside"
        selectedKeys={[data.akdID]}
        onSelectionChange={(keys) =>
          update("akdID", Array.from(keys)[0] as AKD)
        }
        isRequired
      >
        {AKD_OPTIONS.map((a) => (
          <SelectItem key={a.value}>{a.label}</SelectItem>
        ))}
      </Select>

      <Select
        labelPlacement="outside"
        label="Status"
        selectedKeys={[data.status]}
        onSelectionChange={(keys) =>
          update("status", Array.from(keys)[0] as "active" | "inactive")
        }
        isRequired
      >
        <SelectItem key="active">Active</SelectItem>
        <SelectItem key="inactive">Inactive</SelectItem>
      </Select>
    </>
  );
}
