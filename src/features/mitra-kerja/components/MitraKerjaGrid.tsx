// app/components/mitra-kerja/MitraKerjaGrid.tsx
import { AKD, MitraInstitution } from "@/types";
import { AKD_CONFIG } from "@/lib/config/akd";
import AKDCard from "./AKDCard";

interface MitraKerjaGridProps {
  institutions: MitraInstitution[];
  onEdit: (institution: MitraInstitution) => void;
  onRequestDelete: (institution: MitraInstitution) => void;
  isReadOnly?: boolean;
}

export default function MitraKerjaGrid({
  institutions,
  onEdit,
  onRequestDelete,
  isReadOnly = false,
}: MitraKerjaGridProps) {
  // Group institutions by AKD
  const groupedByAKD = institutions.reduce(
    (acc, institution) => {
      const akd = institution.akdID;
      if (!acc[akd]) {
        acc[akd] = [];
      }
      acc[akd].push(institution);
      return acc;
    },
    {} as Record<AKD, MitraInstitution[]>,
  );

  // Get all AKDs that have at least one institution
  const activeAKDs = Object.keys(groupedByAKD) as AKD[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeAKDs.map((akd) => (
        <AKDCard
          key={akd}
          akdId={akd}
          institutions={groupedByAKD[akd]}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
          isReadOnly={isReadOnly}
        />
      ))}

      {/* Empty State jika tidak ada data */}
      {activeAKDs.length === 0 && (
        <div className="col-span-3">
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada mitra kerja
            </h3>
            <p className="text-gray-500 mb-4">
              Tambahkan mitra kerja untuk memulai
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
