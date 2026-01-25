// @/types/notification.ts
export type AppNotificationType = "success" | "danger" | "warning";

export interface AppNotificationState {
  type: AppNotificationType;
  message: string;
}
