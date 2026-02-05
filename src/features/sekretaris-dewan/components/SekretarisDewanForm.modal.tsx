"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { PreviewCard } from "@/components/ui/preview/PreviewCard";
import { FormGrid } from "@/components/ui/form/FormGrid";

import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSekretarisForm } from "../hooks/useSekretarisDewanForm";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
import { SekretarisDewanFormFields } from "./SekretarisDewanForm.fields";
import { SekretarisDewanFormPreview } from "./SekretarisDewanForm.preview";
import { resolveSekretarisDewanPreview } from "../utils/resolveSekretarisDewanPreview";

import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SekretarisDewanFormData) => void;
  initialData?: SekretarisDewanFormData & { id?: string };
  isLoading?: boolean;
}
// features/sekretaris-dewan/components/SekretarisDewanForm.modal.tsx
export function SekretarisDewanFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: Props) {
  // Inisialisasi data form (Mapping data jika perlu)
  const mappedInitialData = useMemo(() => {
    if (!initialData) return undefined;
    return {
      ...initialData,
      periodeStart: initialData.periodeStart
        ? new Date(initialData.periodeStart)
        : null,
      periodeEnd: initialData.periodeEnd
        ? new Date(initialData.periodeEnd)
        : null,
    };
  }, [initialData]);

  const { data, update, handleSubmit } = useSekretarisForm(
    mappedInitialData,
    isOpen,
  );

  //state
  const showPreview = !!data.name || !!initialData?.id;

  const previewData = useMemo(
    () => resolveSekretarisDewanPreview(data),
    [data],
  );

  const mode = initialData?.id ? "edit" : "add";

  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader className="text-2xl font-bold">
          {mode === "add"
            ? "Tambah Sekretaris Dewan"
            : "Edit Profil Sekretaris"}
        </ModalHeader>

        <ModalBody className="space-y-6">
          <PreviewCard title="Pratinjau Profil">
            <SekretarisDewanFormPreview data={previewData} />
          </PreviewCard>

          <FormGrid columns={2} gap="lg">
            <SekretarisDewanFormFields
              data={data}
              update={update}
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
            Simpan Perubahan
          </AppButton>
        </ModalFooter>
      </form>
    </ModalBase>
  );
}
