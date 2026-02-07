import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import {
  UserPlusIcon,
  PrinterIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  AttendanceRecord,
  AttendanceStatus,
  ParticipantType,
} from "@/types/attendance";
import { STATUS_OPTIONS } from "../../constants/attendance";
import { AppButton } from "@/components/ui/button/AppButton";

interface AttendanceTableProps {
  type: ParticipantType;
  title: string;
  data: AttendanceRecord[];
  isReadOnly: boolean;
  canAdd: boolean;
  onAdd?: () => void;
  onPrint: (type: ParticipantType, title: string) => void;
  onStatusChange: (recordId: string, status: AttendanceStatus) => void;
  onEdit: (record: AttendanceRecord) => void;
  onDelete: (recordId: string) => void;
}

export const AttendanceTable = ({
  type,
  title,
  data,
  isReadOnly,
  canAdd,
  onAdd,
  onPrint,
  onStatusChange,
  onEdit,
  onDelete,
}: AttendanceTableProps) => {
  const showActions = !isReadOnly && type !== "ANGGOTA_DEWAN";

  const columns = [
    { key: "no", label: "NO", className: "w-12" },
    { key: "name", label: "NAMA LENGKAP", className: "" },
    { key: "jabatan", label: "JABATAN / INSTANSI", className: "" },
    { key: "status", label: "STATUS", className: "" },
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      label: "AKSI",
      className: "w-24 text-center",
    });
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-xl border border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500">Total: {data.length} Peserta</p>
        </div>
        <div className="flex gap-2">
          {!isReadOnly && canAdd && (
            <AppButton
              size="xs"
              color="primary"
              onPress={onAdd}
              startContent={<UserPlusIcon className="w-4 h-4" />}
              className="font-bold"
            >
              Tambah {title}
            </AppButton>
          )}
          <AppButton
            size="xs"
            color="kuning"
            onPress={() => onPrint(type, title)}
            startContent={<PrinterIcon className="w-4 h-4" />}
          >
            Cetak Absensi
          </AppButton>
        </div>
      </div>

      <Table
        aria-label={`Tabel Absensi ${title}`}
        shadow="none"
        className="border border-gray-100 rounded-xl overflow-hidden"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className={column.className}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          emptyContent={`Belum ada data ${title.toLowerCase()}.`}
        >
          {(record: AttendanceRecord) => (
            <TableRow key={record.id} className="hover:bg-gray-50">
              {(columnKey) => (
                <TableCell>
                  {columnKey === "no" && data.indexOf(record) + 1}

                  {columnKey === "name" && (
                    <>
                      <div className="font-bold text-gray-900">
                        {record.name}
                      </div>
                      {record.institution &&
                        record.institution !== record.name && (
                          <div className="text-[10px] text-primary font-bold">
                            {record.institution}
                          </div>
                        )}
                    </>
                  )}

                  {columnKey === "jabatan" && (
                    <div className="text-sm text-gray-600">
                      {record.jabatan}
                    </div>
                  )}

                  {columnKey === "status" &&
                    (isReadOnly ? (
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          STATUS_OPTIONS.find((o) => o.key === record.status)
                            ?.color as any
                        }
                      >
                        {
                          STATUS_OPTIONS.find((o) => o.key === record.status)
                            ?.label
                        }
                      </Chip>
                    ) : (
                      <Select
                        size="sm"
                        variant="bordered"
                        selectedKeys={[record.status]}
                        onChange={(e) =>
                          onStatusChange(
                            record.id,
                            e.target.value as AttendanceStatus,
                          )
                        }
                        aria-label="Pilih Status"
                        className="w-40"
                        renderValue={(items) => {
                          return items.map((item) => (
                            <Chip
                              key={item.key}
                              size="sm"
                              variant="flat"
                              color={
                                STATUS_OPTIONS.find(
                                  (o) => o.key === record.status,
                                )?.color as any
                              }
                            >
                              {item.textValue}
                            </Chip>
                          ));
                        }}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.key} textValue={opt.label}>
                            <Chip
                              size="sm"
                              variant="flat"
                              color={opt.color as any}
                            >
                              {opt.label}
                            </Chip>
                          </SelectItem>
                        ))}
                      </Select>
                    ))}

                  {columnKey === "actions" && (
                    <div className="flex justify-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(record)}
                      >
                        <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => onDelete(record.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
