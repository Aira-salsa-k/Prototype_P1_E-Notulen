// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

// interface SekretarisDewanState {
//   sekretarisDewan: SekretarisDewanProfile[];
//   setSekretarisDewan: (profiles: SekretarisDewanProfile[]) => void;
//   addSekretarisDewan: (profile: SekretarisDewanProfile) => void;
//   updateSekretarisDewan: (id: string, profile: Partial<SekretarisDewanProfile>) => void;
//   deleteSekretarisDewan: (id: string) => void;
//   isInitialized: boolean;
// }

// export const useSekretarisDewanStore = create<SekretarisDewanState>()(
//   persist(
//     (set) => ({
//       sekretarisDewan: [],
//       isInitialized: false,
//       setSekretarisDewan: (sekretarisDewan) => set({ sekretarisDewan }),
//       addSekretarisDewan: (profile) =>
//         set((state) => ({
//           sekretarisDewan: [...state.sekretarisDewan, profile],
//         })),
//       updateSekretarisDewan: (id, updated) =>
//         set((state) => ({
//           sekretarisDewan: state.sekretarisDewan.map((s) =>
//             s.id === id ? { ...s, ...updated } : s,
//           ),
//         })),
//       deleteSekretarisDewan: (id) =>
//         set((state) => ({
//           sekretarisDewan: state.sekretarisDewan.filter((s) => s.id !== id),
//         })),
//       markAsInitialized: () => set({ isInitialized: true }),

//     }),
//     {
//       name: "sekretaris-dewan-storage",
//     },
//   ),
// );

// @/features/sekretaris-dewan/store/useSekretarisDewanStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

type Updater<T> = T | ((prev: T) => T);

interface SekretarisDewanState {
  sekretarisDewan: SekretarisDewanProfile[];
  isInitialized: boolean;
  setSekretarisDewan: (fn: Updater<SekretarisDewanProfile[]>) => void;
  markAsInitialized: () => void;
}

export const useSekretarisDewanStore = create<SekretarisDewanState>()(
  persist(
    (set) => ({
      sekretarisDewan: [],
      isInitialized: false,
      setSekretarisDewan: (fn) =>
        set((state) => ({
          sekretarisDewan: typeof fn === "function" ? fn(state.sekretarisDewan) : fn,
        })),
      markAsInitialized: () => set({ isInitialized: true }),
    }),
    {
      name: "sekwan-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);