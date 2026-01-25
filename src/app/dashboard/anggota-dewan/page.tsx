"use client";

import { useState, useMemo, useEffect } from "react";

// Shared Components (Global)
import { AppNotification } from "@/components/shared/AppNotification";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";

// Feature Components
import AnggotaDewanHeader from "@/features/anggota-dewan/components/AnggotaDewanHeader";
import AnggotaDewanFilter from "@/features/anggota-dewan/components/AnggotaDewanFilter";
import {AnggotaDewanTable }from "@/features/anggota-dewan/components/AnggotaDewanTable";
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

// Types
import { AnggotaFormData } from "@/features/anggota-dewan/types/AnggotaFormData";
import { AnggotaModalState } from "@/features/anggota-dewan/types/modal";
import { AnggotaDewanRow } from "@/features/anggota-dewan/view/anggota-dewan-row";

export default function AnggotaDewanPage() {
  const { setAnggota, setUsers, anggota } = useAnggotaStore();
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
  } = useAnggotaDewanTable(anggota);

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
          anggota: { name: formData.name } as any,
          user: { username: formData.username } as any,
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
      name: resetTarget.anggota.name,
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
        onAdd={() => setModalState({ type: "add" })}
        onFilter={() => setShowFilter((v) => !v)}
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
      />

      {/*  Shared Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={deleteState.isOpen}
        title="Hapus Anggota Dewan?"
        name={deleteState.data?.name}
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

// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { Alert } from "@heroui/react";
// import { generateMockAnggota, calculateStats } from "@/mocks/anggotadewan";
// import { useAnggotaDewanTable } from "@/features/anggota-dewan/hooks/useAnggotaDewanTable";
// import { useAnggotaDewanCRUD } from "@/features/anggota-dewan/hooks/useAnggotaDewanCRUD";
// import AnggotaDewanHeader from "@/features/anggota-dewan/components/AnggotaDewanHeader";
// import AnggotaDewanFilter from "@/features/anggota-dewan/components/AnggotaDewanFilter";
// import AnggotaDewanTable from "@/features/anggota-dewan/components/AnggotaDewanTable";
// import { mockUsers } from "@/mocks/user";
// import { resolveAnggotaDewanTable } from "@/lib/utils/anggota-dewan/resolveAnggotaDewan";
// import { AnggotaFormModal } from "@/features/anggota-dewan/components/AnggotaForm.modal";
// import { AnggotaModalState } from "@/features/anggota-dewan/types/modal";
// import { AnggotaFormData } from "@/features/anggota-dewan/types/AnggotaFormData";
// import { Pagination } from "@heroui/pagination";
// import { AnggotaDewanRow } from "@/types/view/anggota-dewan-row";
// import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
// import { AppNotification } from "@/components/shared/AppNotification";

// export default function AnggotaDewanPage() {

//   const initialAnggota = useMemo(() => generateMockAnggota(), []);
//   const {
//     anggota,
//     users,
//     isLoading,
//     notification,
//     setNotification,
//     // CRUD
//     addAnggota,
//     updateAnggota,

//     // DELETE CONFIRM FLOW
//     openDeleteConfirm,
//     closeDeleteConfirm,
//     confirmDelete,
//     isDeleteOpen,
//     selectedAnggota,
//   } = useAnggotaDewanCRUD(initialAnggota, mockUsers);

//   const {
//     data,
//     filter,
//     setFilter,
//     page,
//     setPage,
//     totalPages,
//     totalItems,
//     rowsPerPage,
//   } = useAnggotaDewanTable(anggota);

//   const resolvedRows: AnggotaDewanRow[] = useMemo(() => {
//     return resolveAnggotaDewanTable(data, users);
//   }, [data, users]);

//   const [modalState, setModalState] = useState<AnggotaModalState>(null);

//   const openAdd = () => setModalState({ type: "add" });
//   const openEdit = (row: AnggotaDewanRow) =>
//     setModalState({ type: "edit", data: row });

//   const handleDelete = (row: AnggotaDewanRow) => {
//     openDeleteConfirm(row);
//   };

//   const closeModal = () => setModalState(null);

//   const handleSubmit = async (data: AnggotaFormData) => {
//     let success = false;
//     if (modalState?.type === "edit") {
//       updateAnggota({
//         ...data,
//         id: modalState.data.id,
//         userId: modalState.data.userId,
//       });
//     } else {
//       success = await addAnggota(data);
//     }

//     if (success) closeModal();
//   };

//   const stats = useMemo(() => calculateStats(anggota), [anggota]);

//   const [showFilter, setShowFilter] = useState(false);

//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 py-1">
//       {/* Notifikasi Alert */}
//       <AppNotification
//         notification={notification}
//         onClose={() => setNotification(null)}
//       />

//       <AnggotaDewanHeader
//         stats={stats}
//         onAdd={openAdd}
//         onFilter={() => setShowFilter((v) => !v)}
//       />

//       <AnggotaFormModal
//         isLoading={isLoading}
//         modalState={modalState}
//         onClose={closeModal}
//         onSubmit={handleSubmit}
//       />

//       {showFilter && (
//         <AnggotaDewanFilter
//           filter={filter}
//           onFilterChange={setFilter}
//           onReset={() =>
//             setFilter({
//               status: "all",
//               akd: [],
//               search: "",
//               sortBy: "name",
//               sortOrder: "asc",
//             })
//           }
//         />
//       )}

//       <AnggotaDewanTable
//         anggota={resolvedRows}
//         onEdit={openEdit}
//         onDelete={handleDelete}
//       />

//       <ConfirmDeleteModal
//         isOpen={isDeleteOpen}
//         name={selectedAnggota?.name}
//         onCancel={closeDeleteConfirm}
//         onConfirm={confirmDelete}
//         isLoading={isLoading}
//       />

//       <ConfirmDeleteModal
//         isOpen={deleteId !== null}
//         name={institutions.find((i) => i.id === deleteId)?.name}
//         onCancel={() => setDeleteId(null)}
//         onConfirm={async () => {
//           await deleteMitra(deleteId!);
//           setDeleteId(null);
//         }}
//         isLoading={isLoading}
//       />

//       <div className="mt-auto flex justify-between items-center py-7">
//         <div className="text-sm text-gray-600 mb-2">
//           Menampilkan {(page - 1) * rowsPerPage + 1}–
//           {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} anggota
//         </div>

//         <Pagination
//           isCompact
//           showControls
//           page={page}
//           total={totalPages}
//           onChange={setPage}
//         />
//       </div>

//       {/* versi 2 */}

//       {/* <section className="mt-6 rounded-2xl border-bottom border-gray-200 bg-white shadow-sm flex flex-col min-h-[calc(100vh-260px)]">
//         {/* TABLE AREA */}
//       {/* <div className="flex-1 relative overflow-x-auto">
//           <div className="min-w-[1100px] mb-2">
//             <AnggotaDewanTable
//               anggota={data}
//               onEdit={openEdit}
//               onDelete={handleDelete}
//             />
//           </div>
//         </div>  */}

//       {/* PAGINATION AREA */}
//       {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-3">
//           <div className="text-sm text-gray-600">
//             Menampilkan {(page - 1) * rowsPerPage + 1}–
//             {Math.min(page * rowsPerPage, totalItems)} dari {totalItems} anggota
//           </div>

//           <Pagination
//             isCompact
//             showControls
//             page={page}
//             total={totalPages}
//             onChange={setPage}
//           />
//         </div>
//       </section> */}
//     </div>
//   );
// }
