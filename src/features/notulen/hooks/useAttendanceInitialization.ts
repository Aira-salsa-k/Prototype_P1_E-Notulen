import { useEffect } from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord } from "@/types/attendance";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { mockUsers } from "@/mocks/user";
import { mockMitraKerja, mockMitraInstitutions } from "@/mocks/mitra-kerja";
import { mockTenagaAhli } from "@/mocks/tenaga-ahli";
import { generateMockAnggota } from "@/mocks/anggota-dewan";

interface UseAttendanceInitializationProps {
  meeting: Meeting;
  recordsLength: number;
  setRecords: (records: AttendanceRecord[]) => void;
}

export function useAttendanceInitialization({
  meeting,
  recordsLength,
  setRecords,
}: UseAttendanceInitializationProps) {
  const meetingActions = useMeetingStore((s) => s.actions);
  const variants = useJenisRapatStore((state) => state.variants);

  useEffect(() => {
    if (!meeting) return;

    // If meeting is not 'scheduled', we NEVER re-init to preserve history
    const isScheduled = meeting.status === "scheduled";
    const hasRecords =
      (meeting.attendanceRecords?.length || 0) > 0 || recordsLength > 0;

    if (hasRecords && !isScheduled) return;

    // If scheduled but has records, check if the invited list matches the records
    if (hasRecords && isScheduled) {
      const currentRecordIds = (meeting.attendanceRecords || []).map(
        (r) => r.entityId,
      );
      const invitedIds = [
        ...(meeting.invitedAnggotaDewanIds || []),
        ...(meeting.invitedMitraKerjaIds || []),
        ...(meeting.invitedTenagaAhliIds || []),
      ];

      const isMatch =
        invitedIds.length === currentRecordIds.length &&
        invitedIds.every((id) => currentRecordIds.includes(id));

      if (isMatch) return; // Everything is in sync, no need to re-init
    }

    // --- RE-INIT LOGIC ---
    const initRecords: AttendanceRecord[] = [];
    const variant = variants.find((v) => v.id === meeting.subMeetingCategoryID);

    meeting.invitedAnggotaDewanIds?.forEach((id, index) => {
      const memberConfig = variant?.members.find((m) => m.memberId === id);
      const user = mockUsers.find((u) => u.id === id);
      const mockAnggota = generateMockAnggota().find((a) => a.id === id);

      const resolvedName = memberConfig?.name || user?.name || "Unknown Member";

      // Logic: Prefer meetingRole, then extract from displayFormat, fallback to "Anggota"
      // Avoid using mockAnggota.jabatan as it is the "Formal Position", not "Meeting Role"
      let resolvedJabatan = memberConfig?.meetingRole || "";

      if (!resolvedJabatan && memberConfig?.displayFormat) {
        const parts = memberConfig.displayFormat.split(/®|-|\|/);
        if (parts.length > 1) {
          resolvedJabatan = parts[parts.length - 1].trim();
        }
      }

      if (!resolvedJabatan) {
        resolvedJabatan = "Anggota";
      }

      initRecords.push({
        id: `att-${meeting.id}-${id}-${index}`,
        meetingId: meeting.id,
        entityId: id,
        type: "ANGGOTA_DEWAN",
        status: "HADIR",
        name: resolvedName,
        jabatan: resolvedJabatan,
        displayFormat:
          memberConfig?.displayFormat ||
          `${resolvedName} ® ${resolvedJabatan}`.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    meeting.invitedMitraKerjaIds?.forEach((id, index) => {
      const mitra = mockMitraKerja.find((m) => m.id === id);
      if (!mitra) return;

      const inst = mockMitraInstitutions.find(
        (i) => i.id === mitra.institutionId,
      );

      initRecords.push({
        id: `att-${meeting.id}-${id}-${index}`,
        meetingId: meeting.id,
        entityId: id,
        type: "MITRA_KERJA",
        status: "HADIR",
        name: mitra.name,
        jabatan: mitra.position || "Utusan",
        institution: inst?.name || "Instansi Terkait",
        displayFormat:
          `${mitra.name} ® ${inst?.name || "INSTANSI TERKAIT"}`.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    meeting.invitedTenagaAhliIds?.forEach((id, index) => {
      const ta = mockTenagaAhli.find((t) => t.id === id);
      if (!ta) return;

      initRecords.push({
        id: `att-${meeting.id}-${id}-${index}`,
        meetingId: meeting.id,
        entityId: id,
        type: "TENAGA_AHLI",
        status: "HADIR",
        name: ta.name,
        jabatan: ta.jabatan || "Tenaga Ahli",
        displayFormat:
          `${ta.name} ® ${ta.jabatan || "TENAGA AHLI"}`.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    if (initRecords.length) {
      setRecords(initRecords);
      meetingActions.updateMeeting(meeting.id, {
        attendanceRecords: initRecords,
      });
    }
  }, [
    meeting?.id,
    meeting?.subMeetingCategoryID,
    meeting?.invitedAnggotaDewanIds,
    meeting?.invitedMitraKerjaIds,
    meeting?.invitedTenagaAhliIds,
    variants,
    recordsLength,
  ]); // Sync when essential invitation data changes
}
