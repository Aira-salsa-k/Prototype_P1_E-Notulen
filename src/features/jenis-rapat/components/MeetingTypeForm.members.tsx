import { useFieldArray, useFormContext } from "react-hook-form";
import { MeetingTypeMemberConfig, MeetingTypeVariant } from "@/types/meeting";
import { useState, useCallback, useEffect, useRef } from "react"; // Added useCallback, useEffect, useRef
import { arrayMove } from "@dnd-kit/sortable";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

// Sub-components
import { MemberSelectionMethods } from "./members/MemberSelectionMethods";
import { FinalMemberTable } from "./members/FinalMemberTable";
import { User } from "@/types/user";

interface MeetingTypeFormMembersProps {
  akdOptions: { value: string; label: string }[];
  selectedAKD: string;
  onAKDChange: (akd: string) => void;
  allMembers: any[];
  sekwans: SekretarisDewanProfile[];
  users: User[];
}

export function MeetingTypeFormMembers({
  akdOptions,
  selectedAKD,
  onAKDChange,
  allMembers,
  sekwans,
  users,
}: MeetingTypeFormMembersProps) {
  const { control, getValues } = useFormContext<MeetingTypeVariant>();
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "members",
  });

  const [isLoadingAKD, setIsLoadingAKD] = useState(false);

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

    const available = loaded
      .filter((m) => !existingFinal.has(String(m.id)))
      .map((m) => {
        const user = users.find((u) => u.id === m.userId);
        const name = user?.name || "Tanpa Nama";
        const jabatan = m.jabatan || "Anggota";
        return {
          memberId: String(m.id),
          name: name,
          jabatan: jabatan,
          meetingRole: "Anggota",
          displayFormat: `${name} ® ${jabatan}`.toUpperCase(),
        };
      });

    if (available.length > 0) {
      append(available);
    }
    setIsLoadingAKD(false);
  };

  // Ref to track if it's the first render to avoid auto-load on mount
  const isFirstRender = useRef(true);

  // Auto-load when AKD selection changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (selectedAKD && selectedAKD !== "") {
      setIsLoadingAKD(true);
      // Small delay for better UX
      const timer = setTimeout(() => {
        handleLoadAKDPreview();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedAKD]); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Select Manual (Anggota)
  const handleManualSelect = (memberId: string) => {
    const member = allMembers.find((m) => String(m.id) === String(memberId));
    if (!member) return;

    // Check if in final list
    const existingFinal = getExistingFinalIds();
    if (existingFinal.has(String(member.id))) return;

    const user = users.find((u) => u.id === member.userId);
    const name = user?.name || "Tanpa Nama";
    const jabatan = member.jabatan || "Anggota";

    const newMember: MeetingTypeMemberConfig = {
      memberId: String(member.id),
      name: name,
      jabatan: jabatan,
      meetingRole: "Anggota",
      displayFormat: `${name} ® ${jabatan}`.toUpperCase(),
    };

    append(newMember);
  };

  // 3. Select Sekwan
  const handleSekwanSelect = (sekwanId: string) => {
    const s = sekwans.find((x) => String(x.id) === String(sekwanId));
    if (!s) return;

    // Check final
    const existingFinal = getExistingFinalIds();
    if (existingFinal.has(String(s.id))) return;

    const user = users.find((u) => u.id === s.userId);
    const name = user?.name || "Tanpa Nama";
    const jabatan = s.jabatan || "Sekretaris";

    const newMember: MeetingTypeMemberConfig = {
      memberId: String(s.id),
      name: name,
      jabatan: jabatan,
      meetingRole: "Sekretaris",
      displayFormat: `${name} ® ${jabatan}`.toUpperCase(),
    };

    append(newMember);
  };

  // 4. Update Member directly in Final List
  const handleUpdateMember = (
    index: number,
    field: keyof MeetingTypeMemberConfig,
    value: string,
  ) => {
    if (fields[index]) {
      const currentItem = fields[index] as MeetingTypeMemberConfig;

      // Auto-uppercase for specific fields
      let finalValue = value;
      if (field === "displayFormat") {
        finalValue = value.toUpperCase();
      }

      const updatedItem = { ...currentItem, [field]: finalValue };
      // @ts-ignore
      update(index, updatedItem);
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: SELECTION METHODS */}
      <MemberSelectionMethods
        akdOptions={akdOptions}
        selectedAKD={selectedAKD}
        onAKDChange={onAKDChange}
        isLoadingAKD={isLoadingAKD}
        allMembers={allMembers}
        onManualSelect={handleManualSelect}
        sekwans={sekwans}
        onSekwanSelect={handleSekwanSelect}
        users={users}
      />

      {/* SECTION 2: FINAL LIST TABLE (NOW UNIFIED) */}
      <FinalMemberTable
        fields={fields as (MeetingTypeMemberConfig & { id: string })[]}
        onRemove={remove}
        onReorder={(oldIndex: number, newIndex: number) => {
          const current = getValues("members") || [];
          const reordered = arrayMove(current, oldIndex, newIndex);
          // Update all members at once
          fields.forEach((_, idx) => remove(0));
          append(reordered);
        }}
        onUpdate={handleUpdateMember}
      />
    </div>
  );
}
