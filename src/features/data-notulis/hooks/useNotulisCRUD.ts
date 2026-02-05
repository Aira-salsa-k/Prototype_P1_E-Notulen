"use client";

import { useState, useCallback } from "react";
import { useNotulisStore } from "../store/useNotulisStore";
import { useUIStore } from "@/store/useUIStore";
import { Notulis } from "@/types/notulis";
import { User } from "@/types/user";
import { NotulisFormData } from "../types/notulis-form-data";
import { generatePassword } from "@/lib/utils/generatePassword";

const fakeDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms));
const hash = (v: string) => `hashed(${v})`;

export const useNotulisCRUD = () => {
  const { showNotification } = useUIStore();
  const { setNotulisList, setUsers, notulisList, users } = useNotulisStore();
  const [isLoading, setIsLoading] = useState(false);

  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    data: Notulis | null;
  }>({ isOpen: false, data: null });

  const addNotulis = useCallback(
    async (formData: NotulisFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        const userId = `user-notulis-${Date.now()}`;
        const notulisId = `notulis-${Date.now()}`;

        const newUser: User = {
          id: userId,
          username: formData.username,
          name: formData.name,
          password: hash(formData.password || "default123"),
          role: "NOTULIS",
          isActive: formData.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newNotulis: Notulis = {
          id: notulisId,
          userID: userId,
          NIP: formData.NIP,
          isActive: formData.isActive,
        };

        setUsers((prev) => [...prev, newUser]);
        setNotulisList((prev) => [...prev, newNotulis]);

        showNotification(
          "success",
          `Data Notulis ${formData.name} berhasil ditambahkan`,
        );
        return true;
      } catch {
        showNotification("danger", "Gagal menambahkan data");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setNotulisList, setUsers, showNotification],
  );

  const updateNotulis = useCallback(
    async (notulisId: string, userId: string, formData: NotulisFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  username: formData.username,
                  name: formData.name,
                  isActive: formData.isActive,
                  updatedAt: new Date(),
                }
              : u,
          ),
        );

        setNotulisList((prev) =>
          prev.map((n) =>
            n.id === notulisId
              ? {
                  ...n,
                  NIP: formData.NIP,
                  isActive: formData.isActive,
                }
              : n,
          ),
        );

        showNotification("success", "Data berhasil diperbarui");
        return true;
      } catch {
        showNotification("danger", "Gagal memperbarui data");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setNotulisList, setUsers, showNotification],
  );

  const resetPassword = useCallback(
    async (userId: string, newPassword: string) => {
      setIsLoading(true);
      try {
        await fakeDelay();
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  password: hash(newPassword),
                  updatedAt: new Date(),
                }
              : u,
          ),
        );
        showNotification("success", "Password berhasil direset.");
        return true;
      } catch {
        showNotification("danger", "Gagal mereset password.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setUsers, showNotification],
  );

  const openDelete = (notulis: Notulis) => {
    setDeleteState({ isOpen: true, data: notulis });
  };

  const closeDelete = () => {
    setDeleteState({ isOpen: false, data: null });
  };

  const confirmDelete = async () => {
    if (!deleteState.data) return;

    setIsLoading(true);
    try {
      await fakeDelay(500);
      const targetNotulis = deleteState.data;

      setNotulisList((prev) => prev.filter((n) => n.id !== targetNotulis.id));
      setUsers((prev) => prev.filter((u) => u.id !== targetNotulis.userID));

      showNotification("success", "Data berhasil dihapus");
      closeDelete();
    } catch {
      showNotification("danger", "Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notulisList,
    users,
    isLoading,
    addNotulis,
    updateNotulis,
    resetPassword,
    deleteState,
    openDelete,
    closeDelete,
    confirmDelete,
  };
};
