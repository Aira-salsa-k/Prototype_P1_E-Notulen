import { useState, useEffect } from "react";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { useAttendance } from "@/features/notulen/hooks/useAttendance";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { Meeting } from "@/types/meeting";

export function useMeetingDetail(meetingId: string, role: string) {
  const {
    meetings,
    isInitialized: rapatInit,
    _hasHydrated: rapatHydrated,
    actions: meetingActions,
  } = useDataRapatStore();
  const {
    categories,
    variants,
    isInitialized: jenisInit,
    _hasHydrated: jenisHydrated,
    actions: jenisActions,
  } = useJenisRapatStore();
  const {
    notulisList: allNotulisProfiles,
    users: allNotulisUsers,
    isInitialized: notulisInit,
    _hasHydrated: notulisHydrated,
    ...notulisActions
  } = useNotulisStore();
  const { actions: notulenActions } = useNotulenStore();
  const {
    anggota: allAnggota,
    users: allUsers,
    isInitialized: anggotaInit,
    _hasHydrated: anggotaHydrated,
    ...anggotaActions
  } = useAnggotaStore();
  const {
    sekretarisDewan: allSekwanProfiles,
    users: allSekwanUsers,
    isInitialized: sekwanInit,
    _hasHydrated: sekwanHydrated,
    ...sekwanActions
  } = useSekretarisDewanStore();

  const consolidatedUsers = [
    ...allNotulisUsers,
    ...allSekwanUsers,
    ...allUsers,
  ];

  // 1. Data Loading / Hydration Guard
  // Enhanced check: Wait for actual DATA, not just hydration flag
  const isHydrating =
    !rapatHydrated ||
    !anggotaHydrated ||
    !notulisHydrated ||
    (anggotaHydrated && allAnggota.length === 0);

  // Safety Net: If hydration finishes but data is empty, force populate locally
  useEffect(() => {
    // 1. Anggota & Base Users
    if (anggotaHydrated && allAnggota.length === 0) {
      import("@/mocks/anggota-dewan").then((m) => {
        anggotaActions.setAnggota(m.generateMockAnggota());
      });
      import("@/mocks/user").then((m) => {
        anggotaActions.setUsers(m.mockUsers);
      });
      anggotaActions.markAsInitialized();
    }

    // 2. Sekwan
    if (sekwanHydrated && allSekwanProfiles.length === 0) {
      import("@/mocks/sekretaris-dewan").then((m) => {
        sekwanActions.setSekretarisDewan(m.generateMockSekretarisDewan());
      });
      import("@/mocks/user").then((m) => {
        sekwanActions.setUsers(m.mockUsers);
      });
      sekwanActions.markAsInitialized();
    }

    // 3. Notulis
    if (notulisHydrated && allNotulisUsers.length === 0) {
      import("@/mocks/notulis").then((m) => {
        notulisActions.setNotulisList(m.mockNotulis);
      });
      import("@/mocks/user").then((m) => {
        notulisActions.setUsers(m.mockUsers);
      });
      notulisActions.markAsInitialized();
    }
  }, [
    anggotaHydrated,
    allAnggota.length,
    anggotaActions,
    sekwanHydrated,
    allSekwanProfiles.length,
    sekwanActions,
    notulisHydrated,
    allNotulisUsers.length,
    notulisActions,
  ]);

  // Source meeting directly from store to avoid local state hydration delays
  const meeting = meetings.find((m) => m.id === meetingId) || null;

  // Derive all data from stores instead of mocks
  const variant = variants.find((v) => v.id === meeting?.subMeetingCategoryID);
  const category = categories.find((c) => c.id === meeting?.meetingCategoryID);

  const sekwanProfile = allSekwanProfiles.find(
    (s) => s.id === meeting?.sekretarisId || s.userId === meeting?.sekretarisId,
  );
  const sekwanUserId = sekwanProfile
    ? sekwanProfile.userId
    : meeting?.sekretarisId;
  const sekwanUser = allSekwanUsers.find((u) => u.id === sekwanUserId);

  const notulisUsers =
    meeting?.notulisIds
      ?.map((id) => {
        // 1. Try find direct user in NOTULIS store users
        const user = allNotulisUsers.find((u) => u.id === id);
        if (user) return user;

        // 2. Try find via notulis profile
        const profile = allNotulisProfiles.find(
          (n) => n.id === id || n.userID === id,
        );
        if (profile) {
          return allNotulisUsers.find((u) => u.id === profile.userID);
        }
        return null;
      })
      .filter((u): u is NonNullable<typeof u> => u !== null) || [];

  // Robust Signatories Resolution
  // Iterate over the invited IDs directly to guarantee we try to resolve every invitation
  const signatories = (meeting?.invitedAnggotaDewanIds || [])
    .map((invitedId) => {
      // 1. Try to find the Anggota entity (checking both ID types)
      const anggota = allAnggota.find(
        (a) => a.id === invitedId || a.userId === invitedId,
      );

      // 2. Identify the User ID (preferred key)
      const userId = anggota ? anggota.userId : invitedId;

      // 3. Find the User entity (source of Name)
      const user = consolidatedUsers.find((u) => u.id === userId);

      // 4. Return resolved object if we found at least something
      if (!user && !anggota) return null;

      return {
        id: userId, // Match pimpinanRapatId format (User ID)
        anggotaId: anggota?.id,
        name: user?.name || "Anggota (Nama Tidak Ditemukan)",
        jabatan: anggota?.jabatan,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Also include useAttendance here as it depends on meeting
  const { records: participants } = useAttendance(meeting || ({} as Meeting));

  // Initialize Notulen
  useEffect(() => {
    if (meetingId) {
      notulenActions.initializeMeeting(meetingId);
    }
  }, [meetingId, notulenActions]);

  // Auto-set Pimpinan if missing
  useEffect(() => {
    if (
      meeting &&
      role !== "anggota_dewan" &&
      !meeting.pimpinanRapatId &&
      meeting.invitedAnggotaDewanIds &&
      meeting.invitedAnggotaDewanIds.length > 0
    ) {
      meetingActions.updateMeeting(meeting.id, {
        pimpinanRapatId: meeting.invitedAnggotaDewanIds[0],
      });
    }
  }, [meetingId, meeting?.pimpinanRapatId, role, meetingActions]); // Careful with dependencies

  return {
    meeting,
    participants,
    isHydrating,
    relations: {
      category,
      variant,
      sekwanUser,
      sekwanProfile,
      notulisUsers,
      signatories,
    },
  };
}
