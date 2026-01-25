
// app/types/realtime.ts
import { UserRole, NotulenProgress } from "../types";
export interface CollaborationSession {
  meetingId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  sectionId?: string;
  isActive: boolean;
  lastActivity: Date;
}

export interface RealtimeUpdate<T> {
  type: "CREATE" | "UPDATE" | "DELETE" | "LOCK" | "UNLOCK";
  entity: string; // 'notulen-point' | 'section' | 'attendance'
  data: T;
  userId: string;
  timestamp: Date;
}

export interface NotulenProgressUpdate {
  meetingId: string;
  sectionId: string;
  isLocked: boolean;
  lockedBy?: string;
  progress: NotulenProgress;
}
