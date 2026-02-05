import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { User } from "@/types/user";
import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";
import { format } from "date-fns";

export function resolveSekretarisDewan(
  profiles: SekretarisDewanProfile[],
  users: User[],
): SekretarisDewanRow[] {
  return profiles.map((profile) => {
    const user = users.find((u) => u.id === profile.userId);

    return {
      id: profile.id,
      name: user?.name ?? "—",
      username: user?.username ?? "—",
      nip: profile.nip,
      jabatan: profile.jabatan,
      periode: `${format(profile.periodeStart, "MMMM yyyy")} - ${format(profile.periodeEnd, "MMMM yyyy")}`,
      isActive: profile.isActive,

      _meta: {
        originalProfile: profile,
      },
    };
  });
}
