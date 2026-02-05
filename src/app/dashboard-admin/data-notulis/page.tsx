"use client";

import { useState, useMemo, useEffect } from "react";
import { useNotulisStore } from "@/features/data-notulis/store/useNotulisStore";
import { useNotulisCRUD } from "@/features/data-notulis/hooks/useNotulisCRUD";
import { useNotulisTable } from "@/features/data-notulis/hooks/useNotulisTable";
import { resolveNotulisTable } from "@/features/data-notulis/utils/resolveNotulisTable";
import { NotulisRow } from "@/features/data-notulis/types/notulis-row";
import { NotulisFormData } from "@/features/data-notulis/types/notulis-form-data";

// Components
import NotulisHeader from "@/features/data-notulis/components/NotulisHeader";
import NotulisTable from "@/features/data-notulis/components/NotulisTable";
import NotulisFilter from "@/features/data-notulis/components/NotulisFilter";
import { NotulisFormModal } from "@/features/data-notulis/components/NotulisFormModal";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { ResetPasswordModal } from "@/components/shared/ResetPasswordModal";
import { Pagination } from "@heroui/pagination";
import { mockNotulis } from "@/mocks/notulis";
import { mockUsers } from "@/mocks/user";
import { generatePassword } from "@/lib/utils/generatePassword";

export default function DataNotulisPage() {
  const {
    notulisList,
    users,
    isInitialized,
    setNotulisList,
    setUsers,
    markAsInitialized,
    _hasHydrated,
  } = useNotulisStore();

  // Initialize store with mock data if not already initialized
  useEffect(() => {
    if (_hasHydrated && !isInitialized) {
      setNotulisList(mockNotulis);
      setUsers(mockUsers);
      markAsInitialized();
    }
  }, [
    _hasHydrated,
    isInitialized,
    setNotulisList,
    setUsers,
    markAsInitialized,
  ]);

  const {
    isLoading,
    addNotulis,
    updateNotulis,
    resetPassword,
    deleteState,
    openDelete,
    closeDelete,
    confirmDelete,
  } = useNotulisCRUD();

  const {
    data: filteredNotulis,
    filter,
    setFilter,
    resetFilter,
    page,
    setPage,
    totalPages,
    totalItems,
    rowsPerPage,
  } = useNotulisTable(notulisList, users);

  // UI States
  const [modalState, setModalState] = useState<{
    type: "add" | "edit";
    data?: NotulisRow;
  } | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Reset Password States
  const [resetTarget, setResetTarget] = useState<NotulisRow | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [credentialMode, setCredentialMode] = useState<"reset" | "create">(
    "reset",
  );

  const tableData = useMemo(
    () => resolveNotulisTable(filteredNotulis, users),
    [filteredNotulis, users],
  );

  const handleSubmit = async (formData: NotulisFormData) => {
    let success = false;
    if (modalState?.type === "edit" && modalState.data) {
      success = await updateNotulis(
        modalState.data.notulis.id,
        modalState.data.notulis.userID,
        formData,
      );
      if (success) setModalState(null);
    } else {
      success = await addNotulis(formData);
      if (success) {
        setModalState(null);
        // Show credentials for the newly created notulis
        setCredentialMode("create");
        setResetTarget({
          id: "temp-" + Date.now(),
          notulis: {} as any,
          user: { name: formData.name, username: formData.username } as any,
          _meta: {} as any,
        });
        setTempPassword(formData.password || "default123");
      }
    }
  };

  const handleResetPassword = (row: NotulisRow) => {
    setResetTarget(row);
    setCredentialMode("reset");
    setTempPassword(null);
  };

  const confirmResetFlow = async () => {
    if (!resetTarget) return;
    const pwd = generatePassword();
    const success = await resetPassword(resetTarget.notulis.userID, pwd);
    if (success) {
      setTempPassword(pwd);
    }
  };

  if (!_hasHydrated) return null;

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto px-4 py-6">
      <NotulisHeader
        onAdd={() => setModalState({ type: "add" })}
        onToggleFilter={() => setShowFilter(!showFilter)}
        isFilterOpen={showFilter}
      />

      <div className="flex flex-col gap-6">
        {showFilter && (
          <NotulisFilter
            filter={filter}
            onFilterChange={setFilter}
            onReset={resetFilter}
            onClose={() => setShowFilter(false)}
          />
        )}

        <div className=" min-h-[800px] flex flex-col">
          <div className="flex-1">
            <NotulisTable
              data={tableData}
              onEdit={(row) => setModalState({ type: "edit", data: row })}
              onDelete={(row) => openDelete(row.notulis)}
              onResetPassword={handleResetPassword}
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

      {/* Modals */}
      <NotulisFormModal
        isLoading={isLoading}
        modalState={modalState}
        onClose={() => setModalState(null)}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        isOpen={deleteState.isOpen}
        isLoading={isLoading}
        title="Hapus Data Notulis?"
        name={
          deleteState.data
            ? users.find((u) => u.id === deleteState.data?.userID)?.name ||
              "Notulis"
            : ""
        }
        entityLabel="Data Notulis"
        onCancel={closeDelete}
        onConfirm={confirmDelete}
      />

      <ResetPasswordModal
        isOpen={!!resetTarget}
        mode={credentialMode}
        user={
          resetTarget
            ? {
                name: resetTarget.user.name,
                username: resetTarget.user.username,
              }
            : undefined
        }
        temporaryPassword={tempPassword || undefined}
        onReset={confirmResetFlow}
        onClose={() => {
          setResetTarget(null);
          setTempPassword(null);
        }}
      />
    </div>
  );
}
