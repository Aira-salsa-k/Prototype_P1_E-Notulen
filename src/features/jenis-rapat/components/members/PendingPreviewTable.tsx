import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { MeetingTypeMemberConfig } from "@/types/meeting";

interface PendingPreviewTableProps {
  previewMembers: MeetingTypeMemberConfig[];
  onUpdateMember: (
    id: string,
    field: keyof MeetingTypeMemberConfig,
    value: string,
  ) => void;
  onAddMember: (member: MeetingTypeMemberConfig) => void;
  onAddAll: () => void;
  onRemovePreview: (memberId: string) => void;
}

const COMMON_ROLES = [
  "Ketua",
  "Wakil Ketua I",
  "Wakil Ketua II",
  "Wakil Ketua III",
  "Anggota",
  "Sekretaris",
  "Koordinator",
];

export function PendingPreviewTable({
  previewMembers,
  onUpdateMember,
  onAddMember,
  onAddAll,
  onRemovePreview,
}: PendingPreviewTableProps) {
  if (previewMembers.length === 0) return null;

  return (
    <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden bg-gray-50/30 animate-in fade-in slide-in-from-top-2">
      <div className="p-3 bg-gray-100/50 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">
          Preview Peserta ({previewMembers.length})
        </span>
        <Button
          size="sm"
          color="primary"
          className="font-semibold"
          onPress={onAddAll}
          startContent={<PlusIcon className="w-4 h-4" />}
        >
          Tambahkan Semua
        </Button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        <Table
          aria-label="Pending Preview Table"
          removeWrapper
          isHeaderSticky
          classNames={{ th: "bg-gray-100 text-gray-500 text-xs" }}
        >
          <TableHeader>
            <TableColumn>NAMA & JABATAN</TableColumn>
            <TableColumn width={200}>JABATAN RAPAT</TableColumn>
            <TableColumn width={200}>DISPLAY FORMAT</TableColumn>
            <TableColumn align="center" width={100}>
              AKSI
            </TableColumn>
          </TableHeader>
          <TableBody items={previewMembers}>
            {(item) => (
              <TableRow key={item.memberId}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.jabatan}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    aria-label="Pilih Jabatan Rapat"
                    defaultItems={COMMON_ROLES.map((r) => ({
                      value: r,
                      label: r,
                    }))}
                    inputValue={item.meetingRole || ""}
                    onInputChange={(val) =>
                      onUpdateMember(item.memberId, "meetingRole", val)
                    }
                    size="sm"
                    variant="bordered"
                    allowsCustomValue
                    classNames={{ base: "text-xs" }}
                  >
                    {(role) => (
                      <AutocompleteItem key={role.value}>
                        {role.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </TableCell>
                <TableCell>
                  <Input
                    size="sm"
                    variant="bordered"
                    value={item.displayFormat || ""}
                    onValueChange={(val) =>
                      onUpdateMember(item.memberId, "displayFormat", val)
                    }
                    classNames={{ input: "text-xs" }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 justify-center">
                    <Button
                      size="sm"
                      color="primary"
                      variant="solid"
                      className="min-w-0 px-3 h-8 font-medium"
                      onPress={() => onAddMember(item)}
                    >
                      Tambah
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      isIconOnly
                      onPress={() => onRemovePreview(item.memberId)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
