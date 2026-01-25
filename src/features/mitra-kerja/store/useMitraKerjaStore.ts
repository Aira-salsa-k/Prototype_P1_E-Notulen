// features/mitra-kerja/store/useMitraStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MitraInstitution } from "@/types";

type Updater<T> = T | ((prev: T) => T);

interface MitraState {
  institutions: MitraInstitution[];
  isInitialized: boolean;
  setInstitutions: (data: Updater<MitraInstitution[]>) => void;
  markAsInitialized: () => void;
}

export const useMitraStore = create<MitraState>()(
  persist(
    (set) => ({
      institutions: [],
      isInitialized: false,
      setInstitutions: (fn) =>
        set((state) => ({
          institutions: typeof fn === "function" ? fn(state.institutions) : fn,
        })),
      markAsInitialized: () => set({ isInitialized: true }),
    }),
    {
      name: "mitra-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
