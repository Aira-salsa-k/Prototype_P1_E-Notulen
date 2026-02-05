//deep
// app/types/user.ts
export type UserRole = "ADMIN" | "NOTULIS" | "ANGGOTA_DEWAN" | "SEKWAN";

export interface User {
  id: string;
  username: string;
  password: string; // hashed
  role: UserRole;

  name: string;
  email?: string; //opsional perlu email pa tidak
  avatar?: string;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserRoleAssignment {
  id: string;
  userId: string;
  role: UserRole;

  validFrom: Date;
  validUntil?: Date; // null = aktif terus
  isActive: boolean;

  assignedBy: string; // adminId
}
