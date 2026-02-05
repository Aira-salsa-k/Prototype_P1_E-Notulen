"use client";

import { useState, useMemo, useEffect } from "react";
import { Alert } from "@heroui/react";

// Components
import MitraKerjaHeader from "@/features/mitra-kerja/components/MitraKerjaHeader";
import MitraKerjaGrid from "@/features/mitra-kerja/components/MitraKerjaGrid";
import { MitraFormModal } from "@/features/mitra-kerja/components/MitraForm.modal";
import { MitraFormData } from "@/features/mitra-kerja/types/MitraFormData";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { AppNotification } from "@/components/shared/AppNotification";

// Hooks & Types
import { useMitraCRUD } from "@/features/mitra-kerja/hooks/useMitraCRUD";
import {
  mockMitraInstitutions,
  calculateMitraStats,
} from "@/mocks/mitra-kerja";
import { MitraInstitution } from "@/types";

import { MitraKerjaModalState } from "@/features/mitra-kerja/types/modal";
import { useMitraStore } from "@/features/mitra-kerja/store/useMitraKerjaStore";
import { useAuthStore } from "@/store/useAuthStore";
import { canAddMitraKerja } from "@/lib/auth/permissions";

export default function MitraKerjaPage() {
  const { currentUser } = useAuthStore();
  const canAdd = canAddMitraKerja(currentUser);

  const { institutions, isInitialized, setInstitutions, markAsInitialized } =
    useMitraStore();

  // 1. Source of Truth dari Hook CRUD
  const {
    isLoading,

    // CRUD
    addMitra,
    updateMitra,

    // DELETE
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    isDeleteOpen,
    selectedMitra,
  } = useMitraCRUD(mockMitraInstitutions);

  // 2. UI States
  const [modalState, setModalState] = useState<MitraKerjaModalState>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized && institutions.length === 0) {
      setInstitutions(mockMitraInstitutions);
      markAsInitialized();
    }
  }, [isInitialized, institutions.length, setInstitutions, markAsInitialized]);

  // 3. Memoized Stats

  const stats = useMemo(
    () => calculateMitraStats(institutions),
    [institutions],
  );

  // 4. Handlers
  const handleOpenAdd = () => setModalState({ type: "add" });
  const handleOpenEdit = (m: MitraInstitution) =>
    setModalState({ type: "edit", data: m });

  const closeModal = () => setModalState(null);

  const handleSubmit = async (formData: MitraFormData) => {
    let success = false;
    if (modalState?.type === "edit") {
      // Tambahkan await dan success check agar modal tidak menutup jika error
      success = await updateMitra({
        ...formData,
        id: modalState.data.id,
      } as MitraInstitution);
    } else {
      success = await addMitra(formData);
    }

    if (success) closeModal();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
      {/* Global Notification Alert */}

      <MitraKerjaHeader
        totalInstitutions={stats.totalInstitutions}
        activeInstitutions={stats.activeInstitutions}
        onAdd={canAdd ? handleOpenAdd : undefined}
        onFilter={() => {}} // Tambahkan fungsi filter jika diperlukan
        isReadOnly={true}
      />

      <div className="mt-6">
        <MitraKerjaGrid
          institutions={institutions}
          onEdit={handleOpenEdit}
          onRequestDelete={openDeleteConfirm}
          isReadOnly={true}
        />
      </div>

      {/* Form Modal */}
      <MitraFormModal
        modalState={modalState}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        title="Hapus Mitra Kerja?"
        name={selectedMitra?.name}
        entityLabel="mitra kerja"
        recommendation="Jika data masih diperlukan untuk pengarsipan, cukup ubah status mitra kerja menjadi Non-Aktif tanpa perlu menghapusnya."
        onCancel={closeDeleteConfirm}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
