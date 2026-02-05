"use client";

import { useMemo, useState } from "react";
import { Switch } from "@heroui/switch";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useUIStore } from "@/store/useUIStore";

export default function TabMeetingAccess() {
  const meetings = useDataRapatStore((state) => state.meetings);
  const updateMeeting = useDataRapatStore(
    (state) => state.actions.updateMeeting,
  );
  const showNotification = useUIStore((state) => state.showNotification);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedMeetings = useMemo(() => {
    // Sort by Date Descending
    const meetingsList = [...meetings].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    if (!searchQuery) return meetingsList;
    return meetingsList.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.agenda.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [meetings, searchQuery]);

  const toggleMeetingAccess = (
    meetingId: string,
    currentStatus: boolean | undefined,
  ) => {
    // We assume accessControl.isMeetingSpecificAccessOn handles "This meeting is open/active for edits"
    // OR strictly 'hasAccess'. Let's use 'hasAccess' for simplicity on the dashboard level as "Active/Locked"

    updateMeeting(meetingId, {
      hasAccess: !currentStatus,
    });

    if (!currentStatus) {
      showNotification("success", "Akses Rapat Dibuka");
    } else {
      showNotification("warning", "Akses Rapat Ditutup");
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h4 className="font-bold text-blue-800">Kontrol Akses Rapat</h4>
        <p className="text-sm text-blue-700 mt-1">
          Menutup akses rapat akan mencegah perubahan data notulensi dan
          absensi, namun data tetap bersifat <em>Read-Only</em> untuk arsip.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-end">
        <Input
          placeholder="Cari Rapat (Judul/Agenda)..."
          className="w-full md:max-w-xs"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          }
          value={searchQuery}
          onValueChange={setSearchQuery}
          variant="bordered"
        />
      </div>

      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white">
        <Table
          aria-label="Tabel Akses Rapat"
          removeWrapper
          classNames={{
            th: "bg-gray-50 text-gray-600 font-bold uppercase text-xs py-4",
            td: "py-4 text-sm",
          }}
        >
          <TableHeader>
            <TableColumn>JUDUL RAPAT</TableColumn>
            <TableColumn>WAKTU</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn align="end">AKSES EDIT</TableColumn>
          </TableHeader>
          <TableBody
            items={sortedMeetings}
            emptyContent="Belum ada data rapat."
          >
            {(meeting) => (
              <TableRow key={meeting.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="font-bold text-gray-900 text-base">
                    {meeting.title}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    {meeting.agenda}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs text-gray-600">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />{" "}
                      {formatDate(meeting.date)}
                    </span>
                    <span className="flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded w-fit">
                      <ClockIcon className="w-3 h-3" /> {meeting.startTime} -{" "}
                      {meeting.endTime}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="dot"
                    color={
                      meeting.status === "live"
                        ? "success"
                        : meeting.status === "completed"
                          ? "default"
                          : "primary"
                    }
                    className="border-none capitalize"
                  >
                    {meeting.status === "live"
                      ? "Berlangsung"
                      : meeting.status === "completed"
                        ? "Selesai"
                        : "Terjadwal"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-3 items-center">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${meeting.hasAccess ? "text-success-600" : "text-gray-400"}`}
                    >
                      {meeting.hasAccess ? "Unlocked" : "Locked"}
                    </span>
                    <Switch
                      size="sm"
                      color={meeting.hasAccess ? "success" : "default"}
                      isSelected={!!meeting.hasAccess}
                      onValueChange={() =>
                        toggleMeetingAccess(meeting.id, meeting.hasAccess)
                      }
                    />
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
