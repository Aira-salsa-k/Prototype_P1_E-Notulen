import { AnggotaDewan } from "@/types/anggota-dewan";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
import { format } from "date-fns";
import { SekretarisDewanPreviewData } from "../components/SekretarisDewanForm.preview";

export function resolveSekretarisDewanPreview(
  form: SekretarisDewanFormData,
  anggota: AnggotaDewan[],
): SekretarisDewanPreviewData {
  const person = anggota.find((a) => a.userId === form.userId);

  return {
    name: person?.name ?? "Belum dipilih",
    jabatan: form.jabatan || "-",
    isActive: form.isActive,
    periode:
      form.periodeStart && form.periodeEnd
        ? `${format(form.periodeStart, "yyyy")} - ${format(
            form.periodeEnd,
            "yyyy",
          )}`
        : "-",
  };
}
