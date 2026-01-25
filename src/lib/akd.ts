// lib/akd.ts
import { AKD } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";

export const AKD_OPTIONS = Object.entries(AKD_CONFIG).map(
  ([value, config]) => ({
    value: value as AKD,
    label: config.label,
  })
);
