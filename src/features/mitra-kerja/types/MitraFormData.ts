import { AKD } from "@/types";
export interface MitraFormData {
  name: string;
  akdID: AKD;
  status: "active" | "inactive";
}
