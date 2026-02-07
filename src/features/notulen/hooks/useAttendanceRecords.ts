import { useState, useMemo, useEffect } from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";

export function useAttendanceRecords(
  meeting: Meeting,
  initialRecords?: AttendanceRecord[],
) {
  const meetingActions = useMeetingStore((s) => s.actions);

  // State for attendance records
  // Prioritize initialRecords from parent (which are robustly resolved) over potentially stale meeting prop
  const [records, setRecords] = useState<AttendanceRecord[]>(
    initialRecords ?? meeting?.attendanceRecords ?? [],
  );

  // Sync internal records with meeting prop if it changes from outside
  useEffect(() => {
    // If initialRecords changes (parent updated them), sync them
    if (initialRecords && initialRecords.length > 0) {
      setRecords(initialRecords);
      return;
    }

    // Fallback to meeting records if store updates
    if (meeting?.attendanceRecords) {
      setRecords(meeting.attendanceRecords);
    }
  }, [meeting?.attendanceRecords, initialRecords]);

  // Actions wrapper to update both local state and store
  const updateMeetingStore = (newRecords: AttendanceRecord[]) => {
    meetingActions.updateMeeting(meeting.id, {
      attendanceRecords: newRecords,
    });
  };

  // Handlers
  const handleStatusChange = (
    recordId: string,
    newStatus: AttendanceStatus,
  ) => {
    const updated = records.map((r) =>
      r.id === recordId
        ? { ...r, status: newStatus, updatedAt: new Date() }
        : r,
    );
    setRecords(updated);
    updateMeetingStore(updated);
  };

  const handleDelete = (recordId: string) => {
    const updated = records.filter((r) => r.id !== recordId);
    setRecords(updated);
    updateMeetingStore(updated);
  };

  // Derived Values
  const allMembers = useMemo(() => {
    return records
      .filter((r) => r.type === "ANGGOTA_DEWAN")
      .map((r) => ({
        userId: r.entityId,
        name: r.name,
        jabatan: r.jabatan,
      }));
  }, [records]);

  return {
    records,
    setRecords,
    updateMeetingStore,
    handleStatusChange,
    handleDelete,
    allMembers,
  };
}
