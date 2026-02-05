"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Meeting } from "@/types/meeting";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  checkIsAdminLike,
  canEditMeeting,
  canDeleteMeeting,
} from "@/lib/auth/permissions";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";

interface DataRapatListProps {
  meetings: Meeting[];
  onView: (meeting: Meeting) => void;
  onEdit?: (meeting: Meeting) => void;
  onDelete?: (id: string) => void;
}

export function DataRapatList({
  meetings,
  onView,
  onEdit,
  onDelete,
}: DataRapatListProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "success";
      case "completed":
        return "default";
      case "scheduled":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "live":
        return "Sedang Berlangsung";
      case "completed":
        return "Selesai";
      case "scheduled":
        return "Terjadwal";
      default:
        return status;
    }
  };

  const { currentUser } = useAuthStore();
  const isAdminLike = checkIsAdminLike(currentUser);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
      <Table
        aria-label="Tabel Jadwal Rapat"
        removeWrapper={true}
        className="min-w-full"
      >
        <TableHeader>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-md tracking-wider py-5 pl-6">
            JUDUL & AGENDA
          </TableColumn>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-md tracking-wider py-5">
            WAKTU & TEMPAT
          </TableColumn>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-md tracking-wider py-5">
            STATUS
          </TableColumn>
          <TableColumn
            align="center"
            className="bg-gray-50 text-gray-600 font-bold uppercase text-md tracking-wider py-5 pr-6"
          >
            AKSI
          </TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <CalendarIcon className="w-12 h-12 mb-2 opacity-20" />
              <p>Belum ada jadwal rapat yang tersedia.</p>
            </div>
          }
        >
          {meetings.map((meeting) => (
            <TableRow
              key={meeting.id}
              className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/50 transition-colors group"
            >
              <TableCell className="py-6 pl-6 align-top">
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const variant = useJenisRapatStore
                        .getState()
                        .variants.find(
                          (v) => v.id === meeting.subMeetingCategoryID,
                        );
                      const category = useJenisRapatStore
                        .getState()
                        .categories.find(
                          (c) => c.id === meeting.meetingCategoryID,
                        );
                      if (!category && !variant) return null;
                      const chipColor = (category?.color || "default") as any;
                      return (
                        <MeetingTypeBadge
                          categoryName={category?.name || "Rapat"}
                          subCategoryName={variant?.subName}
                          color={chipColor}
                          size="sm"
                        />
                      );
                    })()}
                  </div>
                  <div
                    className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer leading-tight"
                    onClick={() => onView(meeting)}
                  >
                    {meeting.title}
                  </div>
                  <div className="text-gray-500 text-sm line-clamp-2">
                    {meeting.agenda}
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-6 align-top">
                <div className="flex flex-col gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatDate(meeting.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded text-gray-700 font-bold">
                      {meeting.startTime} - {meeting.endTime} WIT
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{meeting.room}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-6 align-top">
                <div className="flex flex-col items-start gap-3">
                  <Chip
                    color={getStatusColor(meeting.status) as any}
                    variant="flat"
                    size="sm"
                    className="font-bold capitalize px-2 h-7"
                  >
                    {getStatusLabel(meeting.status)}
                  </Chip>
                  <div
                    className="text-xs text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 cursor-help"
                    title={
                      meeting.status === "scheduled"
                        ? "Mengikuti template jenis rapat"
                        : "Daftar tetap"
                    }
                  >
                    <UsersIcon className="w-3.5 h-3.5" />
                    <span className="font-bold text-gray-700">
                      {(() => {
                        if (meeting.status === "scheduled") {
                          const variant = useJenisRapatStore
                            .getState()
                            .variants.find(
                              (v) => v.id === meeting.subMeetingCategoryID,
                            );
                          return variant
                            ? variant.members.length
                            : meeting.invitedAnggotaDewanIds?.length || 0;
                        }
                        return meeting.invitedAnggotaDewanIds?.length || 0;
                      })()}
                    </span>
                    Undangan
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-6 pr-6 align-middle">
                {/* DESKTOP ACTIONS */}
                <div className="hidden lg:flex items-center justify-center gap-2">
                  <Tooltip content="Lihat Detail" color="default">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="default"
                      onPress={() => onView(meeting)}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </Button>
                  </Tooltip>

                  {canEditMeeting(currentUser, meeting) && (
                    <Tooltip content="Edit Jadwal" color="primary">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => {
                          if (onEdit) onEdit(meeting);
                        }}
                        className="text-primary hover:scale-105 transition-transform"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  )}

                  {canDeleteMeeting(currentUser, meeting) && (
                    <Tooltip content="Hapus Jadwal" color="danger">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => {
                          if (onDelete) onDelete(meeting.id);
                        }}
                        className="hover:scale-105 transition-transform"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  )}
                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex lg:hidden justify-end">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Aksi Rapat">
                      <DropdownItem
                        key="view"
                        startContent={<EyeIcon className="w-4 h-4" />}
                        onPress={() => onView(meeting)}
                      >
                        Lihat Detail
                      </DropdownItem>
                      {canEditMeeting(currentUser, meeting) ? (
                        <DropdownItem
                          key="edit"
                          startContent={<PencilIcon className="w-4 h-4" />}
                          onPress={() => {
                            if (onEdit) onEdit(meeting);
                          }}
                        >
                          Edit Jadwal
                        </DropdownItem>
                      ) : null}
                      {canDeleteMeeting(currentUser, meeting) ? (
                        <DropdownItem
                          key="delete"
                          color="danger"
                          className="text-danger"
                          startContent={<TrashIcon className="w-4 h-4" />}
                          onPress={() => {
                            if (onDelete) onDelete(meeting.id);
                          }}
                        >
                          Hapus Jadwal
                        </DropdownItem>
                      ) : null}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
