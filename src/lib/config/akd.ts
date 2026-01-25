import { AKD } from "@/types/anggota-dewan";
import { SemanticTone } from "@/types";

export const AKD_CONFIG: Record<
  AKD,
  {
    label: string;
    tone: SemanticTone;
  }
> = {
  KOMISI_I: { label: "Komisi I", tone: "info" },
  KOMISI_II: { label: "Komisi II", tone: "secondary" },
  KOMISI_III: { label: "Komisi III", tone: "success" },
  BADAN_MUSYAWARAH: { label: "BANMUS", tone: "warning" },
  BADAN_ANGGARAN: { label: "BANGGAR", tone: "neutral" },
  BADAN_KEHORMATAN: { label: "BK", tone: "accent" },
  BADAN_PEMBENTUKAN_PERATURAN_DAERAH: {
    label: "BAPEMPERDA",
    tone: "lime",
  },
  PANITIA_KHUSUS: {
    label: "PANSUS",
    tone: "cyan",
  },
};
