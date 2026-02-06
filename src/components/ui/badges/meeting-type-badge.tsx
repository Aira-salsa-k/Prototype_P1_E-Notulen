// components/ui/badges/meeting-type-badge.tsx
import { BaseBadge } from "./BaseBadge";

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
  const label = subCategoryName
    ? `${categoryName} - ${subCategoryName}`
    : categoryName;

  return (
    <BaseBadge
      label={label}
      
      className="border-none font-bold uppercase tracking-wide px-2"
      tone={color as any}
      size={size}
    />
  );
}
