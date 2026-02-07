import { useState } from "react";
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
import {
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  MeetingTypeVariant,
  MeetingCategory,
  MeetingTypeMemberConfig,
} from "@/types/meeting";
import { MeetingTypeMemberModal } from "./MeetingTypeMemberModal";
import { useJenisRapatStore } from "../store/useJenisRapatStore";

interface VariantCardProps {
  variant: MeetingTypeVariant;
  category: MeetingCategory;
  onEdit?: (variant: MeetingTypeVariant) => void;
  onDelete?: (id: string, name: string) => void;
  isReadOnly?: boolean;
}

export function VariantCard({
  variant,
  category,
  onEdit,
  onDelete,
  isReadOnly = false,
}: VariantCardProps) {
  const { actions } = useJenisRapatStore();
  const [editingMember, setEditingMember] =
    useState<MeetingTypeMemberConfig | null>(null);

  const handleEditMember = (member: MeetingTypeMemberConfig) => {
    setEditingMember(member);
  };

  const handleSaveMember = (
    memberId: string,
    data: { meetingRole: string; displayFormat: string },
  ) => {
    const updatedMembers = variant.members.map((m) =>
      m.memberId === memberId ? { ...m, ...data } : m,
    );

    actions.updateVariant({
      ...variant,
      members: updatedMembers,
    });
  };

  return (
    <div className="mt-2 ">
      {/* MEMBERS TABLE */}
      <div className="border border-gray-200/60 rounded-xl overflow-hidden shadow-xs">
        <Table
          aria-label="Tabel Anggota Rapat"
          removeWrapper
          classNames={{
            th: "bg-gray-50 text-gray-600 font-bold uppercase text-xs py-3",
            td: "py-3 text-md text-gray-700 ",
            tr: [
              "hover:bg-primary/5 transition-colors duration-200", // Efek hover yang sinkron
            ],
          }}
        >
          <TableHeader>
            <TableColumn width={40} align="center">
              NO
            </TableColumn>
            <TableColumn>NAMA ANGGOTA</TableColumn>
            <TableColumn>JABATAN RAPAT</TableColumn>
            <TableColumn>NAMA DISPLAY FORMAT</TableColumn>
            <TableColumn
              width={isReadOnly ? 0 : 100}
              align="center"
              className={isReadOnly ? "hidden" : ""}
            >
              AKSI
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent="Belum ada anggota terdaftar untuk varian ini.">
            {variant.members.map((member, index) => (
              <TableRow key={`${member.memberId}-${index}`}>
                <TableCell>
                  <span className="font-semibold text-gray-400">
                    {index + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-900">
                      {member.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {member.jabatan}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {member.meetingRole ? (
                    <Chip
                      size="md"
                      variant="flat"
                      className="font-medium text-xs text-gray"
                    >
                      {member.meetingRole}
                    </Chip>
                  ) : (
                    <span className="text-gray-400 italic">Default</span>
                  )}
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">
                    {member.displayFormat}
                  </code>
                </TableCell>
                <TableCell className={isReadOnly ? "hidden" : ""}>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                      onPress={() => handleEditMember(member)}
                      aria-label="Edit member"
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => {
                        const updatedMembers = variant.members.filter(
                          (m) => m.memberId !== member.memberId,
                        );
                        actions.updateVariant({
                          ...variant,
                          members: updatedMembers,
                        });
                      }}
                      aria-label="Remove member"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER METADATA */}
      {!isReadOnly && (
        <div className="flex justify-end items-center px-2">
          <div className="text-xs mt-4 text-gray-500 italic">
            * Edit Jenis Rapat untuk menambah atau menghapus anggota
          </div>
        </div>
      )}

      <MeetingTypeMemberModal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        member={editingMember}
        onSave={handleSaveMember}
      />
    </div>
  );
}
