// @/features/sekretaris-dewan/hooks/useSekretarisDewanCRUD.ts
"use client";

import { useState, useCallback } from "react";
import { useSekretarisDewanStore } from "../store/useSekretarisDewanStore";
import { useUIStore } from "@/store/useUIStore";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";

const fakeDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export const useSekretarisDewanCRUD = () => {
  const { showNotification } = useUIStore();
  const { setSekretarisDewan } = useSekretarisDewanStore();

  const [isLoading, setIsLoading] = useState(false);

  // State untuk Modal Konfirmasi Hapus (Pola yang sama dengan Anggota Dewan)
  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    data: SekretarisDewanProfile | null;
  }>({ isOpen: false, data: null });

  /** =======================
   * CREATE
   * ======================= */
  const addSekretaris = useCallback(
    async (formData: SekretarisDewanFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        const newProfile: SekretarisDewanProfile = {
          id: `sekwan-${Date.now()}`,
          userId: formData.userId,
          jabatan: formData.jabatan,
          periodeStart: formData.periodeStart || new Date(),
          periodeEnd: formData.periodeEnd || new Date(),
          isActive: formData.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setSekretarisDewan((prev) => [...prev, newProfile]);
        showNotification("success", "Profil Sekretaris berhasil ditambahkan");
        return true;
      } catch {
        showNotification("danger", "Gagal menambahkan data");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setSekretarisDewan, showNotification],
  );

  /** =======================
   * UPDATE
   * ======================= */
  /** =======================
   * UPDATE
   * ======================= */
  const updateSekretaris = useCallback(
    async (id: string, formData: SekretarisDewanFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        setSekretarisDewan((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  jabatan: formData.jabatan,
                  // FIX: Jika null, gunakan data lama (item.periodeStart)
                  // atau gunakan new Date() sebagai cadangan terakhir
                  periodeStart:
                    formData.periodeStart ?? item.periodeStart ?? new Date(),
                  periodeEnd:
                    formData.periodeEnd ?? item.periodeEnd ?? new Date(),
                  isActive: formData.isActive,
                  updatedAt: new Date(),
                }
              : item,
          ),
        );

        showNotification("success", "Data berhasil diperbarui");
        return true;
      } catch (error) {
        showNotification("danger", "Gagal memperbarui data");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setSekretarisDewan, showNotification],
  );

  /** =======================
   * DELETE FLOW
   * ======================= */
  const openDelete = (profile: SekretarisDewanProfile) => {
    setDeleteState({ isOpen: true, data: profile });
  };

  const closeDelete = () => {
    setDeleteState({ isOpen: false, data: null });
  };

  /** =======================
   * DELETE FLOW
   * ======================= */
  const confirmDelete = async () => {
    // 1. Pastikan data yang mau dihapus ada
    if (!deleteState.data) return;

    setIsLoading(true);
    try {
      await fakeDelay(500);

      // Ambil ID profil yang ingin dihapus
      const idToDelete = deleteState.data.id;

      // 2. Gunakan pola functional update untuk memastikan
      // Zustand benar-benar merubah reference array-nya
      setSekretarisDewan((prev) => {
        const filtered = prev.filter((s) => s.id !== idToDelete);
        console.log("Data setelah dihapus:", filtered); // Cek di console log
        return filtered;
      });

      showNotification("success", "Profil berhasil dihapus");
      closeDelete(); // Tutup modal setelah sukses
    } catch (error) {
      showNotification("danger", "Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addSekretaris,
    updateSekretaris,
    // Delete Modal Props
    deleteState,
    openDelete,
    closeDelete,
    confirmDelete,
  };
};;;

// // hooks/useSekretarisDewanCRUD.ts
// import { useCallback, useState } from "react";
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
// import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
// import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
// import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";

// export const useSekretarisDewanCRUD = () => {
//   const {
//     sekretarisDewan,
//     addSekretarisDewan,
//   } = useSekretarisDewanStore();
//   const { anggota } = useAnggotaStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const add = useCallback(
//     async (formData: SekretarisDewanFormData) => {
//       setIsLoading(true);
//       // Simulasi API call
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const newProfile: SekretarisDewanProfile = {
//         id: `sekretaris-${Date.now()}`,
//         userId: formData.userId,
//         jabatan: formData.jabatan,
//         periodeStart: formData.periodeStart || new Date(),
//         periodeEnd: formData.periodeEnd || new Date(),
//         isActive: formData.isActive,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       addSekretarisDewan(newProfile);
//       setIsLoading(false);
//       return newProfile;
//     },
//     [addSekretarisDewan],
//   );

//   const update = useCallback(
//     async (id: string, formData: SekretarisDewanFormData) => {
//       setIsLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const updated: Partial<SekretarisDewanProfile> = {
//         jabatan: formData.jabatan,
//         periodeStart: formData.periodeStart || new Date(),
//         periodeEnd: formData.periodeEnd || new Date(),
//         isActive: formData.isActive,
//         updatedAt: new Date(),
//       };
//       updateSekretarisDewan(id, updated);
//       setIsLoading(false);
//     },
//     [updateSekretarisDewan],
//   );

//   const remove = useCallback(
//     async (id: string) => {
//       setIsLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       deleteSekretarisDewan(id);
//       setIsLoading(false);
//     },
//     [deleteSekretarisDewan],
//   );

//   return {
//     isLoading,
//     addSekretarisDewan: add,
//     updateSekretarisDewan: update,
//     deleteSekretarisDewan: remove,
//     sekretarisDewan,
//   };
// };

///////////
// "use client";

// import { useState, useCallback } from "react";
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
// import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";
// import { useUIStore } from "@/store/useUIStore";
// import { useSekretarisDewanStore } from "@/store/useSekretarisDewanStore";
// import { useAnggotaStore } from "@/store/useAnggotaStore";

// const fakeDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

// export const useSekretarisDewanCRUD = () => {
//   const showNotification = useUIStore((state) => state.showNotification);
//   const { sekretarisDewan, setSekretarisDewan } = useSekretarisDewanStore();
//   const { anggota } = useAnggotaStore(); // Ambil data anggota dari store sebelah

//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] =
//     useState<SekretarisDewanProfile | null>(null);

//   /**
//    * CREATE: Menambahkan profil Sekretaris untuk Anggota tertentu
//    */
//   const addSekretarisProfile = useCallback(
//     async (formData: SekretarisDewanFormData) => {
//       setIsLoading(true);
//       try {
//         await fakeDelay(700);

//         // LOGIK: Cari Anggota berdasarkan Nama (karena di form inputnya Nama)
//         const person = anggota.find((a) => a.name === formData.name);

//         if (!person) {
//           showNotification(
//             "danger",
//             "Gagal: Nama tersebut tidak terdaftar di data Anggota.",
//           );
//           return false;
//         }

//         // Cek jika orang tersebut sudah punya profil sekretaris aktif
//         const existing = sekretarisDewan.find(
//           (s) => s.userId === person.userId,
//         );
//         if (existing) {
//           showNotification(
//             "warning",
//             "Orang ini sudah memiliki profil Sekretaris.",
//           );
//           return false;
//         }

//         const newProfile: SekretarisDewanProfile = {
//           id: `sekwan-${Date.now()}`,
//           userId: person.userId, // Hubungkan ke userId Anggota
//           jabatan: formData.jabatan,
//           periodeStart: formData.periodeStart || new Date(),
//           periodeEnd: formData.periodeEnd || new Date(),
//           isActive: formData.status === "active",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         };

//         setSekretarisDewan((prev) => [...prev, newProfile]);
//         showNotification(
//           "success",
//           `Profil Sekretaris ${person.name} berhasil dibuat.`,
//         );
//         return true;
//       } catch (error) {
//         showNotification("danger", "Terjadi kesalahan sistem.");
//         return false;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [anggota, sekretarisDewan, setSekretarisDewan, showNotification],
//   );

//   /**
//    * UPDATE
//    */
//   const updateSekretarisProfile = useCallback(
//     async (id: string, formData: SekretarisDewanFormData) => {
//       setIsLoading(true);
//       try {
//         await fakeDelay(600);

//         setSekretarisDewan((prev) =>
//           prev.map((item) =>
//             item.id === id
//               ? {
//                   ...item,
//                   jabatan: formData.jabatan,
//                   periodeStart: formData.periodeStart || item.periodeStart,
//                   periodeEnd: formData.periodeEnd || item.periodeEnd,
//                   isActive: formData.status === "active",
//                   updatedAt: new Date(),
//                 }
//               : item,
//           ),
//         );

//         showNotification("success", "Profil berhasil diperbarui.");
//         return true;
//       } catch {
//         showNotification("danger", "Gagal memperbarui profil.");
//         return false;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setSekretarisDewan, showNotification],
//   );

//   /**
//    * DELETE FLOW
//    */
//   const openDeleteConfirm = (profile: SekretarisDewanProfile) => {
//     setSelectedProfile(profile);
//     setIsDeleteOpen(true);
//   };

//   const closeDeleteConfirm = () => {
//     setIsDeleteOpen(false);
//     setSelectedProfile(null);
//   };

//   const confirmDelete = async () => {
//     if (!selectedProfile) return;
//     setIsLoading(true);
//     try {
//       await fakeDelay(500);
//       setSekretarisDewan((prev) =>
//         prev.filter((s) => s.id !== selectedProfile.id),
//       );
//       showNotification("success", "Profil Sekretaris telah dihapus.");
//       closeDeleteConfirm();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     sekretarisDewan,
//     isLoading,
//     addSekretarisProfile,
//     updateSekretarisProfile,
//     openDeleteConfirm,
//     closeDeleteConfirm,
//     confirmDelete,
//     isDeleteOpen,
//     selectedProfile,
//   };
// };

///////////
// import { AnggotaDewan } from '@/types/anggota-dewan';
// "use client";
// import { useState, useCallback } from "react";
// import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
// import { AnggotaDewan } from "@/types";
// import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";

// import { useUIStore } from "@/store/useUIStore";
// import { useSekretarisDewanStore } from "@/store/useSekretarisDewanStore";

// const fakeDelay = (ms = 500) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// export const useSekretarisDewanCRUD = () => {
//     const showNotification = useUIStore((state) => state.showNotification);
//     const {sekretarisDewan, anggotaDewan, setSekretarisDewan, setAnggotaDewan} = useSekretarisDewanStore();

//     const [isLoading, setIsLoading] = useState(false);
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//     const [selectedSekretaris, setSelectedSekretaris] = useState<SekretarisDewanProfile | null>(null);

//   /** =======================
//    * CREATE
//    * ======================= */
//   const addSekretarisProfile = useCallback(async (formData: SekretarisDewanFormData) => {
//     setIsLoading(true);
//     try {
//       await fakeDelay(800);
//       const AnggotaDewanId = anggotaDewan.find((a) => a.userId === formData.userId)?.userId || "";
//     const AnggotaDewanData = anggotaDewan.find((a) => a.userId === formData.userId);
//     if (!AnggotaDewanData) {
//         throw new Error("Anggota Dewan tidak ditemukan untuk userId tersebut.");
//     }
//       const newSekretaris: SekretarisDewanProfile = {
//         id: `sekretaris-${Date.now()}`,
//       const userId = `user-${Date.now()}`;
//         const newSekretaris: SekretarisDewanProfile = {
//             id: `sekretaris-${Date.now()}`,
//             name: formData.name,
//             periodeStart: data.periodeStart,
//             periodeEnd: data.periodeEnd,
//             isActive: data.isActive,
//             userID: userId,
//         };
