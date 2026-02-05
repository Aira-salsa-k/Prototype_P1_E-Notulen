import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KopSuratConfig } from "../types";

interface KopSuratStore {
  config: KopSuratConfig;
  updateConfig: (config: Partial<KopSuratConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: KopSuratConfig = {
  logoUrl: "/logo-dprk.png",
  institutionName: "DEWAN PERWAKILAN RAKYAT DAERAH",
  districtName: "KABUPATEN KEEROM",
  address: "Jl. Trans Papua No. ...",
  phone: "...",
  email: "...",
  postalCode: "99468",
};

export const useKopSuratStore = create<KopSuratStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateConfig: (newConfig) =>
        set((state) => ({ config: { ...state.config, ...newConfig } })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: "kop-surat-storage",
    },
  ),
);
