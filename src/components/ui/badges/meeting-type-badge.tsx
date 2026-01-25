// components/ui/meeting-type-badge.tsx
import { BaseBadge } from "./BaseBadge";
import { MeetingCategory } from "@/types/meeting";

export function MeetingTypeBadge({
  type,
  size,
}: {
  type: MeetingCategory;
  size?: "sm" | "md";
}) {
  return (
    <BaseBadge
      label={type.name}
      className="border-2"
      tone={type.color}
      size={size}
    />
  );
}
