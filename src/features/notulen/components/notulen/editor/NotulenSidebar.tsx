import React, { useMemo } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { AttendanceRecord } from "@/types/attendance";
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface NotulenSidebarProps {
  meetingId: string;
  isReadOnly?: boolean;
  participants: AttendanceRecord[];
  activeTabId: string | null;
  openTabs: string[];
  onOpenTab: (sectionId: string) => void;
  currentUserId: string;
}

export default function NotulenSidebar({
  meetingId,
  isReadOnly = false,
  participants,
  activeTabId,
  openTabs,
  onOpenTab,
  currentUserId,
}: NotulenSidebarProps) {
  const { sections, actions } = useNotulenStore();

  // Group participants
  const groupedParticipants = useMemo(() => {
    return {
      dewan: participants.filter((p) => p.type === "ANGGOTA_DEWAN"),
      mitra: participants.filter((p) => p.type === "MITRA_KERJA"),
      ta: participants.filter((p) => p.type === "TENAGA_AHLI"),
    };
  }, [participants]);

  // Handle Sidebar Click
  const handleSpeakerSelect = (p: AttendanceRecord) => {
    if (isReadOnly) return;

    // Check if section already exists
    let sectionId = sections.find((s) => s.participanID === p.entityId)?.id;

    if (!sectionId) {
      // Create logic moved here from main editor
      sectionId = `sec-${Date.now()}`;

      // Fallback Display Logic
      let displayFormat = "";
      if (p.displayFormat) {
        displayFormat = p.displayFormat.toUpperCase();
      } else {
        if (p.type === "ANGGOTA_DEWAN") {
          displayFormat =
            `${p.name} ® ${p.jabatan || "ANGGOTA DEWAN"}`.toUpperCase();
        } else if (p.type === "MITRA_KERJA") {
          displayFormat =
            `${p.name || p.institution || "MITRA KERJA"} ® ${p.jabatan || "PERWAKILAN"}`.toUpperCase();
        } else {
          displayFormat =
            `${p.name || "TENAGA AHLI"} ® ${p.jabatan || "TIM AHLI"}`.toUpperCase();
        }
      }

      actions.addSection({
        id: sectionId,
        meetingID: meetingId,
        participanID: p.entityId,
        participantType: p.type,
        displayFormat: displayFormat,
        points: [],
        order: sections.length + 1,
        isLocked: false, // Locking handled by tab switch hook
        lockedBy: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    onOpenTab(sectionId);
  };

  const renderParticipantItem = (p: AttendanceRecord) => {
    const existingSection = sections.find((s) => s.participanID === p.entityId);
    const isOpen = existingSection && openTabs.includes(existingSection.id);
    const isActive = existingSection && activeTabId === existingSection.id;

    return (
      <button
        key={p.id}
        onClick={() => handleSpeakerSelect(p)}
        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all group flex items-center justify-between border-2 ${
          isActive
            ? "bg-blue-50 border-blue-200"
            : isOpen
              ? "bg-gray-50 border-gray-200"
              : "bg-white border-transparent hover:border-gray-100 hover:bg-gray-50"
        }`}
      >
        <div className="flex flex-col min-w-0 pr-2">
          <span
            className={`text-xs font-bold truncate ${isActive ? "text-blue-700" : "text-gray-700"}`}
          >
            {p.name}
          </span>
          <span className="text-[10px] text-gray-400 truncate uppercase">
            {p.type === "MITRA_KERJA" ? p.institution : p.jabatan}
          </span>
        </div>
        {isActive ? (
          <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        ) : (
          <PlusIcon className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    );
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0 flex flex-col bg-white border rounded-2xl shadow-sm h-full overflow-hidden">
      <div className="p-4 border-b bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-700">Panel Pembicara</h3>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
          Klik nama untuk input notulensi
        </p>
      </div>

      <ScrollShadow className="flex-1 overflow-y-auto">
        {participants.length > 0 ? (
          <Accordion
            selectionMode="multiple"
            variant="light"
            className="px-2"
            defaultExpandedKeys={["dewan", "mitra", "ta"]}
            itemClasses={{
              title: "text-xs font-bold text-gray-600",
              trigger:
                "py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors",
              content: "pb-4 px-2",
              indicator: "text-gray-400",
            }}
          >
            <AccordionItem
              key="dewan"
              aria-label="Anggota Dewan"
              startContent={
                <UserCircleIcon className="w-4 h-4 text-blue-500" />
              }
              title={`ANGGOTA DEWAN (${groupedParticipants.dewan.length})`}
            >
              <div className="flex flex-col gap-1">
                {groupedParticipants.dewan.map((p) => renderParticipantItem(p))}
              </div>
            </AccordionItem>

            <AccordionItem
              key="mitra"
              aria-label="Mitra Kerja"
              startContent={
                <BuildingOfficeIcon className="w-4 h-4 text-orange-500" />
              }
              title={`MITRA KERJA (${groupedParticipants.mitra.length})`}
            >
              <div className="flex flex-col gap-1">
                {groupedParticipants.mitra.map((p) => renderParticipantItem(p))}
              </div>
            </AccordionItem>
            <AccordionItem
              key="ta"
              aria-label="Tenaga Ahli"
              startContent={
                <AcademicCapIcon className="w-4 h-4 text-green-500" />
              }
              title={`TENAGA AHLI (${groupedParticipants.ta.length})`}
            >
              <div className="flex flex-col gap-1">
                {groupedParticipants.ta.map((p) => renderParticipantItem(p))}
              </div>
            </AccordionItem>
          </Accordion>
        ) : (
          <div className="text-center py-12 text-gray-400 text-xs italic">
            Tidak ada peserta terdaftar.
          </div>
        )}
      </ScrollShadow>
    </div>
  );
}
