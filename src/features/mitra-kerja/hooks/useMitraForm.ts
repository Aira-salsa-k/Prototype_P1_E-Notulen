// app/components/mitra-kerja/hooks/useMitraForm.ts
import { useFormBase } from "@/hooks/useFormBase";
import { MitraFormData } from "../types/MitraFormData";

export const defaultMitraFormData: MitraFormData = {
  name: "",
  akdID: "KOMISI_I",
  status: "active",
};

export function useMitraForm(
  initialData: MitraFormData | undefined,
  isOpen: boolean,
) {
  return useFormBase<MitraFormData>({
    initialData,
    isOpen,
    defaultData: defaultMitraFormData,
  });
}

