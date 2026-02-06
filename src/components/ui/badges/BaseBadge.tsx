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
      // Casting 'as any' diperlukan karena mapping string kita
      // mungkin lebih luas dari tipe internal HeroUI
      color={semanticToHeroColor[tone] as any}
      className={cn(
        "font-medium border-3", // Standar styling tambahan
        semanticToClassName[tone],
        className,
      )}
    >
      {label}
    </Chip>
  );
}
