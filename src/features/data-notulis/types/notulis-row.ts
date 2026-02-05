import { Notulis } from "@/types/notulis";
import { User } from "@/types/user";

export interface NotulisRow {
  id: string; // Add this for table keys
  notulis: Notulis;
  user: User;

  _meta: {
    originalNotulis: Notulis;
    originalUser: User;
  };
}
