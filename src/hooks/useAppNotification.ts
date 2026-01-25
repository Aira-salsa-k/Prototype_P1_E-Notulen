// @/hooks/useAppNotification.ts
import { useState, useCallback } from "react";
import { AppNotificationState } from "@/types/notification";

export const useAppNotification = () => {
  const [notification, setNotification] = useState<AppNotificationState | null>(
    null,
  );

  const showNotification = useCallback(
    (type: AppNotificationState["type"], message: string) => {
      setNotification({ type, message });
      setTimeout(() => setNotification(null), 3000);
    },
    [],
  );

  return {
    notification,
    setNotification,
    showNotification,
  };
};
