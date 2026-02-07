import { useEffect } from "react";
import { Meeting } from "@/types/meeting";
import { AttendanceRecord } from "@/types/attendance";
import { useMeetingStore } from "@/features/data-rapat/store/useMeetingStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { mockUsers } from "@/mocks/user";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useMitraStore } from "@/features/mitra-kerja/store/useMitraKerjaStore";

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
  const { anggota: allAnggota, users: allUsers } = useAnggotaStore();
  const { institutions: allInstitutions } = useMitraStore();

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
        invitedIds.length <= currentRecordIds.length &&
        invitedIds.every((id) => currentRecordIds.includes(id));

      // Check if any records have placeholder names that can now be resolved
      const hasPlaceholders = meeting.attendanceRecords?.some(
        (r) => r.name === "Unknown Member" || !r.name,
      );

      // Only return if IDs match AND we don't have unresolved names
      if (isMatch && !hasPlaceholders) return;
    }

    // --- RE-INIT / SYNC LOGIC ---
    const currentRecords = meeting.attendanceRecords || [];

    // Normalize invited IDs to guaranteed User IDs for comparison
    // This handles the case where invited ID is "anggota-XXX" but record stores "user-anggota-XXX"
    const normalizedInvitedIds = (meeting.invitedAnggotaDewanIds || []).map(
      (invitedId) => {
        const anggota = allAnggota.find(
          (a) => a.id === invitedId || a.userId === invitedId,
        );
        return anggota ? anggota.userId : invitedId;
      },
    );

    // Keep records that are NOT from the template (manual ones).
    // We filter out any record that matches an invited User ID.
    const manualRecords = currentRecords.filter(
      (r) =>
        !normalizedInvitedIds.includes(r.entityId) &&
        !(meeting.invitedMitraKerjaIds || []).includes(r.entityId) &&
        !(meeting.invitedTenagaAhliIds || []).includes(r.entityId),
    );

    const initRecords: AttendanceRecord[] = [...manualRecords];
    const variant = variants.find((v) => v.id === meeting.subMeetingCategoryID);

    meeting.invitedAnggotaDewanIds?.forEach((id, index) => {
      // Resolve ID to User ID first
      const anggota = allAnggota.find((a) => a.id === id || a.userId === id);
      const userId = anggota ? anggota.userId : id;

      // Check if already in manualRecords (shouldn't be, but safety first)
      if (manualRecords.some((r) => r.entityId === userId)) return;
      // Check if already added to initRecords in this loop (prevent duplicate invites)
      if (initRecords.some((r) => r.entityId === userId)) return;

      const memberConfig = variant?.members.find((m) => m.memberId === id);
      const user = allUsers.find((u) => u.id === userId);

      // Determine Name
      const resolvedName =
        memberConfig?.name || user?.name || "Anggota (Nama Tidak Ditemukan)";

      let resolvedJabatan =
        memberConfig?.meetingRole || anggota?.jabatan || "Anggota";

      initRecords.push({
        id: `att-${meeting.id}-${userId}-${index}`, // Use userId for stability
        meetingId: meeting.id,
        entityId: userId, // Store UserID as entity ID strictly
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
      // Check if already in records
      if (manualRecords.some((r) => r.entityId === id)) return;

      // In real app, we might want to fetch mitra but for now use institutions if it matches
      const inst = allInstitutions.find((i) => i.id === id);
      if (!inst) return;

      initRecords.push({
        id: `att-${meeting.id}-${id}-${index}`,
        meetingId: meeting.id,
        entityId: id,
        type: "MITRA_KERJA",
        status: "HADIR",
        name: inst.name,
        jabatan: "Utusan",
        institution: inst.name,
        displayFormat: `${inst.name} ® DINAS/INSTANSI`.toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Note: Tenaga Ahli usually manual, but if invited by ID we can add them here
    meeting.invitedTenagaAhliIds?.forEach((id, index) => {
      if (manualRecords.some((r) => r.entityId === id)) return;
      // Skip if not found
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
    allUsers.length,
    allAnggota.length,
    allInstitutions.length,
  ]); // Sync when essential invitation data OR user data (hydration) changes
}
