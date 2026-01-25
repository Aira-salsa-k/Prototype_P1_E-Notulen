
import { create } from "zustand";

type Notification = {
  type: "success" | "danger" | "warning";
  message: string;
} | null;

interface UIState {
  notification: Notification;
  showNotification: (
    type: "success" | "danger" | "warning",
    message: string,
  ) => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  notification: null,
  showNotification: (type, message) => {
    set({ notification: { type, message } });
    setTimeout(() => set({ notification: null }), 3000);
  },
  hideNotification: () => set({ notification: null }),
}));
