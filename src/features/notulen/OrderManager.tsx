// app/components/feature/notulen/OrderManager.tsx
import { NotulenSection, NotulenPoint } from "../../types";

interface OrderManagerProps {
  sections: NotulenSection[];
  onOrderChange: (sections: NotulenSection[]) => void;
}

export function OrderManager({ sections, onOrderChange }: OrderManagerProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const moveUp = (sectionId: string) => {
    const updated = [...sections];
    const index = updated.findIndex((s) => s.id === sectionId);

    if (index > 0) {
      // Tukar order
      [updated[index].order, updated[index - 1].order] = [
        updated[index - 1].order,
        updated[index].order,
      ];

      onOrderChange(updated);
    }
  };

  const moveDown = (sectionId: string) => {
    // ... logic serupa
  };

  return (
    <div className="space-y-4">
      {sortedSections.map((section) => (
        <div key={section.id} className="flex items-center gap-4 p-4 border">
          <span className="font-bold">#{section.order}</span>
          <span className="flex-1">{section.displayFormat}</span>
          <button onClick={() => moveUp(section.id)}>↑</button>
          <button onClick={() => moveDown(section.id)}>↓</button>
        </div>
      ))}
    </div>
  );
}
