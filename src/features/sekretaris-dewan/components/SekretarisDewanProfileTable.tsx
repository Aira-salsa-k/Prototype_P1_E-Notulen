// features/sekretaris-dewan/components/SekretarisDewanProfileTable.tsx
import React from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";
import { DataTable } from "@/components/ui/table/DataTable";
import { StatusBadge } from "@/components/ui/badges/StatusBadge";

interface SekretarisDewanTableProps {
  data: SekretarisDewanRow[];
  onEdit?: (row: SekretarisDewanRow) => void;
  onResetPassword?: (row: SekretarisDewanRow) => void;
  onDelete?: (row: SekretarisDewanRow) => void;
}

export const SekretarisDewanTable: React.FC<SekretarisDewanTableProps> = ({
  data,
  onEdit,
  onResetPassword,
  onDelete,
}) => {
  const columns = [
    { key: "name", label: "Nama" },
    { key: "username", label: "Username" },
    { key: "nip", label: "NIP" },
    { key: "jabatan", label: "Jabatan" },
    { key: "periode", label: "Masa Kerja" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Aksi" },
  ];

  const renderCell = (item: SekretarisDewanRow, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="font-medium text-gray-900">{item.name}</p>;

      case "username":
        return <p className="text-gray-600 text-sm">@{item.username}</p>;

      case "nip":
        return <p className="text-gray-500 font-mono text-sm">{item.nip}</p>;

      case "jabatan":
        return <p className="text-gray-600">{item.jabatan}</p>;

      case "periode":
        return (
          <p className="text-gray-500 font-mono text-sm">{item.periode}</p>
        );

      case "status":
        // Konversi boolean isActive ke string status untuk StatusBadge
        return <StatusBadge status={item.isActive ? "active" : "inactive"} />;

      case "actions":
        return (
          <>
            {/* DESKTOP ACTIONS: Tooltip + Icon Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Tooltip content="Edit Profil" color="primary">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => onEdit?.(item)}
                  className="text-primary hover:scale-105 transition-transform"
                >
                  <PencilIcon className="h-5 w-5" />
                </Button>
              </Tooltip>

              <Tooltip content="Reset Password" color="warning">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="warning"
                  onPress={() => onResetPassword?.(item)}
                  className="hover:scale-105 transition-transform"
                >
                  <KeyIcon className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Hapus Profil">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={() => onDelete?.(item)}
                  className="hover:scale-105 transition-transform"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>

            {/* MOBILE ACTIONS: Dropdown */}
            <div className="flex lg:hidden justify-end">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Aksi Sekretaris">
                  <DropdownItem
                    key="edit"
                    startContent={<PencilIcon className="h-4 w-4" />}
                    onPress={() => onEdit?.(item)}
                  >
                    Edit Profil
                  </DropdownItem>
                  <DropdownItem
                    key="reset-password"
                    startContent={<KeyIcon className="h-4 w-4" />}
                    onPress={() => onResetPassword?.(item)}
                  >
                    Reset Password
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    color="danger"
                    className="text-danger"
                    startContent={<TrashIcon className="h-4 w-4" />}
                    onPress={() => onDelete?.(item)}
                  >
                    Hapus Profil
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-[1000px]">
        <DataTable
          columns={columns}
          items={data}
          renderCell={renderCell}
          emptyContent="Belum ada data Sekretaris Dewan"
        />
      </div>
    </div>
  );
};
