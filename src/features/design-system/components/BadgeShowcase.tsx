import React from "react";
import { Card } from "@heroui/card";
import { BaseBadge } from "@/components/ui/badges/BaseBadge";
import { StatusBadge } from "@/components/ui/badges/StatusBadge";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import { MeetingStatusBadge } from "@/components/ui/badges/MeetingStatusBadge";
import { AKDBadge } from "@/components/ui/badges/AKDBadge";
import { semanticToClassName } from "@/lib/semantic/semantic-chip";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKD } from "@/types/anggota-dewan";
import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

export const BadgeShowcase = () => {
  return (
    <div className="space-y-12">
      {/* 5. Semantic Tones (Badges) */}
      <section>
        <div className="flex items-center gap-3 mb-6 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">
            5. Semantic Tones (Badges / BaseBadge)
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(semanticToClassName).map(([tone, className]) => {
            const [copied, setCopied] = React.useState(false);

            const handleCopy = () => {
              const fullInfo = `// Tone: "${tone}"\n// Tailwind: "${className}"`;
              navigator.clipboard.writeText(fullInfo);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            return (
              <Card
                key={tone}
                className="p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <BaseBadge label={tone.toUpperCase()} tone={tone as any} />
                  <div className="w-full">
                    <p className="text-[10px] text-gray-400 font-mono mb-1 truncate">
                      {tone}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="text-[10px] text-indigo-500 hover:underline flex items-center gap-1 mx-auto"
                    >
                      {copied ? (
                        <>
                          <ClipboardDocumentCheckIcon className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardIcon className="w-3 h-3" />
                          Copy Info
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6. Specific Badge Examples */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
          6. Specific Badge Examples
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
              Status Badge
            </h3>
            <div className="flex gap-4">
              <StatusBadge status="active" />
              <StatusBadge status="inactive" />
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
              Meeting Type Badge
            </h3>
            <div className="flex flex-wrap gap-4">
              <MeetingTypeBadge
                categoryName="Pansus"
                subCategoryName="LKPJ"
                color="cyan"
              />
              <MeetingTypeBadge
                categoryName="Pansus"
                subCategoryName="LHP"
                color="cyan"
              />
              <MeetingTypeBadge categoryName="Komisi I" color="info" />
              <MeetingTypeBadge categoryName="Banmus" color="warning" />
              <MeetingTypeBadge categoryName="Bapemperda" color="lime" />
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
              AKD Badge
            </h3>
            <div className="flex flex-wrap gap-4">
              {(Object.keys(AKD_CONFIG) as AKD[]).map((akd) => (
                <AKDBadge key={akd} akd={akd} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
              Meeting Status Badge
            </h3>
            <div className="flex flex-wrap gap-4">
              <MeetingStatusBadge status="scheduled" />
              <MeetingStatusBadge status="live" />
              <MeetingStatusBadge status="completed" />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-700 font-medium mb-2">
                Status Logic:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  • <strong>Terjadwal</strong> → Indigo/Primary (`neutral`
                  fallback)
                </li>
                <li>
                  • <strong>Live</strong> → Green/Success
                </li>
                <li>
                  • <strong>Selesai</strong> → Red/Danger
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
