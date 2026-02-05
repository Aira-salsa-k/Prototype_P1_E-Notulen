import { Notulis } from "@/types/notulis";
import { User } from "@/types/user";
import { NotulisRow } from "../types/notulis-row";

export const resolveNotulisTable = (
  notulisList: Notulis[],
  users: User[],
): NotulisRow[] => {
  return notulisList.map((n) => {
    const user = users.find((u) => u.id === n.userID);

    const resolvedUser: User = user || {
      id: "unknown",
      username: "unknown",
      name: "Unknown Notulis",
      role: "NOTULIS",
      password: "",
      isActive: n.isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      id: n.id, // Add this for table keys
      notulis: n,
      user: resolvedUser,
      _meta: {
        originalNotulis: n,
        originalUser: resolvedUser,
      },
    };
  });
};
