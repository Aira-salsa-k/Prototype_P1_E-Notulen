"use client";

import { useState, useMemo, useEffect } from "react";

// Shared Components (Global)
import { AppNotification } from "@/components/shared/AppNotification";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";

// Feature Components
import AnggotaDewanHeader from "@/features/anggota-dewan/components/AnggotaDewanHeader";
import AnggotaDewanFilter from "@/features/anggota-dewan/components/AnggotaDewanFilter";
import { AnggotaDewanTable } from "@/features/anggota-dewan/components/AnggotaDewanTable";
import { AnggotaFormModal } from "@/features/anggota-dewan/components/AnggotaForm.modal";
import { Pagination } from "@heroui/pagination";
import { ResetPasswordModal } from "@/components/shared/ResetPasswordModal";

// Hooks & Utils
import { useAnggotaDewanCRUD } from "@/features/anggota-dewan/hooks/useAnggotaDewanCRUD";
import { useAnggotaDewanTable } from "@/features/anggota-dewan/hooks/useAnggotaDewanTable";
import { generateMockAnggota, calculateStats } from "@/mocks/anggota-dewan";
import { mockUsers } from "@/mocks/user";
import { resolveAnggotaDewanTable } from "@/lib/utils/anggota-dewan/resolveAnggotaDewan";
import { generatePassword } from "@/lib/utils/generatePassword";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useAuthStore } from "@/store/useAuthStore";
import { canManageUsers, canResetPassword } from "@/lib/auth/permissions";

// Types
import { AnggotaFormData } from "@/features/anggota-dewan/types/AnggotaFormData";
import { AnggotaModalState } from "@/features/anggota-dewan/types/modal";
import { AnggotaDewanRow } from "@/features/anggota-dewan/view/anggota-dewan-row";

export default function AnggotaDewanPage() {
  const { currentUser } = useAuthStore();
  const canManage = canManageUsers(currentUser);
  const canReset = canResetPassword(currentUser);

  const { setAnggota, setUsers, anggota, isInitialized, _hasHydrated } =
    useAnggotaStore();
  // 1. DATA SOURCE & CRUD LOGIC
  const initialData = useMemo(() => generateMockAnggota(), []);
  const {
    users,
    isLoading,
    addAnggota,
    updateAnggota,
    confirmDelete,
    deleteState,
    openDelete,
    closeDelete,
    selectedAnggota,
  } = useAnggotaDewanCRUD();

  // 2. TABLE LOGIC (Filtering, Pagination, Sorting)
  const {
    data,
    filter,
    setFilter,
    resetFilter,
    page,
    setPage,
    totalPages,
    totalItems,
    rowsPerPage,
  } = useAnggotaDewanTable(anggota, users);

  // 3. UI STATES
  const [modalState, setModalState] = useState<AnggotaModalState>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [resetTarget, setResetTarget] = useState<AnggotaDewanRow | null>(null);

  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [credentialMode, setCredentialMode] = useState<"reset" | "create">(
    "reset",
  );

  useEffect(() => {
    if (anggota.length === 0) {
      setAnggota(generateMockAnggota());
      setUsers(mockUsers);
    }
  }, []);

  // 4. PREPARE DATA FOR VIEW (Merging User & Anggota)
  const resolvedRows = useMemo(() => {
    return resolveAnggotaDewanTable(data, users);
  }, [data, users]);

  const stats = useMemo(() => calculateStats(anggota), [anggota]);

  const handleSubmit = async (formData: AnggotaFormData) => {
    let success = false;

    if (modalState?.type === "edit") {
      success = await updateAnggota({
        ...formData,
        id: modalState.data.anggota.id,
        userId: modalState.data.anggota.userId,
      });
      if (success) setModalState(null);
    } else {
      // MODE TAMBAH (ADD)
      success = await addAnggota(formData);
      if (success) {
        setModalState(null);

        // TRIGGER MODAL KREDENSIAL LANGSUNG
        setCredentialMode("create");
        setResetTarget({
          anggota: {} as any,
          user: { name: formData.name, username: formData.username } as any,
        } as AnggotaDewanRow);
        setTempPassword(formData.password); // Ambil password yang tadi diinput di form
      }
    }
  };

  const handleResetPassword = (row: AnggotaDewanRow) => {
    setResetTarget(row);
    setTempPassword(null);
  };

  const resetUser = useMemo(() => {
    if (!resetTarget) return undefined; // UBAH DARI null KE undefined

    return {
      name: resetTarget.user.name,
      username: resetTarget.user.username,
    };
  }, [resetTarget]);

  const confirmResetPassword = async () => {
    if (!resetTarget) return;

    const pwd = generatePassword(); // util
    setTempPassword(pwd);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
      <AnggotaDewanHeader
        stats={stats}
        onAdd={canManage ? () => setModalState({ type: "add" }) : undefined}
        onFilter={() => setShowFilter((v) => !v)}
        isReadOnly={!canManage}
      />

      <AnggotaFormModal
        isLoading={isLoading}
        modalState={modalState}
        onClose={() => setModalState(null)}
        onSubmit={handleSubmit}
      />

      {showFilter && (
        <AnggotaDewanFilter
          filter={filter}
          onFilterChange={setFilter}
          onReset={resetFilter}
        />
      )}

      <AnggotaDewanTable
        anggota={resolvedRows}
        onEdit={(row) => setModalState({ type: "edit", data: row })}
        onDelete={(row) => openDelete(row.anggota)}
        onResetPassword={handleResetPassword}
        canEdit={canManage}
        canDelete={canManage}
        canResetPassword={canReset}
      />

      {/*  Shared Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={deleteState.isOpen}
        title="Hapus Anggota Dewan?"
        name={
          deleteState.data
            ? users.find((u) => u.id === deleteState.data?.userId)?.name ||
              "Anggota"
            : ""
        }
        entityLabel="Data Anggota Dewan"
        recommendation="Jika data masih diperlukan untuk pengarsipan, cukup ubah status anggota dewan menjadi Non-Aktif tanpa perlu menghapusnya."
        onCancel={closeDelete}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />

      <ResetPasswordModal
        isOpen={!!resetTarget}
        mode={credentialMode} // Oper mode di sini
        user={resetUser}
        temporaryPassword={tempPassword ?? undefined}
        onReset={confirmResetPassword}
        onClose={() => {
          setResetTarget(null);
          setTempPassword(null);
        }}
      />

      {/* FOOTER: Pagination & Info */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-divider/50">
        <div className="text-sm text-muted-foreground">
          Menampilkan{" "}
          <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span>–
          <span className="font-medium">
            {Math.min(page * rowsPerPage, totalItems)}
          </span>{" "}
          dari <span className="font-medium">{totalItems}</span> anggota
        </div>

        <Pagination
          isCompact
          showControls
          page={page}
          total={totalPages}
          onChange={setPage}
          color="primary"
          variant="flat"
        />
      </div>
    </div>
  );
}
