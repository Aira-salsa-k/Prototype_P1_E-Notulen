// app/mocks/audit.ts
import { AuditLog, AuditAction } from "@/types/audit";

export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit-001",
    userId: "user-admin-001",
    userName: "Administrator",
    userRole: "ADMIN",
    action: "CREATE_MEETING",
    entityId: "meeting-001",
    entityType: "Meeting",
    description:
      "Membuat rapat baru: RAPAT KOMISI I MEMBAHAS RANCANGAN PERDA TENTANG PENDIDIKAN",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: new Date("2024-03-10T08:30:00"),
    metadata: {
      meetingTitle:
        "RAPAT KOMISI I MEMBAHAS RANCANGAN PERDA TENTANG PENDIDIKAN",
      room: "RUANG RAPAT KOMISI I - LANTAI 2",
    },
  },
  {
    id: "audit-002",
    userId: "user-notulis-001",
    userName: "Budi Santoso",
    userRole: "NOTULIS",
    action: "CREATE_NOTULEN",
    entityId: "section-001",
    entityType: "NotulenSection",
    description: "Menambahkan section notulen untuk KANISIUS KANGO, S.Sos",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: new Date("2024-03-15T09:00:00"),
    metadata: {
      participantName: "KANISIUS KANGO, S.Sos",
      meetingId: "meeting-001",
    },
  },
  {
    id: "audit-003",
    userId: "user-notulis-002",
    userName: "Siti Aminah",
    userRole: "NOTULIS",
    action: "UPDATE_NOTULEN",
    entityId: "point-005",
    entityType: "NotulenPoint",
    description: "Memperbarui point notulen untuk Dinas Pendidikan",
    ipAddress: "192.168.1.102",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    timestamp: new Date("2024-03-15T09:25:00"),
  },
  {
    id: "audit-004",
    userId: "user-notulis-001",
    userName: "Budi Santoso",
    userRole: "NOTULIS",
    action: "LOCK_SECTION",
    entityId: "section-001",
    entityType: "NotulenSection",
    description: "Mengunci section notulen untuk KANISIUS KANGO, S.Sos",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: new Date("2024-03-15T09:30:00"),
  },
  // (ini kalau ttd digital- tpi untuk sekarng belum)
//   {
//     id: "audit-005",
//     userId: "user-sekwan-001",
//     userName: "Dr. H. SUKARDI, S.H., M.H.",
//     userRole: "SEKWAN",
//     action: "SIGN_NOTULEN",
//     entityId: "minutes-001",
//     entityType: "MeetingMinutes",
//     description: "Menandatangani notulen rapat meeting-001",
//     ipAddress: "192.168.1.103",
//     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
//     timestamp: new Date("2024-03-15T14:00:00"),
//   },
];
