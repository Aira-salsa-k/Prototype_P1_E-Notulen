import { Chip } from "@heroui/chip";
import {
  semanticToHeroColor,
  semanticToClassName,
} from "@/lib/semantic/semantic-chip";
import { SemanticTone } from "@/types";
import { cn } from "@/lib/utils/clsx";

interface BaseBadgeProps {
  label: string;
  tone?: SemanticTone;
  size?: "sm" | "md" | "lg";
  className?: string; // Menambahkan fleksibilitas styling dari luar
}

export function BaseBadge({
  label,
  tone = "neutral",
  size = "sm",
  className,
}: BaseBadgeProps) {
  return (
    <Chip
      size={size}
      variant="bordered"
      color={semanticToHeroColor[tone] as any}
      className={cn(
        "font-bold uppercase tracking-wide px-2 border-2", // Enterprise Standard Styling
        semanticToClassName[tone],
        className,
      )}
    >
      {label}
    </Chip>
  );
}
