"use client";

import { useState, useCallback } from "react";
import { AnggotaDewan } from "@/types/anggota-dewan";
import { User } from "@/types";
import { AnggotaFormData } from "../types/AnggotaFormData";
import { useUIStore } from "@/store/useUIStore";
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";

const hash = (v: string) => `hashed(${v})`;

const fakeDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const useAnggotaDewanCRUD = () => {
  // 1. Ambil State & Actions dari Zustand
  const { showNotification } = useUIStore();
  const { anggota, users, setAnggota, setUsers } = useAnggotaStore();

  // 2. State Lokal untuk UI yang sifatnya temporer (Modal & Loading)
  const [isLoading, setIsLoading] = useState(false);

  const [selectedAnggota, setSelectedAnggota] = useState<AnggotaDewan | null>(
    null,
  );

  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    data: AnggotaDewan | null;
  }>({
    isOpen: false,
    data: null,
  });

  /** =======================
   * CREATE
   * ======================= */
  const addAnggota = useCallback(
    async (formData: AnggotaFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();
        const userId = `user-${Date.now()}`;

        const newUser: User = {
          id: userId,
          username: formData.username,
          password: hash(formData.password),
          name: formData.name,
          role: "ANGGOTA_DEWAN",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newAnggota: AnggotaDewan = {
          id: `anggota-${Date.now()}`,
          userId,
          jabatan: formData.jabatan,
          akd: formData.akd,
          status: formData.status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Menggunakan functional update Zustand
        setUsers((prev) => [...prev, newUser]);
        setAnggota((prev) => [...prev, newAnggota]);

        showNotification("success", `Berhasil menambah ${formData.name}`);
        return true;
      } catch {
        showNotification("danger", "Gagal menambah data anggota.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification, setAnggota, setUsers],
  );

  /** =======================
   * UPDATE
   * ======================= */
  const updateAnggota = useCallback(
    async (formData: AnggotaFormData & { id: string; userId: string }) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        setAnggota((prev) =>
          prev.map((a) =>
            a.id === formData.id
              ? {
                  ...a,
                  jabatan: formData.jabatan,
                  akd: formData.akd,
                  status: formData.status,
                  updatedAt: new Date(),
                }
              : a,
          ),
        );

        setUsers((prev) =>
          prev.map((u) =>
            u.id === formData.userId
              ? {
                  ...u,
                  username: formData.username,
                  name: formData.name,
                  updatedAt: new Date(),
                }
              : u,
          ),
        );

        showNotification("success", "Data anggota berhasil diperbarui.");
        return true;
      } catch {
        showNotification("danger", "Gagal memperbarui data anggota.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification, setAnggota, setUsers],
  );

  /** =======================
   * DELETE FLOW
   * ======================= */

  const openDelete = (target: AnggotaDewan) =>
    setDeleteState({ isOpen: true, data: target });
  const closeDelete = () => setDeleteState({ isOpen: false, data: null });

  const confirmDelete = async () => {
    if (!deleteState.data) return false;
    setIsLoading(true);
    try {
      await fakeDelay();
      const { id: targetId, userId: targetUserId } = deleteState.data;
      setAnggota((prev) => prev.filter((a) => a.id !== targetId));
      setUsers((prev) => prev.filter((u) => u.id !== targetUserId));
      showNotification("success", `Data anggota berhasil dihapus.`);
      closeDelete();
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    anggota,
    users,
    isLoading,
    addAnggota,
    updateAnggota,

    confirmDelete,
    openDelete,
    closeDelete,
    deleteState,
    selectedAnggota,
  };
};
