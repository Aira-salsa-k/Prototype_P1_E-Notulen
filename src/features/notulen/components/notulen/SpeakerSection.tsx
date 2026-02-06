"use client";

import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { NotulenPoint } from "@/types/notulen";
import { AppButton } from "@/components/ui/button/AppButton";

interface SpeakerSectionProps {
  id: string; // section id
  speakerName: string;
  speakerTitle: string;
  points: NotulenPoint[];
  isLocked: boolean;
  lockedBy?: string;
  currentUserId: string;
  isReadOnly?: boolean;
  showLockToggle?: boolean; // New prop
  onToggleLock: () => void;
  onAddPoint: () => void;
  onUpdatePoint: (pointId: string, content: string) => void;
  onDeletePoint: (pointId: string) => void;
}

export default function SpeakerSection({
  speakerName,
  speakerTitle,
  points,
  isLocked,
  lockedBy,
  currentUserId,
  isReadOnly = false,
  showLockToggle = true, // Default true
  onToggleLock,
  onAddPoint,
  onUpdatePoint,
  onDeletePoint,
}: SpeakerSectionProps) {
  // Logic:
  // - If isReadOnly: View only (disabled everywhere)
  // - If isLocked:
  //    - If lockedBy === currentUserId: Editable by ME (I have the lock)
  //    - If lockedBy !== currentUserId: Read-only for ME (Someone else has the lock)
  // - If !isLocked: Everyone can see, but to edit one should ideally lock it first?
  //   (Usually purely realtime apps allow edit if unlocked, but requirement says "lock to avoid conflict")
  //   For now, we follow: If unlocked, it's editable. If locked by others, disabled.

  const isLockedByOther = isLocked && lockedBy !== currentUserId;
  const isEditable = !isReadOnly && !isLockedByOther;

  return (
    <div
      className={`border rounded-xl p-4 transition-all ${
        isLockedByOther
          ? "bg-gray-50 border-gray-200 opacity-75" // Locked by someone else
          : isLocked
            ? "bg-white border-blue-300 ring-2 ring-blue-100 shadow-md" // Locked by me (active)
            : "bg-white border-gray-200 hover:border-blue-100" // Unlocked
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h4 className="font-bold text-lg text-gray-900">{speakerName}</h4>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {speakerTitle}
          </span>
          {isLocked && (
            <span className="text-[10px] text-blue-600 font-medium mt-1">
              {isLockedByOther
                ? `Sedang diedit oleh pengguna lain (${lockedBy})`
                : "Anda sedang mengedit bagian ini"}
            </span>
          )}
        </div>
        {showLockToggle && (
          <Button
            isIconOnly
            size="sm"
            variant={isLocked ? "solid" : "flat"}
            color={
              isLocked ? (isLockedByOther ? "default" : "primary") : "default"
            }
            isDisabled={isReadOnly || isLockedByOther}
            onPress={onToggleLock}
            className="transition-colors"
          >
            {isLocked ? (
              <LockClosedIcon className="w-4 h-4" />
            ) : (
              <LockOpenIcon className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* POINTS */}
      <div className="space-y-3">
        {points.map((point, index) => (
          <div key={point.id} className="flex gap-2 items-start group">
            <span className="mt-3 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
            <Textarea
              minRows={1}
              isDisabled={!isEditable}
              value={point.content}
              onChange={(e) => onUpdatePoint(point.id, e.target.value)}
              placeholder={`Poin ${index + 1}...`}
              variant="bordered"
              className="flex-1"
              classNames={{
                input: "text-gray-800",
              }}
            />
            {isEditable && (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                className="opacity-0 group-hover:opacity-100 transition"
                onPress={() => onDeletePoint(point.id)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      {isEditable && (
        <div className="mt-4 flex justify-start">
          <AppButton
            size="sm"
            color="ungu-muda"
            startContent={<PlusIcon className="w-4 h-4" />}
            onPress={onAddPoint}
          >
            Tambah Point Pembicaraan
          </AppButton>
        </div>
      )}
    </div>
  );
}
