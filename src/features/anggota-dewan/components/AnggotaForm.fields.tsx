import { Input } from "@heroui/input";
import { Select, SelectItem} from "@heroui/select";
import { AKD } from "@/types/anggota-dewan";
import { AnggotaFormData } from "../types/AnggotaFormData";
import { AKD_OPTIONS } from "@/lib/akd";
import { AKDBadge } from "@/components/ui/badges/AKDBadge";
import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


interface Props {
  data: AnggotaFormData;
  update: <K extends keyof AnggotaFormData>(
    key: K,
    value: AnggotaFormData[K]
  ) => void;
  mode: "add" | "edit";
}

export function AnggotaFormFields({ data, update, mode }: Props) {
    const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <Input
        label="Nama Lengkap"
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
        autoFocus
        required
      />

      <Input
        label="Jabatan"
        value={data.jabatan}
        onChange={(e) => update("jabatan", e.target.value)}
        required
      />

      <Input
        isRequired
        variant="bordered"
        label="Username"
        value={data.username}
        onChange={(e) => update("username", e.target.value)}
        isDisabled={mode === "edit"}
        description={
          mode === "edit" ? "Username tidak dapat diubah setelah dibuat" : ""
        }
      />

      <Input
        isRequired={mode === "add"}
        variant="bordered"
        label="Password"
        placeholder={
          mode === "add"
            ? "Masukkan password baru"
            : "Password dikelola via Reset Password"
        }
        type={isVisible ? "text" : "password"}
        value={mode === "add" ? data.password : "********"} // Tampilkan dot saat edit
        onChange={(e) => update("password", e.target.value)}
        isDisabled={mode === "edit"}
        description={
          mode === "edit"
            ? "Gunakan fitur 'Reset Password' di tabel untuk mengganti kata sandi."
            : ""
        }
        endContent={
          mode === "add" && ( // Icon mata hanya muncul saat tambah (saat input aktif)
            <button
              type="button"
              onClick={toggleVisibility}
              className="focus:outline-none"
            >
              {isVisible ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          )
        }
      />

      <Select
        isRequired
        label="AKD"
        scrollShadowProps={{
          isEnabled: false,
        }}
        labelPlacement="outside-top"
        selectionMode="multiple"
        selectedKeys={new Set(data.akd)}
        onSelectionChange={(keys) => update("akd", Array.from(keys) as AKD[])}
        classNames={{
          trigger: "h-auto min-h-[44px] py-2", // ⬅️ hug content
          value: "p-0",
        }}
        renderValue={(items) => (
          <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto">
            {items.map((item) => (
              <AKDBadge key={item.key} akd={item.key as AKD} />
            ))}
          </div>
        )}
      >
        {AKD_OPTIONS.map((a) => (
          <SelectItem key={a.value}>{a.label}</SelectItem>
        ))}
      </Select>

      <Select
        labelPlacement="outside"
        isRequired
        label="Status"
        selectedKeys={[data.status]}
        onSelectionChange={(keys) =>
          update("status", Array.from(keys)[0] as "active" | "inactive")
        }
      >
        <SelectItem key="active">Aktif</SelectItem>
        <SelectItem key="inactive">Tidak Aktif</SelectItem>
      </Select>
    </>
  );
}
