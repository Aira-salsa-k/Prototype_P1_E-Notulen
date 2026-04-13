// app/components/anggota-dewan/AnggotaDewanTable.tsx
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Snippet } from "@heroui/snippet";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { AnggotaDewanRow } from "@/types/view/anggota-dewan-row";
import { DataTable } from "@/components/ui/table/DataTable";

import { AKDBadge } from "@/components/ui/badges/AKDBadge";
import { StatusBadge } from "../../../components/ui/badges/StatusBadge";

interface AnggotaDewanTableProps {
  anggota: AnggotaDewanRow[];
  onEdit?: (row: AnggotaDewanRow) => void;
  onDelete?: (row: AnggotaDewanRow) => void;
}

export default function AnggotaDewanTable({
  anggota,
  onEdit,
  onDelete,
}: AnggotaDewanTableProps) {
  const columns = [
    { key: "name", label: "Nama" },
    { key: "jabatan", label: "Jabatan" },
    { key: "akd", label: "AKD", className: "w-[240px] max-w-[270px]" },
    { key: "username", label: "Username" },
    { key: "password", label: "Password" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Aksi" },
  ];

  const renderCell = (item: AnggotaDewanRow, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="font-medium text-gray-900">{item.name}</p>;

      case "jabatan":
        return <p className="text-gray-900">{item.jabatan}</p>;

      case "akd":
        return (
          <div className="flex flex-wrap gap-1 max-w-[220px]">
            {item.akd.map((akd) => (
              <AKDBadge key={akd} akd={akd} />
            ))}
          </div>
        );

      case "username":
        return <span className="font-mono text-sm">{item.username}</span>;

      case "password":
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono">••••</span>

            <Popover placement="top">
              <PopoverTrigger>
                <Button size="sm" variant="light">
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Snippet symbol="" size="sm">
                  {item.password}
                </Snippet>
              </PopoverContent>
            </Popover>
          </div>
        );

      case "status":
        return <StatusBadge status={item.status} />;

      case "actions":
        return (
          <>
            {/* DESKTOP ACTIONS */}

            <div className="hidden lg:flex items-center gap-1">
              <Tooltip color="default" content="Salin Akun">
                <Snippet
                  symbol=""
                  color="default"
                  size="sm"
                  tooltipProps={{
                    content: "Salin Akun",
                    color: "foreground",
                    closeDelay: 500,
                  }}
                  classNames={{
                    base: "bg-transparent p-0 min-w-0",
                    pre: "hidden",
                    copyButton:
                      "text-indigo-800/50 hover:text-indigo-600 transition-colors bg-indigo-200/20", // Styling tombol copy
                  }}
                >
                  {`User: ${item.username}  Pass: ${item.password} website : http://..`}
                </Snippet>
              </Tooltip>

              <Tooltip content="Edit">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => onEdit?.(item)}
                  className="text-indigo-900"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Hapus">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => onDelete?.(item)}
                  className="text-danger"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </Tooltip>
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
                  <DropdownItem
                    key="copy"
                    startContent={<ClipboardDocumentIcon className="h-4 w-4" />}
                    onPress={() =>
                      navigator.clipboard.writeText(
                        `User: ${item.username} | Pass: ${item.password}`
                      )
                    }
                  >
                    Salin Akun
                  </DropdownItem>

                  <DropdownItem
                    key="edit"
                    startContent={<PencilIcon className="h-4 w-4" />}
                    onPress={() => onEdit?.(item)}
                  >
                    Edit
                  </DropdownItem>

                  <DropdownItem
                    key="delete"
                    color="danger"
                    startContent={<TrashIcon className="h-4 w-4" />}
                    onPress={() => onDelete?.(item)}
                  >
                    Hapus
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
      <div className="min-w-[1100px]">
        <DataTable
          columns={columns}
          items={anggota}
          renderCell={renderCell}
          emptyContent="Tidak ada data anggota dewan"
        />
      </div>
    </div>
  );
}
