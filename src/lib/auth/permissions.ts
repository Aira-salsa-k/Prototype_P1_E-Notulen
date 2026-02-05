import { User } from "@/types/user";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";

/**
 * Enterprise Permission Logic
 * - ADMIN: Selalu punya akses penuh.
 * - SEKWAN: Punya akses Admin HANYA jika dalam rentang periode jabatannya.
 * - NOTULIS: Akses operasional terbatas (Mulai/Selesai Rapat).
 */

export function checkIsAdminLike(user: User | null): boolean {
  if (!user) return false;

  // 1. Super Admin
  if (user.role === "ADMIN") return true;

  // 2. Sekwan (Temporal Admin Check)
  if (user.role === "SEKWAN") {
    const profiles = generateMockSekretarisDewan();
    const profile = profiles.find((p) => p.userId === user.id);

    if (!profile || !profile.isActive) return false;

    const now = new Date();
    const start = new Date(profile.periodeStart);
    const end = new Date(profile.periodeEnd);

    return now >= start && now <= end;
  }

  return false;
}

export function canManageUsers(user: User | null): boolean {
  if (!user) return false;
  return checkIsAdminLike(user);
}

export function canManageLifecycle(user: User | null, meeting?: any): boolean {
  if (!user) return false;
  if (checkIsAdminLike(user)) return true;

  // Notulis can manage lifecycle (Start/Finish) unless it's already completed
  if (user.role === "NOTULIS") {
    if (meeting?.status === "completed") return false;
    return true;
  }

  return false;
}

export function canViewMeeting(user: User | null, meeting: any): boolean {
  if (!user) return false;
  if (checkIsAdminLike(user)) return true;

  if (user.role === "NOTULIS") {
    return meeting.notulisIds?.includes(user.id);
  }

  if (user.role === "SEKWAN") {
    const profiles = generateMockSekretarisDewan();
    const profile = profiles.find((p) => p.userId === user.id);
    return meeting.sekretarisId === profile?.id;
  }

  if (user.role === "ANGGOTA_DEWAN") {
    return meeting.invitedAnggotaDewanIds?.includes(user.id);
  }

  return false;
}

export function canEditMeeting(user: User | null, meeting: any): boolean {
  if (!user) return false;
  if (checkIsAdminLike(user)) return true;

  // Notulis can edit if meeting is not completed (Live is okay)
  if (user.role === "NOTULIS") {
    return (
      meeting.notulisIds?.includes(user.id) && meeting.status !== "completed"
    );
  }

  return false;
}

export function canDeleteMeeting(user: User | null, meeting: any): boolean {
  if (!user) return false;
  if (checkIsAdminLike(user)) return true;

  // Notulis cannot delete completed or live meetings
  if (user.role === "NOTULIS") {
    return (
      (meeting.notulisIds?.includes(user.id) ||
        meeting.createdBy === user.id) &&
      meeting.status !== "completed" &&
      meeting.status !== "live"
    );
  }

  return false;
}

export function canEditJenisRapat(user: User | null): boolean {
  if (!user) return false;
  return checkIsAdminLike(user) || user.role === "NOTULIS";
}

export function canDeleteJenisRapat(user: User | null): boolean {
  if (!user) return false;
  return checkIsAdminLike(user) || user.role === "NOTULIS";
}

export function canResetPassword(user: User | null): boolean {
  if (!user) return false;
  return checkIsAdminLike(user) || user.role === "NOTULIS";
}

export function canAddMitraKerja(user: User | null): boolean {
  if (!user) return false;
  return checkIsAdminLike(user) || user.role === "NOTULIS";
}
