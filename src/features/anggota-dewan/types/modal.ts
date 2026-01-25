import { AnggotaDewanRow } from "@/features/anggota-dewan/view/anggota-dewan-row";

export type AnggotaModalState =
  | { type: "add" }
  | { type: "edit"; data: AnggotaDewanRow }
  | null;
