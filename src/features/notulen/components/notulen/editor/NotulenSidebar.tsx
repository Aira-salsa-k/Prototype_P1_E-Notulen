import React, { useMemo, useState } from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useNotulenStore } from "@/features/notulen/store/useNotulenStore";
import { AttendanceRecord } from "@/types/attendance";
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  LockClosedIcon,
  ChevronDownIcon,
  ChevronRightIcon,
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

// Custom Accordion Group Component
const ParticipantGroup = ({
  title,
  count,
  isOpen,
  onToggle,
  icon: Icon,
  colorClass, // This will now be the header background color
  children,
}: {
  title: string;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ElementType;
  colorClass: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 transition-all ${
          colorClass // Use the passed color class for the header background
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-md bg-white/20">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide">
            {title} <span className="opacity-70 ml-1">({count})</span>
          </span>
        </div>
        {isOpen ? (
          <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
        ) : (
          <ChevronRightIcon className="w-3.5 h-3.5 opacity-70" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col animate-in slide-in-from-top-1 duration-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

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

  // Local state for custom accordion
  const [expanded, setExpanded] = useState({
    dewan: true,
    mitra: true,
    ta: true,
  });

  const toggleGroup = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
      sectionId = `sec-${Date.now()}`;

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
        isLocked: false,
        lockedBy: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    onOpenTab(sectionId);
  };

  const renderParticipantButton = (
    p: (typeof groupedParticipants.dewan)[0],
    activeBg: string,
    activeText: string,
    activeIcon: string,
  ) => {
    const existingSection = sections.find((s) => s.participanID === p.entityId);
    const isActive = existingSection && activeTabId === existingSection.id;

    return (
      <button
        key={p.id}
        onClick={() => handleSpeakerSelect(p)}
        className={`w-full text-left py-3 px-4 border-b border-gray-50 last:border-0 transition-all flex items-center justify-between group
          ${isActive ? activeBg : "bg-white hover:bg-gray-50"}
        `}
      >
        <div className="flex flex-col min-w-0 pr-2">
          <span
            className={`text-xs font-bold truncate transition-colors ${
              isActive ? activeText : "text-gray-600 group-hover:text-gray-900"
            }`}
          >
            {p.name}
          </span>
          <span
            className={`text-[10px] truncate uppercase mt-0.5 leading-none ${isActive ? activeText : "text-gray-400"}`}
          >
            {p.type === "MITRA_KERJA"
              ? p.institution || p.jabatan
              : p.jabatan || "—"}
          </span>
        </div>
        {isActive && (
          <LockClosedIcon
            className={`w-3.5 h-3.5 ${activeIcon} flex-shrink-0 animate-pulse`}
          />
        )}
      </button>
    );
  };

  return (
    <div className="relative h-full flex flex-col bg-slate-50 border-r border-gray-200 rounded-l-2xl shadow-sm w-80 flex-shrink-0 select-none overflow-hidden">
      <div className="p-4 border-b bg-white">
        <h3 className="text-base font-bold text-gray-800">Panel Pembicara</h3>
        <p className="text-[11px] text-gray-500 mt-1">
          Pilih nama pembicara di bawah untuk mulai mencatat poin notulensi.
        </p>
      </div>

      <ScrollShadow className="flex-1 overflow-y-auto">
        {participants.length > 0 ? (
          <div className="flex flex-col">
            {/* ANGGOTA DEWAN - BLUE/LIMEish */}
            <ParticipantGroup
              title="Anggota Dewan"
              count={groupedParticipants.dewan.length}
              isOpen={expanded.dewan}
              onToggle={() => toggleGroup("dewan")}
              icon={UserCircleIcon}
              colorClass="bg-primary hover:bg-primary/90 text-white"
            >
              {groupedParticipants.dewan.map((p) =>
                renderParticipantButton(
                  p,
                  "bg-primary/10", // Active BG
                  "text-primary", // Active Text
                  "text-primary/70", // Active Icon
                ),
              )}
            </ParticipantGroup>

            {/* MITRA KERJA - INDIGO */}
            <ParticipantGroup
              title="Mitra Kerja"
              count={groupedParticipants.mitra.length}
              isOpen={expanded.mitra}
              onToggle={() => toggleGroup("mitra")}
              icon={BuildingOfficeIcon}
              colorClass="bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
            >
              {groupedParticipants.mitra.map((p) =>
                renderParticipantButton(
                  p,
                  "bg-indigo-50",
                  "text-indigo-700",
                  "text-indigo-500",
                ),
              )}
            </ParticipantGroup>

            {/* TENAGA AHLI - SKY */}
            <ParticipantGroup
              title="Tenaga Ahli"
              count={groupedParticipants.ta.length}
              isOpen={expanded.ta}
              onToggle={() => toggleGroup("ta")}
              icon={UserCircleIcon}
              colorClass="bg-sky-100 hover:bg-sky-200 text-sky-800"
            >
              {groupedParticipants.ta.map((p) =>
                renderParticipantButton(
                  p,
                  "bg-sky-50",
                  "text-sky-700",
                  "text-sky-500",
                ),
              )}
            </ParticipantGroup>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <UserCircleIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Data Peserta Kosong
            </p>
            <p className="text-[11px] text-gray-400">
              Belum ada peserta yang ditambahkan ke rapat ini.
            </p>
          </div>
        )}
      </ScrollShadow>
    </div>
  );
}
