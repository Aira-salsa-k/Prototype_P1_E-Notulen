// features/anggota-dewan/components/AnggotaFormModal.tsx
"use client";

import { useMemo } from "react";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { PreviewCard } from "@/components/ui/preview/PreviewCard";
import { FormGrid } from "@/components/ui/form/FormGrid";

import { useAnggotaForm } from "../hooks/useAnggotaForm"; // Gunakan wrapper baru
import { AnggotaFormPreview } from "./AnggotaForm.preview";
import { AnggotaFormFields } from "./AnggotaForm.fields";
import { AnggotaFormData } from "../types/AnggotaFormData";
import { AnggotaModalState } from "../types/modal";

export function AnggotaFormModal({
  modalState,
  onClose,
  onSubmit,
  isLoading,
}: {
  modalState: AnggotaModalState;
  onClose: () => void;
  onSubmit: (data: AnggotaFormData) => Promise<void> | void;
  isLoading: boolean;
}) {
  const isOpen = modalState !== null;
  const mode = modalState?.type ?? "add";

  // LOGIC: Map dari Row Data (DB) ke Form Data (UI)
  const initialData = useMemo(() => {
    if (modalState?.type === "edit" && modalState.data) {
      return {
        name: modalState.data.anggota.name,
        jabatan: modalState.data.anggota.jabatan,
        akd: modalState.data.anggota.akd,
        status: modalState.data.anggota.status,
        username: modalState.data.user.username || "",
        password: modalState.data.temporaryPassword || "",
      };
    }
    return undefined; // useAnggotaForm akan handle defaultData
  }, [modalState]);

  // SEKARANG SANGAT BERSIH:
  const { data, update } = useAnggotaForm(initialData, isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="3xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader className="text-2xl font-bold">
          {mode === "add" ? "Tambah Anggota" : "Edit Anggota"}
        </ModalHeader>

        <ModalBody className="space-y-6">
          <PreviewCard title="Pratinjau Kartu">
            <AnggotaFormPreview data={data} />
          </PreviewCard>

          <FormGrid columns={2} gap="lg">
            <AnggotaFormFields data={data} update={update} mode={mode} />
          </FormGrid>
        </ModalBody>

        <ModalFooter className="border-t border-divider/50 mt-4">
          <AppButton
            variant="light"
            color="btn-batal" // Konsisten dengan CSS yang kita rapihkan tadi
            onPress={onClose}
            isDisabled={isLoading}
          >
            Batal
          </AppButton>
          <AppButton
            color="ungu"
            type="submit"
            isLoading={isLoading}
            className="font-semibold"
          >
            Simpan Data
          </AppButton>
        </ModalFooter>
      </form>
    </ModalBase>
  );
}
