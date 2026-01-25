

import { AnggotaDewan } from "@/types/anggota-dewan";
import { User } from "@/types/user";

export interface AnggotaDewanRow {
  id: string;
  anggota: AnggotaDewan;
  user: Pick<User, "username" | "isActive">;

  passwordStatus: "OK" | "NEEDS_RESET";
  temporaryPassword?: string;
}
