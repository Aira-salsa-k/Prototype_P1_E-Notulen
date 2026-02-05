import React from "react";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import SpeakerSection from "../SpeakerSection";
import { AttendanceRecord } from "@/types/attendance";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface NotulenCanvasProps {
  activeTabId: string | null;
  participants: AttendanceRecord[];
  isReadOnly?: boolean;
  currentUserId: string;
  onBackgroundClick: () => void;
}

export default function NotulenCanvas({
  activeTabId,
  participants,
  isReadOnly = false,
  currentUserId,
  onBackgroundClick,
}: NotulenCanvasProps) {
  const { sections, points, actions } = useNotulenStore();

  const activeSection = sections.find((s) => s.id === activeTabId);

  const handleAddPoint = (sectionId: string) => {
    if (isReadOnly) return;
    // ensure locked (defensive)
    const section = sections.find((s) => s.id === sectionId);
    if (section && (!section.isLocked || section.lockedBy === currentUserId)) {
      actions.setSectionLock(sectionId, true, currentUserId);
    }

    actions.addPoint(sectionId, {
      id: `point-${Date.now()}`,
      sectionId: sectionId,
      content: "",
      order: (points[sectionId]?.length || 0) + 1,
      createdBy: currentUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-4 bg-gray-50/30"
      onClick={onBackgroundClick}
    >
      {activeSection ? (
        (() => {
          const participant = participants.find(
            (p) =>
              p.entityId === activeSection.participanID ||
              p.id === activeSection.participanID,
          );
          const displayFormat =
            participant?.displayFormat || activeSection.displayFormat;
          const [name, ...titleParts] = displayFormat.split("®");
          const title = titleParts.join("®").trim();

          return (
            <div
              key={activeSection.id}
              onClick={(e) => e.stopPropagation()} // Prevent bubble to background
            >
              <SpeakerSection
                id={activeSection.id}
                speakerName={name?.trim() || "Unknown"}
                speakerTitle={title || ""}
                points={points[activeSection.id] || []}
                isLocked={activeSection.isLocked || isReadOnly}
                lockedBy={activeSection.lockedBy}
                currentUserId={currentUserId}
                isReadOnly={isReadOnly}
                showLockToggle={false} // Hidden in section, controlled by tabs
                onToggleLock={() => {}} // No-op, handled by tabs
                onAddPoint={() => handleAddPoint(activeSection.id)}
                onUpdatePoint={(pid, content) =>
                  !isReadOnly &&
                  actions.updatePoint(activeSection.id, pid, content)
                }
                onDeletePoint={(pid) =>
                  !isReadOnly && actions.deletePoint(activeSection.id, pid)
                }
              />
            </div>
          );
        })()
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-12 text-gray-400 italic">
          <UserCircleIcon className="w-16 h-16 text-gray-200 mb-4" />
          <p className="text-lg font-medium text-gray-500">Siap Mencatat</p>
          <p className="text-sm">Pilih peserta dari sidebar untuk memulai.</p>
        </div>
      )}
    </div>
  );
}
