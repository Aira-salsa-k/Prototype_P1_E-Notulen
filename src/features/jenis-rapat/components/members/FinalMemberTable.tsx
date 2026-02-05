import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { TrashIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { MeetingTypeMemberConfig } from "@/types/meeting";

interface FinalMemberTableProps {
  fields: (MeetingTypeMemberConfig & { id: string })[];
  onRemove: (index: number) => void;
}

export function FinalMemberTable({ fields, onRemove }: FinalMemberTableProps) {
  return (
    <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm min-h-[400px] flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800 text-sm uppercase">
            Daftar Peserta Terkonfigurasi
          </h3>
          <Chip size="sm" variant="flat" color="primary">
            {fields.length}
          </Chip>
        </div>
      </div>

      <Table
        aria-label="Final Members Table"
        removeWrapper
        isStriped
        className="flex-1"
      >
        <TableHeader>
          <TableColumn width={50} align="center">
            #
          </TableColumn>
          <TableColumn>NAMA ANGGOTA</TableColumn>
          <TableColumn width={200}>JABATAN RAPAT</TableColumn>
          <TableColumn width={250}>DISPLAY FORMAT</TableColumn>
          <TableColumn width={50} align="center">
            AKSI
          </TableColumn>
        </TableHeader>
        <TableBody
          items={fields}
          emptyContent={
            <div className="py-12 text-center text-gray-400">
              <UserGroupIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Belum ada anggota yang didaftarkan.</p>
              <p className="text-xs mt-1">
                Gunakan panel di atas untuk menambahkan peserta.
              </p>
            </div>
          }
        >
          {(field) => {
            // Calculate index relative to the list
            const index = fields.findIndex((f) => f.id === field.id);
            return (
              <TableRow key={field.id}>
                <TableCell>
                  <span className="text-gray-400 font-medium text-xs">
                    {index + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-900">
                      {field.name || "Tanpa Nama"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {field.jabatan || "Anggota"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      field.meetingRole === "Sekretaris" ? "primary" : "default"
                    }
                  >
                    {field.meetingRole}
                  </Chip>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 block truncate">
                    {field.displayFormat}
                  </code>
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={() => onRemove(index)}
                    className="text-danger-400 hover:text-danger"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
}
