import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { mockUsers } from "@/mocks/user";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
}

interface AuthActions {
  login: (userId: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      currentUser: mockUsers[0],
      isAuthenticated: true,
      _hasHydrated: false,

      login: (userId: string) => {
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
