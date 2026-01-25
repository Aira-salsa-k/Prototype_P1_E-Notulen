import clsx from "clsx";
export function AppCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-surface border border-border rounded-lg p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
