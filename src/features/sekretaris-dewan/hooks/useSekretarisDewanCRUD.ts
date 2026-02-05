// @/features/sekretaris-dewan/hooks/useSekretarisDewanCRUD.ts
"use client";

import { useState, useCallback } from "react";
import { useSekretarisDewanStore } from "../store/useSekretarisDewanStore";
import { useUIStore } from "@/store/useUIStore";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";
import { User } from "@/types/user";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";

const fakeDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms));
const hash = (v: string) => `hashed(${v})`;

export const useSekretarisDewanCRUD = () => {
  const { showNotification } = useUIStore();
  const { setSekretarisDewan, setUsers } = useSekretarisDewanStore();

  const [isLoading, setIsLoading] = useState(false);

  // State untuk Modal Konfirmasi Hapus (Pola yang sama dengan Anggota Dewan)
  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean;
    data: SekretarisDewanProfile | null;
  }>({ isOpen: false, data: null });

  // features/sekretaris-dewan/hooks/useSekretarisDewanCRUD.ts
  /** =======================
   * CREATE
   * ======================= */
  const addSekretaris = useCallback(
    async (formData: SekretarisDewanFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        const userId = `user-sekwan-${Date.now()}`;
        const profileId = `sekwan-${Date.now()}`;

        // Create User
        const newUser: User = {
          id: userId,
          username: formData.username,
          name: formData.name,
          password: hash(formData.password || "default123"),
          role: "SEKWAN",
          isActive: formData.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Create Profile
        const newProfile: SekretarisDewanProfile = {
          id: profileId,
          userId: userId,
          nip: formData.nip,
          jabatan: formData.jabatan,
          periodeStart: formData.periodeStart || new Date(),
          periodeEnd: formData.periodeEnd || new Date(),
          isActive: formData.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setUsers((prev) => [...prev, newUser]);
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
    [setSekretarisDewan, setUsers, showNotification],
  );

  /** =======================
   * UPDATE
   * ======================= */
  const updateSekretaris = useCallback(
    async (id: string, formData: SekretarisDewanFormData) => {
      setIsLoading(true);
      try {
        await fakeDelay();

        // 1. Update User Data (Name, Username, Active)
        // We need to find the profile first to get the userId, but since we are iterating, we can do it inside or before.
        // However, this hook function receives `id` which is the Profile ID.
        // We need to find the user ID corresponding to this profile.
        // But inside setState we iterate.

        // Ideally we should look up the profile first to get userId.
        // Since we don't have direct access to state here without using get(), we can rely on specific passed data or just update in parallel if we knew the userId.
        // But `formData` doesn't have userId.
        // Let's assume we update `users` by finding the user linked to this profile.
        // Wait, `setUsers` and `setSekretarisDewan` are separate.

        // We need to know which userId to update.
        // We can pass userId to updateSekretaris or find it.
        // The safest way without reading state outside of set is to handle it in the component or fetch it here.
        // But `useSekretarisDewanStore` provides `sekretarisDewan` which we can read if we destructured it.

        // Instead of complicating, let's look at how Notulis did it:
        // `updateNotulis(notulisId, userId, formData)` -- It accepts userId!

        // The signature in `page.tsx` is `updateSekretaris(modalState.data!.id, data)`. It is MISSING userId.
        // I should stick to the signature or change it.
        // The user's code in `page.tsx` line 138: `await updateSekretaris(modalState.data!.id, data)`
        // BUT `modalState.data` HAS `userId` commented out in line 98.

        // I will find the profile from the store state to get the userId.
        // Use `useSekretarisDewanStore.getState()` or just destructure data from store.

        // Let's grab the current list to find the userId.
        const { sekretarisDewan } = useSekretarisDewanStore.getState();
        const targetProfile = sekretarisDewan.find((p) => p.id === id);

        if (targetProfile) {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === targetProfile.userId
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
        }

        setSekretarisDewan((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  nip: formData.nip,
                  jabatan: formData.jabatan,
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
    [setSekretarisDewan, setUsers, showNotification],
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

      const targetProfile = deleteState.data;

      // Hapus Users
      setUsers((prev) => prev.filter((u) => u.id !== targetProfile.userId));

      // Hapus Profile
      setSekretarisDewan((prev) => {
        const filtered = prev.filter((s) => s.id !== targetProfile.id);
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

  /** =======================
   * RESET PASSWORD
   * ======================= */
  const resetPassword = useCallback(
    async (userId: string, newPassword: string) => {
      // NOTE: Here userId is actually the user ID (passed from page.tsx), not profile ID.
      // Wait, let's check page.tsx calling convention.
      // handleResetPassword sets resetTarget.
      // confirmResetFlow calls resetPassword(resetTarget.id, pwd).
      // resetTarget.id is PROFILE id.
      // So the argument is actually profileId.

      setIsLoading(true);
      try {
        await fakeDelay(800);

        // Find profile to get userId
        const { sekretarisDewan } = useSekretarisDewanStore.getState();
        const profile = sekretarisDewan.find((p) => p.id === userId); // userId here is actually profile Id based on page usage

        if (profile) {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === profile.userId
                ? { ...u, password: hash(newPassword), updatedAt: new Date() }
                : u,
            ),
          );
        }

        showNotification("success", "Password berhasil direset");
        return true;
      } catch (error) {
        showNotification("danger", "Gagal mereset password");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification, setUsers],
  );

  return {
    isLoading,
    addSekretaris,
    updateSekretaris,
    resetPassword,
    // Delete Modal Props
    deleteState,
    openDelete,
    closeDelete,
    confirmDelete,
  };
};
