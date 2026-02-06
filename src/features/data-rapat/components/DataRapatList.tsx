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
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Meeting } from "@/types/meeting";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import {
  formatDateSimple,
  getStatusColor,
  getStatusLabel,
} from "@/features/data-rapat/utils";
import { DataRapatActions } from "./list/DataRapatActions";

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
  const { currentUser } = useAuthStore();
  const { categories, variants } = useJenisRapatStore();

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
      <Table
        aria-label="Tabel Jadwal Rapat"
        removeWrapper={true}
        className="min-w-full"
      >
        <TableHeader>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-sm tracking-wider py-5 pl-6">
            JUDUL & AGENDA
          </TableColumn>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-sm tracking-wider py-5">
            WAKTU & TEMPAT
          </TableColumn>
          <TableColumn className="bg-gray-50 text-gray-600 font-bold uppercase text-sm tracking-wider py-5">
            STATUS
          </TableColumn>
          <TableColumn
            align="center"
            className="bg-gray-50 text-gray-600 font-bold uppercase text-sm tracking-wider py-5 pr-6"
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
          {meetings.map((meeting) => {
            const category = categories.find(
              (c) => c.id === meeting.meetingCategoryID,
            );
            const variant = variants.find(
              (v) => v.id === meeting.subMeetingCategoryID,
            );

            return (
              <TableRow
                key={meeting.id}
                className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50/50 transition-colors group"
              >
                <TableCell className="py-6 pl-6 align-top">
                  <div className="max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <MeetingTypeBadge
                        categoryName={category?.name || "Rapat"}
                        subCategoryName={variant?.subName}
                        color={(category?.color || "default") as any}
                        size="sm"
                      />
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
                        {formatDateSimple(meeting.date)}
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
                        {meeting.status === "scheduled" && variant
                          ? variant.members.length
                          : meeting.invitedAnggotaDewanIds?.length || 0}
                      </span>
                      Undangan
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-6 pr-6 align-middle">
                  <DataRapatActions
                    meeting={meeting}
                    currentUser={currentUser}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
