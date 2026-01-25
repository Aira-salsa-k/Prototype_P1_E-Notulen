// app/dashboard/page.tsx
// export default function AnggotaDewanPage() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold font-sans text-gray-900 mb-6">
//         Sekretaris Dewan
//       </h1>
//       <div className="bg-white rounded-lg shadow p-6">
//         <p className="text-gray-600 font-sans">Sekretaris Dewan</p>
//         {/* Tambahkan konten dashboard di sini */}
//       </div>
//     </div>
//   );
// }
// // app/sekretaris-dewan/page.tsx
// "use client";

// import { useMemo, useEffect, useState } from "react";
// import { useAnggotaStore } from "@/store/useAnggotaStore";
// import { useSekretarisDewanStore } from "@/store/useSekretarisDewanStore";
// import { resolveSekwanTable } from "@/lib/utils/sekretaris-dewan/resolveSekretatisDewanTable";
// import { generateMockSekwan } from "@/mocks";
// import { generateMockAnggota } from "@/mocks/anggota-dewan";
// import { useSekretarisDewanTable } from "@/features/sekretaris-dewan/hooks/useSekretarisDewanTable";
// import { useSekretarisDewanCRUD } from "@/features/sekretaris-dewan/hooks/useSekretarisDewanCRUD";
// import { SekretarisDewanModalState } from "@/features/sekretaris-dewan/types/modal";
// import { SekretarisDewanFormData } from "@/features/sekretaris-dewan/types/SekretarisDewanFormData";

// import { Pagination } from "@heroui/pagination";
// import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";

// export default function SekretarisDewanPage() {
//   const {
//     anggota,
//     isInitialized: isAnggotaReady,
//     setAnggota,
//     markAsInitialized,
//   } = useAnggotaStore();
//   const { sekretarisDewan, setSekretarisDewan } = useSekretarisDewanStore();

//   // 1. DATA SOURCE & CRUD LOGIC
//   const initialData = useMemo(() => generateMockSekwan(), []);

//   const {

//     // sekretarisDewan,
//     isLoading,
//     addSekretarisProfile,
//     updateSekretarisProfile,
//     openDeleteConfirm,
//     closeDeleteConfirm,
//     confirmDelete,
//     isDeleteOpen,
//     selectedProfile,
//   } = useSekretarisDewanCRUD();

//   // 2. TABLE LOGIC ( Pagination)
//   const { data, page, setPage, totalPages, rowsPerPage, totalItems } =
//     useSekretarisDewanTable(sekretarisDewan);

//   // 3. UI STATES
//   const [modalState, setModalState] = useState<SekretarisDewanModalState>(null);

//   // 1. SEEDING LOGIC: Hanya jalan jika store kosong
//   useEffect(() => {
//     if (!isAnggotaReady) {
//       setAnggota(generateMockAnggota());
//       markAsInitialized();
//     }
//     if (sekretarisDewan.length === 0) {
//       setSekretarisDewan(generateMockSekwan());
//     }
//   }, []);

//   // 2. DATA RESOLVING: Gabungkan data profil dengan data nama anggota
//   const resolvedRows = useMemo(() => {
//     return resolveSekwanTable(sekretarisDewan, anggota);
//   }, [sekretarisDewan, anggota]);

//   // 5. HANDLERS
//     const handleSubmit = async (formData: SekretarisDewanFormData) => {
//       let success = false;
//       if (modalState?.type === "edit") {
//         // Pastikan updateAnggota juga async agar success check bekerja
//         success = await updateSekretarisProfile({
//           ...formData,
//           id: modalState.data.sekretaris.id,
//           userId: modalState.data.anggota.userId,
//         });
//       } else {
//         success = await addSekretarisProfile(formData);
//       }

//       if (success) setModalState(null);
//     };

//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6">Profil Sekretaris Dewan</h1>

//       <SekretarisDewanTable
//         data={resolvedRows}
//         isLoading={!isAnggotaReady}
//         onEdit={(row) => setModalState({ type: "edit", data: row })}
//         onDelete={(row) => openDeleteConfirm(row.anggota)}
//       />

//       <ConfirmDeleteModal
//         isOpen={isDeleteOpen}
//         title="Hapus Anggota Dewan?"
//         name={selectedProfile?.name}
//         entityLabel="Data Anggota Dewan"
//         recommendation="Jika data masih diperlukan untuk pengarsipan, cukup ubah status anggota dewan menjadi Non-Aktif tanpa perlu menghapusnya."
//         onCancel={closeDeleteConfirm}
//         onConfirm={confirmDelete}
//         isLoading={isLoading}
//       />

//       {/* FOOTER: Pagination & Info */}
//       <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-divider/50">
//         <div className="text-sm text-muted-foreground">
//           Menampilkan{" "}
//           <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span>–
//           <span className="font-medium">
//             {Math.min(page * rowsPerPage, totalItems)}
//           </span>{" "}
//           dari <span className="font-medium">{totalItems}</span> anggota
//         </div>

//         <Pagination
//           isCompact
//           showControls
//           page={page}
//           total={totalPages}
//           onChange={(p) => setPage(Number(p))}
//           color="primary"
//           variant="flat"
//         />
//       </div>
//     </div>
//   );
// }

/////////////
// app/sekretaris-dewan/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { useSekretarisDewanCRUD } from "@/features/sekretaris-dewan/hooks/useSekretarisDewanCRUD";
import { resolveSekretarisDewan } from "@/features/sekretaris-dewan/utils/resolveSekretatisDewanTable";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { SekretarisDewanFormData } from "@/features/sekretaris-dewan/types/SekretarisDewanFormData";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { SekretarisDewanRow } from "@/features/sekretaris-dewan/views/sekretatis-dewan-row";

import { SekretarisDewanTable } from "@/features/sekretaris-dewan/components/SekretarisDewanProfileTable";
import { SekretarisDewanFormModal } from "@/features/sekretaris-dewan/components/SekretarisDewanForm.modal";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import SekretarisDewanHeader from "@/features/sekretaris-dewan/components/SekretarisDewanHeader";
export default function SekretarisDewanPage() {
  // Inisialisasi store
  const { anggota, setAnggota } = useAnggotaStore();
  const { sekretarisDewan, setSekretarisDewan } = useSekretarisDewanStore();
  const {
    isLoading,
    addSekretaris,
    updateSekretaris,
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

  const [editingData, setEditingData] = useState<
    (SekretarisDewanFormData & { id?: string }) | undefined
  >();

  // Inisialisasi data mock (hanya jika kosong)
  useEffect(() => {
    if (anggota.length === 0) {
      setAnggota(generateMockAnggota());
    }
    if (sekretarisDewan.length === 0) {
      setSekretarisDewan(generateMockSekretarisDewan());
    }
  }, [anggota.length, sekretarisDewan.length, setAnggota, setSekretarisDewan]);

  // Resolve data untuk tabel
  const tableData = useMemo(
    () => resolveSekretarisDewan(sekretarisDewan, anggota),
    [sekretarisDewan, anggota],
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
        userId: row.userId,
        jabatan: row.jabatan,
        // Pastikan format tanggalnya adalah objek Date agar bisa dibaca DatePicker
        periodeStart: new Date(row._meta.originalProfile.periodeStart),
        periodeEnd: new Date(row._meta.originalProfile.periodeEnd),
        isActive: row.isActive,
      },
    });
  };

  

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
  
     
      <SekretarisDewanHeader onAdd={handleAdd} />

      <SekretarisDewanTable
        data={tableData}
        onEdit={(row) =>
          setModalState({ isOpen: true, data: row._meta.originalProfile })
        }
        onDelete={(row) => openDelete(row._meta.originalProfile)}
      />

      <SekretarisDewanFormModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onSubmit={async (data) => {
          const success = modalState.data
            ? await updateSekretaris(modalState.data.id, data)
            : await addSekretaris(data);

          if (success) setModalState({ isOpen: false, data: undefined });
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
    </div>
  );
}
