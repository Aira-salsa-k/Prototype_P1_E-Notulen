import { useState } from "react";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";

interface UseNotulenTabsProps {
  currentUserId: string;
}

export function useNotulenTabs({ currentUserId }: UseNotulenTabsProps) {
  const { sections, actions } = useNotulenStore();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);

  // Switch Tab & Lock Logic
  const handleTabSwitch = (sectionId: string) => {
    // 1. If switching to same tab, do nothing
    if (activeTabId === sectionId) return;

    // 2. Unlock old tab if owned by current user
    if (activeTabId) {
      const oldSection = sections.find((s) => s.id === activeTabId);
      if (oldSection?.isLocked && oldSection.lockedBy === currentUserId) {
        actions.setSectionLock(oldSection.id, false, currentUserId);
      }
    }

    // 3. Set new active
    setActiveTabId(sectionId);

    // 4. Lock new tab (if not locked by other)
    const newSection = sections.find((s) => s.id === sectionId);
    if (
      newSection &&
      (!newSection.isLocked || newSection.lockedBy === currentUserId)
    ) {
      actions.setSectionLock(sectionId, true, currentUserId);
    }
  };

  // Close Tab Logic
  const handleCloseTab = (sectionId: string, event?: React.MouseEvent) => {
    event?.stopPropagation();

    // 1. Unlock if owned by current user
    const section = sections.find((s) => s.id === sectionId);
    if (section?.isLocked && section.lockedBy === currentUserId) {
      actions.setSectionLock(sectionId, false, currentUserId);
    }

    // 2. Remove from openTabs
    const newOpenTabs = openTabs.filter((id) => id !== sectionId);
    setOpenTabs(newOpenTabs);

    // 3. If closed active tab, switch to another or null
    if (activeTabId === sectionId) {
      const newActiveId =
        newOpenTabs.length > 0 ? newOpenTabs[newOpenTabs.length - 1] : null;

      setActiveTabId(newActiveId);

      // Auto-lock new active one for continuity
      if (newActiveId) {
        const nextSection = sections.find((s) => s.id === newActiveId);
        if (
          nextSection &&
          (!nextSection.isLocked || nextSection.lockedBy === currentUserId)
        ) {
          actions.setSectionLock(newActiveId, true, currentUserId);
        }
      }
    }
  };

  // Open Tab Logic (Does not switch, just ensures it's in the list)
  // Usually we open AND switch, so this might be helper
  const openTab = (sectionId: string) => {
    if (!openTabs.includes(sectionId)) {
      setOpenTabs((prev) => [...prev, sectionId]);
    }
    handleTabSwitch(sectionId);
  };

  return {
    activeTabId,
    openTabs,
    handleTabSwitch,
    handleCloseTab,
    openTab,
  };
}
