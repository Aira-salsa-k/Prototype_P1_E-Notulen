"use client";

import { useState } from "react";
import { useJenisRapatActions } from "../store/useJenisRapatStore";
import { MeetingCategory, MeetingTypeVariant } from "@/types/meeting";
import { useUIStore } from "@/store/useUIStore";

export function useJenisRapatCRUD() {
  const [isLoading, setIsLoading] = useState(false);
  const actions = useJenisRapatActions();
  const { showNotification } = useUIStore();

  const addVariant = async (variant: MeetingTypeVariant) => {
    setIsLoading(true);
    try {
      // Logic for adding variant
      actions.addVariant(variant);
      showNotification("success", "Varian rapat berhasil ditambahkan");
      return true;
    } catch (error) {
      showNotification("danger", "Gagal menambahkan varian rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateVariant = async (variant: MeetingTypeVariant) => {
    setIsLoading(true);
    try {
      actions.updateVariant(variant);
      showNotification("success", "Varian rapat berhasil diperbarui");
      return true;
    } catch (error) {
      showNotification("danger", "Gagal memperbarui varian rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVariant = async (id: string) => {
    setIsLoading(true);
    try {
      actions.deleteVariant(id);
      showNotification("success", "Varian rapat berhasil dihapus");
      return true;
    } catch (error) {
      showNotification("danger", "Gagal menghapus varian rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      actions.deleteCategory(id);
      showNotification("success", "Kategori rapat berhasil dihapus");
      return true;
    } catch (error) {
      showNotification("danger", "Gagal menghapus kategori rapat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addVariant,
    updateVariant,
    deleteVariant,
    deleteCategory,
  };
}
