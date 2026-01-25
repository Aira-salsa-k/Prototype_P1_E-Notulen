import { Chip } from "@heroui/chip";

export type Status = "active" | "inactive";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: "success" | "danger" }
> = {
  active: {
    label: "Aktif",
    color: "success",
  },
  inactive: {
    label: "Non-Aktif",
    color: "danger",
  },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Chip size={size} variant="flat" color={config.color}>
      {config.label}
    </Chip>
  );
}
