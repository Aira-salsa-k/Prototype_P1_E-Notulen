interface PreviewCardProps {
  title?: string;
  children: React.ReactNode;
}

export function PreviewCard({ title, children }: PreviewCardProps) {
  return (
    <section className="bg-gray-50 border border-1.5 border-gray-200  rounded-lg p-4">
      {title && (
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      )}
      {children}
    </section>
  );
}
