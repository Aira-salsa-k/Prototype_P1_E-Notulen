"use client";

import { useEffect, useState, useMemo } from "react";
import { MeetingTypeListView } from "@/features/jenis-rapat/components/MeetingTypeListView";
import { MeetingTypeHeader } from "@/features/jenis-rapat/components/MeetingTypeHeader";
import { MeetingTypeFilter } from "@/features/jenis-rapat/components/MeetingTypeFilter";
import { MeetingTypeFormModal } from "@/features/jenis-rapat/components/MeetingTypeFormModal";
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { useJenisRapatCRUD } from "@/features/jenis-rapat/hooks/useJenisRapatCRUD";
import { MeetingTypeVariant } from "@/types/meeting";
import { mockMeetingCategories } from "@/mocks/meeting-category";
import { mockMeetingTypeVariants } from "@/mocks/meeting-variants";
import { useAuthStore } from "@/store/useAuthStore";
import { ConfirmDeleteModal } from "@/components/shared/ConfirmDeleteModal";
import { canEditJenisRapat, canDeleteJenisRapat } from "@/lib/auth/permissions";

export default function NotulisJenisRapatPage() {
  const { currentUser } = useAuthStore();
  const canEdit = canEditJenisRapat(currentUser);
  const canDelete = canDeleteJenisRapat(currentUser);

  // Store & Actions
  const { categories, variants, isInitialized, _hasHydrated, actions } =
    useJenisRapatStore();
  const {
    isLoading,
    addVariant,
    updateVariant,
    deleteVariant,
    deleteCategory,
  } = useJenisRapatCRUD();

  // Local State
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] =
    useState<MeetingTypeVariant | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
    type: "category" | "variant";
  }>({
    isOpen: false,
    id: "",
    name: "",
    type: "category",
  });

  // Initialize Data
  useEffect(() => {
    if (_hasHydrated && !isInitialized) {
      actions.setCategories(mockMeetingCategories);
      actions.setVariants(mockMeetingTypeVariants);
      actions.markAsInitialized();
    }
  }, [_hasHydrated, isInitialized, actions]);

  // Handlers
  const handleCreate = (categoryId?: string) => {
    setEditingVariant(null);
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleEdit = (variant: MeetingTypeVariant) => {
    setEditingVariant(variant);
    setSelectedCategoryId(variant.categoryId);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: MeetingTypeVariant) => {
    const success = editingVariant
      ? await updateVariant(data)
      : await addVariant(data);

    if (success) {
      setIsModalOpen(false);
    }
  };

  const triggerDelete = (
    id: string,
    name: string,
    type: "category" | "variant",
  ) => {
    setDeleteModal({
      isOpen: true,
      id,
      name,
      type,
    });
  };

  const executeDelete = async () => {
    if (deleteModal.type === "category") {
      await deleteCategory(deleteModal.id);
    } else {
      await deleteVariant(deleteModal.id);
    }
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Filter Logic
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const isSearchMatch =
        !searchQuery ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchingVariants = variants.filter(
        (v) =>
          v.categoryId === category.id &&
          (!searchQuery ||
            v.subName?.toLowerCase().includes(searchQuery.toLowerCase())),
      );

      return isSearchMatch || matchingVariants.length > 0;
    });
  }, [categories, variants, searchQuery]);

  if (!_hasHydrated) return null;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-1 relative">
      <MeetingTypeHeader
        onAdd={canEdit ? () => handleCreate() : undefined}
        onToggleFilter={() => setShowFilters(!showFilters)}
        isFilterOpen={showFilters}
        totalCategories={categories.length}
        totalVariants={variants.length}
      />

      {showFilters && (
        <MeetingTypeFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onReset={() => setSearchQuery("")}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="min-h-[800px] flex flex-col gap-6 mt-6">
        <MeetingTypeListView
          variants={variants}
          filteredCategories={filteredCategories}
          onCreate={canEdit ? handleCreate : undefined}
          onEdit={canEdit ? handleEdit : undefined}
          // Notulis can delete variants
          onDelete={
            canDelete
              ? (id, name) => triggerDelete(id, name, "variant")
              : undefined
          }
          // Only Admin/Sekwan can delete categories (as per "ralat" which specified variant)
          onCategoryDelete={
            currentUser?.role !== "NOTULIS" && canDelete
              ? (id, name) => triggerDelete(id, name, "category")
              : undefined
          }
        />

        <MeetingTypeFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingVariant}
          categoryId={selectedCategoryId}
          isLoading={isLoading}
        />

        <ConfirmDeleteModal
          isOpen={deleteModal.isOpen}
          onCancel={() =>
            setDeleteModal((prev) => ({ ...prev, isOpen: false }))
          }
          onConfirm={executeDelete}
          title="Hapus Permanen?"
          name={deleteModal.name}
          entityLabel={
            deleteModal.type === "category" ? "Kategori Rapat" : "Jenis Rapat"
          }
          actionType="delete"
          confirmWord="HAPUS"
          confirmButtonColor="danger"
          confirmButtonText="Ya, Hapus Permanen"
          recommendation="Data ini akan hilang selamanya dari sistem. Pastikan tidak ada data rapat tertaut yang masih aktif."
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
