// // components/ui/akd-badge.tsx
// import { Chip } from "@heroui/chip";
// import { AKD } from "@/types/anggota-dewan";
// import { AKD_CONFIG } from "@/lib/config/akd";

// interface AKDBadgeProps {
//   akd: AKD;
//   size?: "sm" | "md";
// }

// export function AKDBadge({ akd, size = "sm" }: AKDBadgeProps) {
//   const config = AKD_CONFIG[akd];

//   if (!config) return null;

//   return (
//     <Chip
//       size={size}
//       variant="flat"
//       color={config.color}
//       className={config.className}
//     >
//       {config.label}
//     </Chip>
//   );
// }

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
