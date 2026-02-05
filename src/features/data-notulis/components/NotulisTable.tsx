"use client";

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

import { NotulisRow } from "../types/notulis-row";
import { DataTable } from "@/components/ui/table/DataTable";
import { StatusBadge } from "@/components/ui/badges/StatusBadge";
import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike } from "@/lib/auth/permissions";

interface NotulisTableProps {
  data: NotulisRow[];
  onEdit: (row: NotulisRow) => void;
  onDelete: (row: NotulisRow) => void;
  onResetPassword: (row: NotulisRow) => void;
}

export default function NotulisTable({
  data,
  onEdit,
  onDelete,
  onResetPassword,
}: NotulisTableProps) {
  const { currentUser } = useAuthStore();
  const isAdminLike = checkIsAdminLike(currentUser);

  const columns = [
    { key: "name", label: "Nama Notulis" },
    { key: "username", label: "Username" },
    { key: "nip", label: "NIP" },
    { key: "status", label: "Status" },
    ...(isAdminLike ? [{ key: "actions", label: "Aksi" }] : []),
  ];

  const renderCell = (item: NotulisRow, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">{item.user.name}</p>
          </div>
        );

      case "username":
        return <p className="font-medium">@{item.user.username}</p>;

      case "nip":
        return (
          <p className="text-gray-500 font-mono text-sm">{item.notulis.NIP}</p>
        );

      case "status":
        return (
          <StatusBadge status={item.notulis.isActive ? "active" : "inactive"} />
        );

      case "actions":
        if (!isAdminLike) return null;
        return (
          <>
            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-2">
              <Tooltip content="Edit Notulis" color="primary">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => onEdit(item)}
                  className="text-primary hover:scale-105 transition-transform"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip content="Reset Password" color="warning">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="warning"
                  onPress={() => onResetPassword(item)}
                >
                  <KeyIcon className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Hapus Notulis">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={() => onDelete(item)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex lg:hidden justify-end">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Aksi Notulis">
                  <DropdownItem
                    key="edit"
                    startContent={<PencilIcon className="h-4 w-4" />}
                    onPress={() => onEdit(item)}
                  >
                    Edit Notulis
                  </DropdownItem>
                  <DropdownItem
                    key="reset"
                    startContent={<KeyIcon className="h-4 w-4" />}
                    onPress={() => onResetPassword(item)}
                  >
                    Reset Password
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    color="danger"
                    className="text-danger"
                    startContent={<TrashIcon className="h-4 w-4" />}
                    onPress={() => onDelete(item)}
                  >
                    Hapus Notulis
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
      <DataTable
        columns={columns}
        items={data}
        renderCell={renderCell}
        emptyContent="Belum ada data notulis"
      />
    </div>
  );
}
