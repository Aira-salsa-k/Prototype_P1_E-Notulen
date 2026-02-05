"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { PreviewCard } from "@/components/ui/preview/PreviewCard";
import { FormGrid } from "@/components/ui/form/FormGrid";

import { useMemo } from "react";
import { useNotulisForm } from "../hooks/useNotulisForm";
import { NotulisFormData } from "../types/notulis-form-data";
import { NotulisFormFields } from "./NotulisForm.fields";
import { NotulisFormPreview } from "./NotulisForm.preview";
import { NotulisRow } from "../types/notulis-row";

interface Props {
  isLoading: boolean;
  modalState: { type: "add" | "edit"; data?: NotulisRow } | null;
  onClose: () => void;
  onSubmit: (data: NotulisFormData) => void;
}

export function NotulisFormModal({
  isLoading,
  modalState,
  onClose,
  onSubmit,
}: Props) {
  const isOpen = !!modalState;

  // Map row to form data
  const initialData = useMemo(() => {
    if (!modalState?.data) return undefined;
    return {
      name: modalState.data.user.name,
      NIP: modalState.data.notulis.NIP,
      username: modalState.data.user.username,
      isActive: modalState.data.notulis.isActive,
      password: "",
    };
  }, [modalState]);

  const { data, update, handleSubmit, register } = useNotulisForm(
    initialData,
    isOpen,
  );

  const mode = modalState?.type || "add";

  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader className="text-2xl font-bold">
          {mode === "add" ? "Tambah Notulis Baru" : "Edit Profil Notulis"}
        </ModalHeader>

        <ModalBody className="space-y-6">
          <PreviewCard title="Pratinjau Profil">
            <NotulisFormPreview data={data} />
          </PreviewCard>

          <FormGrid columns={2} gap="lg">
            <NotulisFormFields
              data={data}
              update={update}
              register={register}
              mode={mode}
            />
          </FormGrid>
        </ModalBody>

        <ModalFooter className="border-t border-divider/50 mt-4">
          <AppButton
            variant="light"
            color="btn-batal"
            onPress={onClose}
            isDisabled={isLoading}
          >
            Batal
          </AppButton>
          <AppButton
            color="primary"
            type="submit"
            isLoading={isLoading}
            className="font-semibold"
          >
            {mode === "add" ? "Tambah Notulis" : "Simpan Perubahan"}
          </AppButton>
        </ModalFooter>
      </form>
    </ModalBase>
  );
}
