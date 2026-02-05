"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FormModal } from "@/components/ui/form/FormModal";
import { MeetingTypeMemberConfig } from "@/types/meeting";

interface MemberEditFormData {
  meetingRole: string;
  displayFormat: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: MeetingTypeMemberConfig | null;
  onSave: (memberId: string, data: MemberEditFormData) => void;
}

export function MeetingTypeMemberModal({ isOpen, onClose, member, onSave }: Props) {
  const { control, handleSubmit, reset } = useForm<MemberEditFormData>({
    defaultValues: {
      meetingRole: "",
      displayFormat: "",
    },
  });

  useEffect(() => {
    if (isOpen && member) {
      reset({
        meetingRole: member.meetingRole || "",
        displayFormat: member.displayFormat || "",
      });
    }
  }, [isOpen, member, reset]);

  const handleFormSubmit = (data: MemberEditFormData) => {
    if (member) {
      onSave(member.memberId, data);
      onClose();
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Anggota: ${member?.name || ""}`}
      size="lg"
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button color="danger" variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" type="submit" form="member-edit-form">
            Simpan Perubahan
          </Button>
        </div>
      }
    >
      <form
        id="member-edit-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
           <div className="text-sm font-bold text-gray-900">{member?.name}</div>
           <div className="text-xs text-gray-500">{member?.jabatan}</div>
        </div>

        <div className="space-y-4">
          <Controller
            name="meetingRole"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Jabatan Rapat"
                placeholder="Ex: Ketua Rapat, Sekretaris"
                variant="bordered"
              />
            )}
          />

          <Controller
            name="displayFormat"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Format Notulen (Display)"
                placeholder="Ex: Nama ® Jabatan"
                variant="bordered"
                description="Format ini akan muncul di daftar hadir dan notulen"
              />
            )}
          />
        </div>
      </form>
    </FormModal>
  );
}
