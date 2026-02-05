import React from "react";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { AttendanceRecord } from "@/types/attendance";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NotulenTabBarProps {
  openTabs: string[];
  activeTabId: string | null;
  participants: AttendanceRecord[];
  onTabSwitch: (sectionId: string) => void;
  onCloseTab: (sectionId: string, e: React.MouseEvent) => void;
}

export default function NotulenTabBar({
  openTabs,
  activeTabId,
  participants,
  onTabSwitch,
  onCloseTab,
}: NotulenTabBarProps) {
  const { sections } = useNotulenStore();

  if (openTabs.length === 0) return null;

  return (
    <div className="flex gap-2 p-2 border-b overflow-x-auto bg-gray-50/50">
      {openTabs.map((tabId) => {
        const section = sections.find((s) => s.id === tabId);
        if (!section) return null;

        // Helper: Resolve Name
        const participant = participants.find(
          (p) => p.entityId === section.participanID,
        );
        const displayName = participant?.name || "Unknown";
        const isActive = activeTabId === tabId;

        return (
          <div
            key={tabId}
            onClick={() => onTabSwitch(tabId)}
            className={`
                cursor-pointer flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border text-sm font-medium transition-all min-w-[150px] max-w-[200px]
                ${
                  isActive
                    ? "bg-white border-blue-200 text-blue-700 shadow-sm"
                    : "bg-gray-100 border-transparent text-gray-500 hover:bg-white hover:border-gray-200"
                }
            `}
          >
            <span className="truncate flex-1">{displayName}</span>

            {/* Lock Icon Indicator */}
            {isActive && (
              <LockClosedIcon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            )}

            {/* Close Button */}
            <button
              onClick={(e) => onCloseTab(tabId, e)}
              className={`
                p-0.5 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0
                ${
                  isActive
                    ? "text-blue-400 hover:text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }
            `}
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
