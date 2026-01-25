import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";
export type SekretarisDewanModalState =
  | { type: "add" }
  | { type: "edit"; data: SekretarisDewanRow }
  | null;
