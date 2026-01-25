// features/mitra-kerja/hooks/useMitraCRUD.ts
"use client";

import { useState, useCallback } from "react";
import { MitraInstitution, AKD } from "@/types";
import { useAppNotification } from "@/hooks/useAppNotification";
import { MitraFormData } from "../types/MitraFormData";
import { useUIStore } from "@/store/useUIStore";
import { useMitraStore } from "../store/useMitraKerjaStore";

export const useMitraCRUD = (initialData: MitraInstitution[] = []) => {

  // 1. Ambil State & Actions dari Zustand
  const { showNotification } = useUIStore();
  const {institutions, setInstitutions} = useMitraStore();

  const fakeDelay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // 2. State Lokal untuk UI yang sifatnya temporer (Modal & Loading)

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMitra, setSelectedMitra] = useState<MitraInstitution | null>(
    null,
  );
  /* ===================== CREATE ===================== */

  const addMitra = useCallback(async (data: MitraFormData) => {
    setIsLoading(true);
    try {
      await fakeDelay(600);
      const newEntry: MitraInstitution = {
        id: `mitra-${Date.now()}`,
        name: data.name || "",
        akdID: data.akdID || "KOMISI_I",
        status: data.status || "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setInstitutions((prev) => [...prev, newEntry]);
      showNotification("success", "Mitra kerja berhasil ditambahkan");
      return true; // Berhasil
    } catch {
      showNotification("danger", "Gagal menambahkan mitra");
      return false; // Gagal
    } finally {
      setIsLoading(false);
    }
  }, [showNotification, setInstitutions]);

  /* ===================== UPDATE ===================== */

  const updateMitra = useCallback(async (data: MitraInstitution) => {
    setIsLoading(true);
    try {
      await fakeDelay(600);
      setInstitutions((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? { ...item, ...data, updatedAt: new Date() }
            : item,
        ),
      );
      showNotification("success", "Data mitra berhasil diperbarui");
      return true;
    } catch {
      showNotification("danger", "Gagal memperbarui data");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification, setInstitutions]);

  /* ================= DELETE FLOW ================= */

  const openDeleteConfirm = useCallback((mitra: MitraInstitution) => {
    setSelectedMitra(mitra);
    setIsDeleteOpen(true);
  }, []);

 const closeDeleteConfirm = useCallback(() => {
   setIsDeleteOpen(false);
   setSelectedMitra(null);
 }, []);

  const confirmDelete = useCallback (async () => {
    if (!selectedMitra) return false;
    setIsLoading(true);
    try {
      await fakeDelay();
      setInstitutions((prev) => prev.filter((m) => m.id !== selectedMitra.id));
      showNotification("success", "Mitra kerja berhasil dihapus");
      closeDeleteConfirm();
      return true;
    } catch {
      showNotification("danger", "Gagal menghapus mitra kerja");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedMitra, showNotification, setInstitutions]);

  return {
    institutions,
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
  };
};
