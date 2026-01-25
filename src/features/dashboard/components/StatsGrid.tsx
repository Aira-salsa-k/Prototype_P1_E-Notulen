// app/components/dashboard/StatsGrid.tsx
import { Card, CardBody } from "@heroui/card";

interface StatsCardProps {
  title: string;
  value: number;
  description?: string;
  color: "blue" | "green" | "red" | "yellow" | "purple";
}

function StatsCard({ title, value, description, color }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    red: "bg-red-300/20 border-red-200/50",
    yellow: "bg-yellow-50 border-yellow-100",
    purple: "bg-cyan-100/30 border-cyan-100",
  };

  return (
    <Card className={`border ${colorClasses[color]} shadow-sm`}>
      <CardBody className="p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
          <div className="text-md font-medium text-gray-600">{title}</div>
          {description && (
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard title="Rapat Terdaftar" value={12} color="blue" />
      <StatsCard
        title="Rapat Live"
        value={2}
        color="red"
        description="Sedang berlangsung"
    
      />
      <StatsCard title="Rapat Selesai" value={5} color="blue" />
    </div>
  );
}
