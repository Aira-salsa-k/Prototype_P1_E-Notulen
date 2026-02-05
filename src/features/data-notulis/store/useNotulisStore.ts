import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { Notulis } from "@/types/notulis";

type Updater<T> = T | ((prev: T) => T);

interface NotulisState {
  notulisList: Notulis[];
  users: User[];
  isInitialized: boolean;
  _hasHydrated: boolean;

  // Separation of actions
  setNotulisList: (fn: Updater<Notulis[]>) => void;
  setUsers: (fn: Updater<User[]>) => void;
  markAsInitialized: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useNotulisStore = create<NotulisState>()(
  persist(
    (set) => ({
      notulisList: [],
      users: [],
      isInitialized: false,
      _hasHydrated: false,

      setNotulisList: (fn) =>
        set((state) => ({
          notulisList: typeof fn === "function" ? fn(state.notulisList) : fn,
        })),

      setUsers: (fn) =>
        set((state) => ({
          users: typeof fn === "function" ? fn(state.users) : fn,
        })),

      markAsInitialized: () => set({ isInitialized: true }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "notulis-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
