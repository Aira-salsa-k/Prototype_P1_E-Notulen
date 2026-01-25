export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;

  isDisabled?: boolean;
  showControls?: boolean;
  showShadow?: boolean;

  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "default";

  className?: string;
}
