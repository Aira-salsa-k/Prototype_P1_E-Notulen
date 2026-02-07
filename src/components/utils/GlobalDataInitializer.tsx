"use client";

import { useEffect } from "react";
import { useDataRapatStore } from "@/features/data-rapat/store/useDataRapatStore";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useMitraStore } from "@/features/mitra-kerja/store/useMitraKerjaStore";

// Mocks
import { mockMeetings } from "@/mocks/meeting";
import { mockMeetingTypeVariants } from "@/mocks/meeting-variants";
import { mockMeetingCategories } from "@/mocks/meeting-category";
import { mockNotulis } from "@/mocks/notulis";
import { mockUsers } from "@/mocks/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { mockMitraInstitutions } from "@/mocks/mitra-kerja";

/**
 * Ensures all stores are initialized with mock data if they are empty.
 * This is placed in the main dashboard layout to guarantee data availability
 * across all sub-pages (List, Detail, Notulensi, etc.)
 */
export function GlobalDataInitializer() {
  const rapat = useDataRapatStore();
  const jenis = useJenisRapatStore();
  const notulis = useNotulisStore();
  const sekwan = useSekretarisDewanStore();
  const anggota = useAnggotaStore();
  const mitra = useMitraStore();

  useEffect(() => {
    // 1. Data Rapat
    if (rapat._hasHydrated && rapat.meetings.length === 0) {
      rapat.actions.setMeetings(mockMeetings);
      rapat.actions.markAsInitialized();
    }

    // 2. Jenis Rapat
    if (jenis._hasHydrated && jenis.categories.length === 0) {
      jenis.actions.setCategories(mockMeetingCategories);
      jenis.actions.setVariants(mockMeetingTypeVariants);
      jenis.actions.markAsInitialized();
    }

    // 3. Notulis
    if (notulis._hasHydrated && notulis.notulisList.length === 0) {
      notulis.setNotulisList(mockNotulis);
      notulis.setUsers(mockUsers);
      notulis.markAsInitialized();
    }

    // 4. Sekwan
    if (sekwan._hasHydrated && sekwan.sekretarisDewan.length === 0) {
      sekwan.setSekretarisDewan(generateMockSekretarisDewan());
      sekwan.setUsers(mockUsers);
      sekwan.markAsInitialized();
    }

    // 5. Anggota
    if (anggota._hasHydrated && anggota.anggota.length === 0) {
      anggota.setAnggota(generateMockAnggota());
      anggota.setUsers(mockUsers);
      anggota.markAsInitialized();
    }

    // 6. Mitra
    if (mitra._hasHydrated && mitra.institutions.length === 0) {
      mitra.setInstitutions(mockMitraInstitutions);
      mitra.markAsInitialized();
    }
  }, [
    rapat._hasHydrated,
    rapat.meetings.length,
    jenis._hasHydrated,
    jenis.categories.length,
    notulis._hasHydrated,
    notulis.notulisList.length,
    sekwan._hasHydrated,
    sekwan.sekretarisDewan.length,
    anggota._hasHydrated,
    anggota.anggota.length,
    mitra._hasHydrated,
    mitra.institutions.length,
  ]);

  return null;
}
