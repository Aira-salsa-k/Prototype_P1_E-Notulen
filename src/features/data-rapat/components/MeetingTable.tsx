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
import { Tooltip } from "@heroui/tooltip"; // Assuming tooltip exists or using standard title
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Meeting, MeetingResolved } from "@/types/meeting";
import { useAuthStore } from "@/store/useAuthStore";
import { checkIsAdminLike, canEditMeeting } from "@/lib/auth/permissions";

interface MeetingTableProps {
  meetings: Meeting[]; // or MeetingResolved if we pre-resolve
  role: "admin" | "notulis" | "anggota_dewan" | "sekwan";
  onView: (meeting: Meeting) => void;
  onEdit?: (meeting: Meeting) => void;
  onDelete?: (id: string) => void;
}

export function MeetingTable({
  meetings,
  role,
  onView,
  onEdit,
  onDelete,
}: MeetingTableProps) {
  const { currentUser } = useAuthStore();
  const isAdminLike = checkIsAdminLike(currentUser);
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

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
      <Table
        aria-label="Tabel Jadwal Rapat"
        removeWrapper={true}
        className="min-w-full"
      >
        <TableHeader>
          <TableColumn>JUDUL & AGENDA</TableColumn>
          <TableColumn>WAKTU & TEMPAT</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn align="center">AKSI</TableColumn>
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
              className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onView(meeting)}
            >
              <TableCell>
                <div className="max-w-md py-2">
                  <div className="font-bold text-gray-900 text-base mb-1">
                    {meeting.title}
                  </div>
                  <div className="text-gray-500 text-sm line-clamp-2">
                    {meeting.agenda}
                  </div>

                  <div className="flex gap-2 mt-2">
                    {meeting.masaSidang && (
                      <Chip
                        size="sm"
                        variant="flat"
                        color="secondary"
                        className="text-[10px] h-5"
                      >
                        {meeting.masaSidang}
                      </Chip>
                    )}
                    {meeting.dasarSurat && (
                      <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded self-center">
                        Ref: {meeting.dasarSurat}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      {formatDate(meeting.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-primary" />
                    <span>
                      {meeting.startTime} - {meeting.endTime} WIT
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-red-400" />
                    <span>{meeting.room}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Chip
                  color={meeting.status === "completed" ? "success" : "primary"}
                  variant="dot"
                  className="capitalize border-none pl-0 gap-1"
                >
                  {meeting.status === "live"
                    ? "Sedang Berlangsung"
                    : meeting.status === "completed"
                      ? "Selesai"
                      : "Terjadwal"}
                </Chip>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <UsersIcon className="w-3 h-3" />
                  {meeting.invitedAnggotaDewanIds?.length || 0} Undangan
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="default"
                    onPress={() => onView(meeting)}
                    title="Lihat Detail"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Button>

                  {/* Edit/Delete only for Admin or authorized Notulis */}
                  {onEdit && canEditMeeting(currentUser, meeting) && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                      onPress={() => onEdit(meeting)}
                      title="Edit Rapat"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                  )}

                  {onDelete && isAdminLike && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => onDelete(meeting.id)}
                      title="Hapus Rapat"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
