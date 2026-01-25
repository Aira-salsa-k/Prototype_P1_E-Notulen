// app/types/audit.ts
import { UserRole } from "./user";
export type AuditAction =
  | "CREATE_MEETING"
  | "UPDATE_MEETING"
  | "DELETE_MEETING"
  | "UPDATE_ATTENDANCE"
  | "CREATE_NOTULEN"
  | "UPDATE_NOTULEN"
  | "SIGN_NOTULEN"
  | "LOCK_SECTION"
  | "UNLOCK_SECTION"
  | "CHANGE_ACCESS_CONTROL"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT_PDF";

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: AuditAction;
  entityId?: string;
  entityType?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
