// features/anggota-dewan/hooks/useAnggotaForm.ts
import { useFormBase } from "@/hooks/useFormBase"; // Import dari pusat
import { AnggotaFormData, defaultAnggotaFormData } from "../types/AnggotaFormData";

export function useAnggotaForm(
  initialData: AnggotaFormData | undefined,
  isOpen: boolean,
) {
  return useFormBase<AnggotaFormData>({
    initialData,
    isOpen,
    defaultData: defaultAnggotaFormData,
  });
}
