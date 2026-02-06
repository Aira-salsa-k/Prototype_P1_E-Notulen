// app/components/anggota-dewan/AnggotaDewanTable.tsx

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Snippet } from "@heroui/snippet";
import {
  KeyIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { useMemo } from "react";
import { AnggotaDewanRow } from "@/features/anggota-dewan/view/anggota-dewan-row";
import { DataTable } from "@/components/ui/table/DataTable";

import { AKDBadge } from "@/components/ui/badges/AKDBadge";
import { StatusBadge } from "../../../components/ui/badges/StatusBadge";

interface AnggotaDewanTableProps {
  anggota: AnggotaDewanRow[];
  onEdit?: (row: AnggotaDewanRow) => void;
  onDelete?: (row: AnggotaDewanRow) => void;
  onResetPassword?: (row: AnggotaDewanRow) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canResetPassword?: boolean;
}

export const AnggotaDewanTable = ({
  anggota,
  onEdit,
  onDelete,
  onResetPassword,
  canEdit = true,
  canDelete = true,
  canResetPassword = true,
}: AnggotaDewanTableProps) => {
  // Sort members by status (Aktif first) then priority (Ketua > W. Ketua I-III > Anggota)
  const sortedAnggota = useMemo(() => {
    const getPriority = (jabatan: string) => {
      const up = jabatan.toUpperCase();
      if (up.includes("KETUA") && !up.includes("WAKIL")) return 1;
      if (
        up.includes("WAKIL KETUA I") &&
        !up.includes("WAKIL KETUA II") &&
        !up.includes("WAKIL KETUA III")
      )
        return 2;
      if (up.includes("WAKIL KETUA II") && !up.includes("WAKIL KETUA III"))
        return 3;
      if (up.includes("WAKIL KETUA III")) return 4;
      if (up.includes("ANGGOTA")) return 5;
      return 99;
    };

    return [...anggota].sort((a, b) => {
      // 1. Sort by Status (active first)
      const statusA = a.anggota.status === "active" ? 0 : 1;
      const statusB = b.anggota.status === "active" ? 0 : 1;

      if (statusA !== statusB) return statusA - statusB;

      // 2. Sort by Position Hierarchy
      const pA = getPriority(a.anggota.jabatan || "");
      const pB = getPriority(b.anggota.jabatan || "");

      if (pA !== pB) return pA - pB;

      // 3. Secondary sort by name
      return a.user.name.localeCompare(b.user.name);
    });
  }, [anggota]);

  const columns = [
    { key: "name", label: "Nama" },
    { key: "jabatan", label: "Jabatan" },
    { key: "akd", label: "AKD" },
    { key: "username", label: "Username" },
    { key: "status", label: "Status" },
    ...(canEdit || canDelete || canResetPassword
      ? [{ key: "actions", label: "Aksi" }]
      : []),
  ];

  const renderCell = (item: AnggotaDewanRow, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="font-medium text-gray-900">{item.user.name}</p>;

      case "jabatan":
        return <p className="text-gray-900">{item.anggota.jabatan}</p>;

      case "akd":
        return (
          <div className="flex flex-wrap gap-1 max-w-[220px]">
            {item.anggota.akd.map((akd) => (
              <AKDBadge key={akd} akd={akd} />
            ))}
          </div>
        );

      case "username":
        return <span className="font-mono text-sm">{item.user.username}</span>;

      case "status":
        return <StatusBadge status={item.anggota.status} />;

      case "actions":
        return (
          <>
            {/* DESKTOP ACTIONS */}

            <div className="hidden lg:flex items-center gap-1.5">
              {canResetPassword && (
                <Tooltip content="Reset Password" color="warning">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="warning"
                    onPress={() => onResetPassword?.(item)}
                    className="hover:scale-105 transition-transform bg-amber-200/90"
                  >
                    <KeyIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              )}

              {canEdit && (
                <Tooltip content="Edit" color="primary">
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
              )}

              {canDelete && (
                <Tooltip color="danger" content="Hapus">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={() => onDelete?.(item)}
                    className="text-danger"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              )}
            </div>

            {/* MOBILE / TABLET ACTIONS */}
            <div className="flex lg:hidden justify-end">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Aksi">
                  {canResetPassword ? (
                    <DropdownItem
                      key="reset"
                      startContent={<KeyIcon className="h-4 w-4" />}
                      onPress={() => onResetPassword?.(item)}
                    >
                      Reset Password
                    </DropdownItem>
                  ) : null}

                  {canEdit ? (
                    <DropdownItem
                      key="edit"
                      startContent={<PencilIcon className="h-4 w-4" />}
                      onPress={() => onEdit?.(item)}
                    >
                      Edit
                    </DropdownItem>
                  ) : null}

                  {canDelete ? (
                    <DropdownItem
                      key="delete"
                      color="danger"
                      startContent={<TrashIcon className="h-4 w-4" />}
                      onPress={() => onDelete?.(item)}
                    >
                      Hapus
                    </DropdownItem>
                  ) : null}
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
      <div className="min-w-[1100px]">
        <DataTable
          columns={columns}
          items={sortedAnggota}
          renderCell={renderCell}
          emptyContent="Tidak ada data anggota dewan"
        />
      </div>
    </div>
  );
};
