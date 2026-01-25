// @/components/shared/AppNotification.tsx
"use client";

import { Alert } from "@heroui/react";

interface AppNotificationProps {
  notification: {
    type: "success" | "danger" | "warning";
    message: string;
  } | null;
  onClose: () => void;
}

export function AppNotification({
  notification,
  onClose,
}: AppNotificationProps) {
  if (!notification) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] min-w-[320px] max-w-md pointer-events-auto
                    animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out"
    >
      <Alert
        color={notification.type}
        title={notification.type === "success" ? "Berhasil" : "Gagal"}
        description={notification.message}
        variant="flat"
        onClose={onClose}
        classNames={{
          base: "shadow-2xl border-1 border-default-200 backdrop-blur-md bg-background/90",
          title: "font-bold",
        }}
      />
    </div>
  );
}
