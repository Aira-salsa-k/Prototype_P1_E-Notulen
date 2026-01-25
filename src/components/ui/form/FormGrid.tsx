interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: "sm" | "md" | "lg";
}

export function FormGrid({ children, columns = 2, gap = "md" }: FormGridProps) {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  const gapClass = gap === "lg" ? "gap-6" : gap === "sm" ? "gap-3" : "gap-4";

  return <div className={`grid ${colClass} ${gapClass}`}>{children}</div>;
}
