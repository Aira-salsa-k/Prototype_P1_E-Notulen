// app/types/common.ts
import { Meeting } from "./meeting";
import { AttendanceStatus } from "./attendance";
export type SemanticTone =
  | "info"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "accent"
  | "teal"
  | "cyan"
  | "indigo"
  | "lime";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter types
export interface MeetingFilter {
  status?: Meeting["status"][];
  category?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface AttendanceFilter {
  status?: AttendanceStatus[];
  entityType?: ("anggota_dewan" | "mitra_kerja" | "tenaga_ahli")[];
  search?: string;
}
