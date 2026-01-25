// features/mitra-kerja/components/MitraForm.modal.tsx
"use client";

import { useMemo } from "react";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { AppButton } from "@/components/ui/button/AppButton";
import { FormGrid } from "@/components/ui/form/FormGrid";

import { useMitraForm } from "../hooks/useMitraForm"; // Menggunakan hook spesifik
import { MitraFormFields } from "./MitraForm.fields";
import { MitraFormData } from "../types/MitraFormData";
import { MitraKerjaModalState } from "../types/modal";

export function MitraFormModal({
  modalState,
  onClose,
  onSubmit,
  isLoading,
}: {
  modalState: MitraKerjaModalState;
  onClose: () => void;
  onSubmit: (data: MitraFormData) => Promise<boolean | void>;
  isLoading: boolean;
}) {
  const isOpen = modalState !== null;
  const mode = modalState?.type ?? "add";

  // Mapping data dari ModalState ke FormData
  const initialData = useMemo(() => {
    if (modalState?.type === "edit" && modalState.data) {
      return {
        name: modalState.data.name,
        akdID: modalState.data.akdID,
        status: modalState.data.status,
      };
    }
    return undefined; // useMitraForm akan otomatis pakai defaultData
  }, [modalState]);

  // Menggunakan Hook Abstraksi
  const { data, update } = useMitraForm(initialData, isOpen);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const success = await onSubmit(data);
  if (success !== false) {
    onClose();
  }
};

  if (!isOpen) return null;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader className="text-2xl font-bold px-6 pt-6">
          <div className="flex flex-col">
            <span>
              {mode === "add" ? "Tambah Mitra Kerja" : "Edit Mitra Kerja"}
            </span>
          </div>
        </ModalHeader>

        <ModalBody className="px-6 py-4">
          <FormGrid columns={1} gap="lg">
            <MitraFormFields data={data} update={update} mode={mode} />
          </FormGrid>
        </ModalBody>

        <ModalFooter className="px-6 pb-6 border-t border-divider/50 mt-4">
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
            className="font-semibold shadow-lg"
          >
            {mode === "add" ? "Tambah Instansi" : "Simpan Perubahan"}
          </AppButton>
        </ModalFooter>
      </form>
    </ModalBase>
  );
}
