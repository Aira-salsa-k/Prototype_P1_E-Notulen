"use client";

import React from "react";
import { AttendanceRecord } from "@/types/attendance";
import { useNotulenTabs } from "@/features/notulen/hooks/useNotulenTabs";
import NotulenSidebar from "@/features/notulen/components/notulen/editor/NotulenSidebar";
import NotulenTabBar from "@/features/notulen/components/notulen/editor/NotulenTabBar";
import NotulenCanvas from "@/features/notulen/components/notulen/editor/NotulenCanvas";

interface NotulenEditorProps {
  meetingId: string;
  isReadOnly?: boolean;
  participants: AttendanceRecord[];
}

export default function NotulenEditor({
  meetingId,
  isReadOnly = false,
  participants,
}: NotulenEditorProps) {
  // Mock current user ID for locking logic
  const currentUserId = "current-user";

  const { activeTabId, openTabs, handleTabSwitch, handleCloseTab, openTab } =
    useNotulenTabs({ currentUserId });

  // Handle Background Click -> Unlock Active
  const handleBackgroundClick = () => {
    if (activeTabId) {
      // Just close/unlock the active one via close logic?
      // Requirement was: "klik unlock, unlock dan close tab" for tab X button.
      // For background click: "unlock active section" (from previous task).
      // If we use handleTabSwitch(null) effectively?

      // Let's implement specific unlock via hook or just re-use close?
      // The hook has handleCloseTab. Let's use handleCloseTab for "unlock" logic if we treat background click as "deselect/blur".
      // But wait, user wanted "unlock on background click".
      // In the hook, handleCloseTab removes it from the list.
      // We probably just want to "Blur" (i.e. set activeTabId = null) and unlock.

      // Actually, let's keep it simple: If background clicked, we just set activeTabId to null,
      // and the hook logic should handle unlocking the old active tab during switch.
      handleTabSwitch(""); // Switching to empty string or null will trigger unlock of old
    }
  };

  // Correction: handleTabSwitch("") might act weird if type is string. let's pass empty string if type is string|null.
  // The hook accepts string. Let's fix hook if needed or just pass empty string.
  // Actually, let's check hook implementation.
  // Hook: `if (activeTabId === sectionId) return;`
  // If we pass "", activeTabId (e.g. "sec-1") != "".
  // `oldSection` will be unlocked.
  // `setActiveTabId("")`.
  // `newSection` search for "" will fail.
  // So effective result: Old unlocked, New (none) locked. Correct.

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-100px)]">
      {/* LEFT SIDEBAR */}
      {!isReadOnly && (
        <NotulenSidebar
          meetingId={meetingId}
          isReadOnly={isReadOnly}
          participants={participants}
          activeTabId={activeTabId}
          openTabs={openTabs}
          currentUserId={currentUserId}
          onOpenTab={openTab}
        />
      )}

      {/* RIGHT CONTENT - Tabbed Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TAB BAR */}
        <NotulenTabBar
          openTabs={openTabs}
          activeTabId={activeTabId}
          participants={participants}
          onTabSwitch={handleTabSwitch}
          onCloseTab={handleCloseTab}
        />

        {/* EDITOR AREA */}
        <NotulenCanvas
          activeTabId={activeTabId}
          participants={participants}
          isReadOnly={isReadOnly}
          currentUserId={currentUserId}
          onBackgroundClick={() => handleTabSwitch("")} // Click background to effectively "blur"
        />
      </div>
    </div>
  );
}
