import { AKD } from "@/types";

export interface AnggotaFormData {
//   id?: string;
//   userId?: string;
  name: string;
  jabatan:string;
  akd: AKD[];
  status: "active" | "inactive";

  username: string;
  password: string;
}

export const defaultAnggotaFormData: AnggotaFormData = {
  name: "",
  jabatan: "",
  akd: [],
  username: "",
  password: "",
  status: "active",
};