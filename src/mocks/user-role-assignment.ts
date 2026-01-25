import { UserRoleAssignment } from "@/types/user";

export const mockUserRoleAssignments: UserRoleAssignment[] = [
  {
    id: "ura-admin-001",
    userId: "user-admin-001",
    role: "ADMIN",
    validFrom: new Date("2023-01-01"),
    isActive: true,
    assignedBy: "system",
  },

  {
    id: "ura-notulis-001",
    userId: "user-notulis-001",
    role: "NOTULIS",
    validFrom: new Date("2023-01-01"),
    validUntil: new Date("2027-12-31"),
    isActive: true,
    assignedBy: "user-admin-001",
  },

  // ANGGOTA
  {
    id: "ura-anggota-001",
    userId: "user-anggota-001",//kanisius
    role: "ANGGOTA_DEWAN",
    validFrom: new Date("2024-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },
  {
    id: "ura-anggota-002",
    userId: "user-anggota-002",//imam
    role: "ANGGOTA_DEWAN",
    validFrom: new Date("2024-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },
  {
    id: "ura-anggota-003",
    userId: "user-anggota-003",//sigit
    role: "ANGGOTA_DEWAN",
    validFrom: new Date("2024-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },
  {
    id: "ura-anggota-004",
    userId: "user-anggota-004",//jacobus mekawa
    role: "ANGGOTA_DEWAN",
    validFrom: new Date("2024-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },

  // DORIS = ADMIN + ANGGOTA
  {
    id: "ura-anggota-doris",
    userId: "user-anggota-005",
    role: "ANGGOTA_DEWAN",
    validFrom: new Date("2024-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },
  {
    id: "ura-admin-doris",
    userId: "user-anggota-005",
    role: "ADMIN",
    validFrom: new Date("2023-01-01"),
    validUntil: new Date("2027-12-31"),
    isActive: true,
    assignedBy: "user-admin-001",
  },

  {
    id: "ura-notulis-002",
    userId: "user-notulis-002",
    role: "NOTULIS",
    validFrom: new Date("2023-01-01"),
    isActive: true,
    assignedBy: "user-admin-001",
  },
];
