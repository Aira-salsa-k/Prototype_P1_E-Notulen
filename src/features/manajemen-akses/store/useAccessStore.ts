import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccessState {
  globalAccess: boolean;
  notulisAccessMode: "all" | "custom";
  allowedNotulisIds: string[];
  _hasHydrated: boolean;
}

interface AccessActions {
  toggleGlobalAccess: () => void;
  setNotulisAccessMode: (mode: "all" | "custom") => void;
  toggleNotulisAccess: (notulisId: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAccessStore = create<AccessState & AccessActions>()(
  persist(
    (set) => ({
      globalAccess: true,
      notulisAccessMode: "all",
      allowedNotulisIds: [],
      _hasHydrated: false,

      toggleGlobalAccess: () =>
        set((state) => ({ globalAccess: !state.globalAccess })),

      setNotulisAccessMode: (mode) => set({ notulisAccessMode: mode }),

      toggleNotulisAccess: (notulisId) =>
        set((state) => {
          const exists = state.allowedNotulisIds.includes(notulisId);
          return {
            allowedNotulisIds: exists
              ? state.allowedNotulisIds.filter((id) => id !== notulisId)
              : [...state.allowedNotulisIds, notulisId],
          };
        }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "access-management-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        globalAccess: state.globalAccess,
        notulisAccessMode: state.notulisAccessMode,
        allowedNotulisIds: state.allowedNotulisIds,
      }),
    },
  ),
);
