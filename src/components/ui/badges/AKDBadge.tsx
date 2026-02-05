

import { AKD } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";
import { BaseBadge } from "./BaseBadge";

export function AKDBadge({ akd, size }: { akd: AKD; size?: "sm" | "md" }) {
  const config = AKD_CONFIG[akd];
  if (!config) return null;

  return (
    <BaseBadge
      className="border-1"
      label={config.label}
      tone={config.tone}
      size={size}
    />
  );
}
