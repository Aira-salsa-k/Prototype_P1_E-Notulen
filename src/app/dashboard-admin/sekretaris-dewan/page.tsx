// app/dashboard-admin/sekretaris-dewan/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
// import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore"; // REMOVED
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { useSekretarisDewanCRUD } from "@/features/sekretaris-dewan/hooks/useSekretarisDewanCRUD";
import { resolveSekretarisDewan } from "@/features/sekretaris-dewan/utils/resolveSekretatisDewanTable";
// import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { useSekretarisDewanTable } from "@/features/sekretaris-dewan/hooks/useSekretarisDewanTable";
import { SekretarisDewanFormData } from "@/features/sekretaris-dewan/types/SekretarisDewanFormData";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { mockUsers } from "@/mocks/user";
import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";

import { SekretarisDewanTable } from "@/features/sekretaris-dewan/components/SekretarisDewanProfileTable";
import { SekretarisDewanFormModal } from "@/features/sekretaris-dewan/components/SekretarisDewanForm.modal";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { ResetPasswordModal } from "@/components/shared/ResetPasswordModal";
import { Pagination } from "@heroui/pagination";
import SekretarisDewanHeader from "@/features/sekretaris-dewan/components/SekretarisDewanHeader";
import { useUIStore } from "@/store/useUIStore";
import { generatePassword } from "@/lib/utils/generatePassword";

export default function SekretarisDewanPage() {
  // Inisialisasi store
  // const { anggota, setAnggota } = useAnggotaStore();
  const {
    sekretarisDewan,
    users,
    setSekretarisDewan,
    setUsers,
    isInitialized,
    markAsInitialized,
    _hasHydrated,
  } = useSekretarisDewanStore();
  const { showNotification } = useUIStore();
  const {
    isLoading,
    addSekretaris,
    updateSekretaris,
    resetPassword,
    deleteState,
    openDelete,
    closeDelete,
    confirmDelete,
  } = useSekretarisDewanCRUD();

  // State untuk UI
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    data?: SekretarisDewanFormData & { id: string };
  }>({ isOpen: false });

  // Reset Password States (Same pattern as Notulis)
  const [resetTarget, setResetTarget] = useState<SekretarisDewanRow | null>(
    null,
  );
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [credentialMode, setCredentialMode] = useState<"reset" | "create">(
    "reset",
  );

  // Inisialisasi data mock (hanya jika kosong atau users belum te-load karena migrasi store)
  useEffect(() => {
    if (_hasHydrated) {
      let shouldReset =
        !isInitialized || sekretarisDewan.length === 0 || users.length === 0;

      // Check consistency: If we have profiles but their linked users are missing
      if (!shouldReset && sekretarisDewan.length > 0) {
        const firstProfile = sekretarisDewan[0];
        const linkedUser = users.find((u) => u.id === firstProfile.userId);
        if (!linkedUser) {
          console.warn(
            "Data inconsistency detected: Profiles exist but linked users are missing. Resetting...",
          );
          shouldReset = true;
        }
      }

      if (shouldReset) {
        setSekretarisDewan(generateMockSekretarisDewan());
        setUsers(mockUsers);
        markAsInitialized();
      }
    }
  }, [
    _hasHydrated,
    isInitialized,
    sekretarisDewan.length,
    users.length,
    setSekretarisDewan,
    setUsers,
    markAsInitialized,
  ]);

  const {
    data: paginatedProfiles,
    page,
    setPage,
    totalPages,
    rowsPerPage,
    totalItems,
  } = useSekretarisDewanTable(sekretarisDewan);

  // Resolve data untuk tabel
  // Resolve data untuk tabel
  const tableData = useMemo(
    () => resolveSekretarisDewan(paginatedProfiles, users),
    [paginatedProfiles, users],
  );

  // Handlers
  const handleAdd = () => {
    setModalState({
      isOpen: true,
      data: undefined, // Reset data untuk mode Tambah
    });
  };

  const handleEdit = (row: SekretarisDewanRow) => {
    setModalState({
      isOpen: true,
      data: {
        id: row.id,
        // userId: row.userId, // removed
        name: row.name,
        username: row.username,
        nip: row.nip,
        jabatan: row.jabatan,
        // Pastikan format tanggalnya adalah objek Date agar bisa dibaca DatePicker
        periodeStart: new Date(row._meta.originalProfile.periodeStart),
        periodeEnd: new Date(row._meta.originalProfile.periodeEnd),
        isActive: row.isActive,
      },
    });
  };

  const handleResetPassword = (row: SekretarisDewanRow) => {
    setResetTarget(row);
    setCredentialMode("reset");
    setTempPassword(null);
  };

  const confirmResetFlow = async () => {
    if (!resetTarget) return;
    const pwd = generatePassword();
    const success = await resetPassword(resetTarget.id, pwd);
    if (success) {
      setTempPassword(pwd);
    }
  };

  if (!_hasHydrated) return null;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
      <SekretarisDewanHeader onAdd={handleAdd} />

      <SekretarisDewanFormModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onSubmit={async (data) => {
          const isEdit = !!modalState.data;
          const success = isEdit
            ? await updateSekretaris(modalState.data!.id, data)
            : await addSekretaris(data);

          if (success) {
            setModalState({ isOpen: false, data: undefined });

            // Jika tambah data baru, tampilkan modal kredensial
            if (!isEdit) {
              setCredentialMode("create");
              setResetTarget({
                id: "temp-" + Date.now(),
                name: data.name,
                username: data.username,
                _meta: {} as any,
              } as any);
              setTempPassword(data.password || "Password anda");
            }
          }
        }}
        isLoading={isLoading}
        onClose={() => setModalState({ isOpen: false })}
      />

      {/* REUSE MODAL HAPUS */}
      <ConfirmDeleteModal
        isOpen={deleteState.isOpen}
        isLoading={isLoading}
        title="Hapus Profil Sekretaris?"
        name={deleteState.data?.jabatan} // Atau cari namanya via resolver
        onCancel={closeDelete}
        onConfirm={confirmDelete}
      />

      {/* MODAL RESET PASSWORD / CREATE CREDENTIALS */}
      <ResetPasswordModal
        isOpen={!!resetTarget}
        mode={credentialMode}
        user={
          resetTarget
            ? {
                name: resetTarget.name,
                username: resetTarget.username,
              }
            : null
        }
        temporaryPassword={tempPassword || undefined}
        onReset={confirmResetFlow}
        onClose={() => {
          setResetTarget(null);
          setTempPassword(null);
        }}
        isLoading={isLoading}
      />

      <div className="min-h-[800px] flex flex-col">
        <div className="flex-1">
          <SekretarisDewanTable
            data={tableData}
            onEdit={handleEdit}
            onResetPassword={handleResetPassword}
            onDelete={(row) => openDelete(row._meta.originalProfile)}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-divider/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-700">
              {(page - 1) * rowsPerPage + 1}
            </span>
            –
            <span className="font-semibold text-gray-700">
              {Math.min(page * rowsPerPage, totalItems)}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-700">{totalItems}</span>{" "}
            data
          </p>
          <Pagination
            showControls
            total={totalPages}
            page={page}
            onChange={setPage}
            color="primary"
            variant="flat"
          />
        </div>
      </div>
    </div>
  );
}
