import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";
import { mockUsers } from "@/mocks/user";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  actions: {
    login: (userId: string) => boolean;
    logout: () => void;
    setHasHydrated: (state: boolean) => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      _hasHydrated: false,
      actions: {
        login: (userId: string) => {
          const user = mockUsers.find((u) => u.id === userId);
          if (user) {
            set({ currentUser: user, isAuthenticated: true });
            return true;
          }
          return false;
        },
        logout: () => {
          set({ currentUser: null, isAuthenticated: false });
        },
        setHasHydrated: (state) => set({ _hasHydrated: state }),
      },
    }),
    {
      name: "auth-storage-global", // slightly different name to avoid collision if both co-exist
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true);
      },
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const useAuth = () => {
  const state = useAuthStore();
  return {
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    _hasHydrated: state._hasHydrated,
    ...state.actions,
  };
};
