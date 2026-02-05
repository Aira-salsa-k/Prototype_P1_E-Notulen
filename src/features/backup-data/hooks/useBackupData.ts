import { useState, useMemo } from "react";
import { mockMeetingResolved } from "@/mocks/meeting";
import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import { id } from "date-fns/locale";

import { useAuthStore } from "@/store/useAuthStore";
import { canViewMeeting } from "@/lib/auth/permissions";

export type BackupFilterType =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "custom";

export const useBackupData = () => {
  const { currentUser } = useAuthStore();
  const [filterType, setFilterType] = useState<BackupFilterType>("daily");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // For daily/weekly/monthly/yearly reference

  // Filter finished meetings AND check permissions
  const finishedMeetings = useMemo(() => {
    return mockMeetingResolved.filter(
      (m) => m.status === "completed" && canViewMeeting(currentUser, m),
    );
  }, [currentUser]);

  const filteredMeetings = useMemo(() => {
    if (!selectedDate && filterType !== "custom") return [];

    return finishedMeetings.filter((meeting) => {
      const meetingDate = parseISO(meeting.date);

      switch (filterType) {
        case "daily":
          return isSameDay(meetingDate, selectedDate);
        case "weekly":
          return isSameWeek(meetingDate, selectedDate, { locale: id });
        case "monthly":
          return isSameMonth(meetingDate, selectedDate);
        case "yearly":
          return isSameYear(meetingDate, selectedDate);
        case "custom":
          if (!customStartDate || !customEndDate) return true;
          return isWithinInterval(meetingDate, {
            start: startOfDay(parseISO(customStartDate)),
            end: endOfDay(parseISO(customEndDate)),
          });
        default:
          return true;
      }
    });
  }, [
    finishedMeetings,
    filterType,
    selectedDate,
    customStartDate,
    customEndDate,
  ]);

  const totalFiles = filteredMeetings.length;

  return {
    filterType,
    setFilterType,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    selectedDate,
    setSelectedDate,
    filteredMeetings,
    totalFiles,
  };
};
