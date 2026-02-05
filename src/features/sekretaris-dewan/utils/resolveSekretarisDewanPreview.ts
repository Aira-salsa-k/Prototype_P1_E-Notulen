import { AnggotaDewan } from "@/types/anggota-dewan";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
import { format } from "date-fns";
import { SekretarisDewanPreviewData } from "../components/SekretarisDewanForm.preview";

export function resolveSekretarisDewanPreview(
  form: SekretarisDewanFormData,
): SekretarisDewanPreviewData {
  return {
    name: form.name || "Nama Belum Diisi",
    nip: form.nip || "-",
    jabatan: form.jabatan || "-",
    isActive: form.isActive,
    periode:
      form.periodeStart && form.periodeEnd
        ? `${format(new Date(form.periodeStart), "MMMM yyyy")} - ${format(
            new Date(form.periodeEnd),
            "MMMM yyyy",
          )}`
        : "-",
  };
}
