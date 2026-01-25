

// @/store/useAnggotaStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AnggotaDewan } from "@/types/anggota-dewan";
import { User } from "@/types";

type Updater<T> = T | ((prev: T) => T);

interface AnggotaState {
  anggota: AnggotaDewan[];
  users: User[];
  isInitialized: boolean;
  setAnggota: (data: Updater<AnggotaDewan[]>) => void;
  setUsers: (data: Updater<User[]>) => void;
  markAsInitialized: () => void;
}

export const useAnggotaStore = create<AnggotaState>()(
  persist(
    (set) => ({
      anggota: [],
      users: [],
      isInitialized: false,
      setAnggota: (fn) =>
        set((state) => ({
          anggota: typeof fn === "function" ? fn(state.anggota) : fn,
        })),
      setUsers: (fn) =>
        set((state) => ({
          users: typeof fn === "function" ? fn(state.users) : fn,
        })),
      markAsInitialized: () => set({ isInitialized: true }),
    }),
    {
      name: "anggota-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);