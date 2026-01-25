// @/components/shared/GlobalNotification.tsx
"use client";

import { useUIStore } from "@/store/useUIStore";
import { AppNotification } from "@/components/shared/AppNotification";

export function GlobalNotification() {
  const { notification, hideNotification } = useUIStore();

  // Karena ini client component, dia aman menggunakan Zustand
  return (
    <AppNotification notification={notification} onClose={hideNotification} />
  );
}
