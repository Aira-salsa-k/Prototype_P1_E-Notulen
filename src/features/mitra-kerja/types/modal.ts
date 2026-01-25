import { MitraInstitution } from "@/types";

export type MitraKerjaModalState =
  | { type: "add" }
  | { type: "edit"; data: MitraInstitution }
  | null;
