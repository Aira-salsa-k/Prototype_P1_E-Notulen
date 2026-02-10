import { BaseBadge } from "./BaseBadge";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKD } from "@/types/anggota-dewan";
import { SemanticTone } from "@/types";

interface MeetingTypeBadgeProps {
  categoryName: string;
  subCategoryName?: string;
  color?: SemanticTone;
  size?: "sm" | "md" | "lg";
}

export function MeetingTypeBadge({
  categoryName,
  subCategoryName,
  color = "neutral",
  size = "sm",
}: MeetingTypeBadgeProps) {
  // 1. Resolve configuration from AKD_CONFIG
  // Search by key first, then fallback to label matching
  const akdEntry =
    AKD_CONFIG[categoryName as AKD] ||
    Object.values(AKD_CONFIG).find(
      (config) => config.label.toLowerCase() === categoryName.toLowerCase(),
    );

  const resolvedLabel = akdEntry ? akdEntry.label : categoryName;
  const resolvedTone = akdEntry ? akdEntry.tone : color;

  // 2. Format label: "Category - Subcategory" or just "Category"
  const label = subCategoryName
    ? `${resolvedLabel} - ${subCategoryName}`
    : resolvedLabel;

  return <BaseBadge label={label} tone={resolvedTone} size={size} />;
}
