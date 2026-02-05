// @/features/sekretaris-dewan/store/useSekretarisDewanStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { User } from "@/types/user";

type Updater<T> = T | ((prev: T) => T);

interface SekretarisDewanState {
  sekretarisDewan: SekretarisDewanProfile[];
  users: User[];
  isInitialized: boolean;
  _hasHydrated: boolean;
  setSekretarisDewan: (fn: Updater<SekretarisDewanProfile[]>) => void;
  setUsers: (fn: Updater<User[]>) => void;
  markAsInitialized: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useSekretarisDewanStore = create<SekretarisDewanState>()(
  persist(
    (set) => ({
      sekretarisDewan: [],
      users: [],
      isInitialized: false,
      _hasHydrated: false,
      setSekretarisDewan: (fn) =>
        set((state) => ({
          sekretarisDewan:
            typeof fn === "function" ? fn(state.sekretarisDewan) : fn,
        })),
      setUsers: (fn) =>
        set((state) => ({
          users: typeof fn === "function" ? fn(state.users) : fn,
        })),
      markAsInitialized: () => set({ isInitialized: true }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "sekwan-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
