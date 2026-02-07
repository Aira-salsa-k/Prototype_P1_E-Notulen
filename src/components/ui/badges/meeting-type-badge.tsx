import { BaseBadge } from "./BaseBadge";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKD } from "@/types/anggota-dewan";

interface MeetingTypeBadgeProps {
  categoryName: string;
  subCategoryName?: string;
  color?: string; // "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg";
}

export function MeetingTypeBadge({
  categoryName,
  subCategoryName,
  color = "default",
  size = "sm",
}: MeetingTypeBadgeProps) {
  // Check if categoryName itself is an AKD key
  const akdConfig = AKD_CONFIG[categoryName as AKD];

  const resolvedLabel = akdConfig ? akdConfig.label : categoryName;
  const resolvedTone = akdConfig ? akdConfig.tone : color;

  const label = subCategoryName
    ? `${resolvedLabel} - ${subCategoryName}`
    : resolvedLabel;

  return (
    <BaseBadge
      label={label}
      className="border-none font-bold uppercase tracking-wide px-2"
      tone={resolvedTone as any}
      size={size}
    />
  );
}
