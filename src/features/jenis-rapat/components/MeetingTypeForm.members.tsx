import { useFieldArray, useFormContext } from "react-hook-form";
import { MeetingTypeMemberConfig, MeetingTypeVariant } from "@/types/meeting";
import { useState, useCallback } from "react"; // Added useCallback
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

// Sub-components
import { MemberSelectionMethods } from "./members/MemberSelectionMethods";
import { PendingPreviewTable } from "./members/PendingPreviewTable";
import { FinalMemberTable } from "./members/FinalMemberTable";

import { mockUsers } from "@/mocks/user";

interface MeetingTypeFormMembersProps {
  akdOptions: string[];
  selectedAKD: string;
  onAKDChange: (akd: string) => void;
  allMembers: any[];
  sekwans: SekretarisDewanProfile[];
}

export function MeetingTypeFormMembers({
  akdOptions,
  selectedAKD,
  onAKDChange,
  allMembers,
  sekwans,
}: MeetingTypeFormMembersProps) {
  const { control, getValues } = useFormContext<MeetingTypeVariant>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "members",
  });

  // -- STATE: Pending Preview --
  // This holds members that are selected (from AKD, Manual, or Sekwan) but NOT YET added to the final form list.
  // They are editable here.
  const [previewMembers, setPreviewMembers] = useState<
    MeetingTypeMemberConfig[]
  >([]);

  // Helper: Get set of IDs already in the *Final List* (to prevent adding duplicates to final)
  const getExistingFinalIds = useCallback(() => {
    const current = getValues("members") || [];
    return new Set(current.map((m) => String(m.memberId)));
  }, [getValues]);

  // -- HANDLERS --

  // 1. Load from AKD
  const handleLoadAKDPreview = () => {
    if (!selectedAKD) return;

    const loaded =
      selectedAKD === "ALL"
        ? allMembers
        : allMembers.filter((m: any) => m.akd && m.akd.includes(selectedAKD));

    const existingFinal = getExistingFinalIds();

    // Also filter out any that are ALREADY in the current preview to avoid dupes in preview
    const existingPreviewIds = new Set(previewMembers.map((m) => m.memberId));

    const available = loaded
      .filter(
        (m) =>
          !existingFinal.has(String(m.id)) &&
          !existingPreviewIds.has(String(m.id)),
      )
      .map((m) => {
        const user = mockUsers.find((u) => u.id === m.userId);
        const name = user?.name || "Tanpa Nama";
        return {
          memberId: String(m.id),
          name: name,
          jabatan: m.jabatan || "Anggota",
          meetingRole: "Anggota",
          displayFormat: `${name} ® ${m.jabatan || "Anggota"}`,
        };
      });

    if (available.length > 0) {
      setPreviewMembers((prev) => [...prev, ...available]);
    }
  };

  // 2. Select Manual (Anggota)
  const handleManualSelect = (memberId: string) => {
    const member = allMembers.find((m) => String(m.id) === String(memberId));
    if (!member) return;

    // Check if in final list
    const existingFinal = getExistingFinalIds();
    if (existingFinal.has(String(member.id))) return;

    // Check if already in preview
    if (previewMembers.some((m) => m.memberId === String(member.id))) return;

    const user = mockUsers.find((u) => u.id === member.userId);
    const name = user?.name || "Tanpa Nama";

    const newMember: MeetingTypeMemberConfig = {
      memberId: String(member.id),
      name: name,
      jabatan: member.jabatan || "Anggota",
      meetingRole: "Anggota",
      displayFormat: `${name} ® ${member.jabatan || "Anggota"}`,
    };

    setPreviewMembers((prev) => [...prev, newMember]);
  };

  // 3. Select Sekwan
  const handleSekwanSelect = (sekwanId: string) => {
    const s = sekwans.find((x) => String(x.id) === String(sekwanId));
    if (!s) return;

    // Check final
    const existingFinal = getExistingFinalIds();
    if (existingFinal.has(String(s.id))) return;

    // Check preview
    if (previewMembers.some((m) => m.memberId === String(s.id))) return;

    const user = mockUsers.find((u) => u.id === s.userId);
    const name = user?.name || "Tanpa Nama";

    const newMember: MeetingTypeMemberConfig = {
      memberId: String(s.id),
      name: name,
      jabatan: s.jabatan,
      meetingRole: "Sekretaris",
      displayFormat: `${name} ® ${s.jabatan}`,
    };

    setPreviewMembers((prev) => [...prev, newMember]);
  };

  // 4. Update Member in Preview (Edit Role/Display)
  const handleUpdatePreview = (
    id: string,
    field: keyof MeetingTypeMemberConfig,
    value: string,
  ) => {
    setPreviewMembers((prev) =>
      prev.map((m) => (m.memberId === id ? { ...m, [field]: value } : m)),
    );
  };

  // 5. Remove from Preview
  const handleRemovePreview = (id: string) => {
    setPreviewMembers((prev) => prev.filter((m) => m.memberId !== id));
  };

  // 6. Add Single to Final
  const handleAddToFinal = (member: MeetingTypeMemberConfig) => {
    append(member);
    handleRemovePreview(member.memberId);
  };

  // 7. Add All to Final
  const handleAddAllToFinal = () => {
    if (previewMembers.length > 0) {
      append(previewMembers);
      setPreviewMembers([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: SELECTION METHODS */}
      <MemberSelectionMethods
        akdOptions={akdOptions}
        selectedAKD={selectedAKD}
        onAKDChange={onAKDChange}
        onLoadAKDPreview={handleLoadAKDPreview}
        allMembers={allMembers}
        onManualSelect={handleManualSelect}
        sekwans={sekwans}
        onSekwanSelect={handleSekwanSelect}
      />

      {/* SECTION 2: PENDING PREVIEW TABLE (Editable) */}
      <PendingPreviewTable
        previewMembers={previewMembers}
        onUpdateMember={handleUpdatePreview}
        onAddMember={handleAddToFinal}
        onAddAll={handleAddAllToFinal}
        onRemovePreview={handleRemovePreview}
      />

      {/* SECTION 3: FINAL LIST TABLE */}
      <FinalMemberTable
        fields={fields as (MeetingTypeMemberConfig & { id: string })[]}
        onRemove={remove}
      />
    </div>
  );
}
