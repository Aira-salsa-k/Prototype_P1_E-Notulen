// app/utils/resolveAnggotaDewan.ts
import { AnggotaDewan } from "@/types/anggota-dewan";
import { User } from "@/types/user";
import { AnggotaDewanRow } from "@/features/anggota-dewan/view/anggota-dewan-row";

export function resolveAnggotaDewanTable(
  anggota: AnggotaDewan[],
  users: User[],
): AnggotaDewanRow[] {
  return anggota.map((a) => {
    const user = users.find((u) => u.id === a.userId);

    return {
      id: a.id,
      anggota: a,
      user: {
        username: user?.username ?? "-",
        name: user?.name ?? "-",
        isActive: user?.isActive ?? false,
      },
      passwordStatus: "OK",
    };
  });
}
