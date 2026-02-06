import { create } from "zustand";

type Notification = {
  type: "success" | "danger" | "warning";
  message: string;
} | null;

interface UIState {
  notification: Notification;
  isSidebarCollapsed: boolean;
  showNotification: (
    type: "success" | "danger" | "warning",
    message: string,
  ) => void;
  hideNotification: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  notification: null,
  isSidebarCollapsed: true, // Default to collapsed
  showNotification: (type, message) => {
    set({ notification: { type, message } });
    setTimeout(() => set({ notification: null }), 3000);
  },
  hideNotification: () => set({ notification: null }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
}));
