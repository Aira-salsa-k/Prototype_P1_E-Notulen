import { Chip } from "@heroui/chip";
import { cn } from "@/lib/utils/clsx";

export type MeetingStatus = "scheduled" | "live" | "completed";

interface MeetingStatusBadgeProps {
  status: MeetingStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const STATUS_CONFIG: Record<
  MeetingStatus,
  {
    label: string;
    color: "primary" | "danger" | "default";
    className: string;
  }
> = {
  scheduled: {
    label: "Terjadwal",
    color: "primary",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  live: {
    label: "Sedang Berlangsung",
    color: "danger",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  completed: {
    label: "Selesai",
    color: "default",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

/**
 * MeetingStatusBadge - Enterprise-grade badge component for meeting status
 *
 * @example
 * ```tsx
 * <MeetingStatusBadge status="live" />
 * <MeetingStatusBadge status="scheduled" size="md" />
 * ```
 */
export function MeetingStatusBadge({
  status,
  size = "sm",
  className,
}: MeetingStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Chip
      color={config.color}
      variant="flat"
      size={size}
      className={cn(
        "font-bold capitalize px-2 h-7",
        config.className,
        className,
      )}
    >
      {config.label}
    </Chip>
  );
}
