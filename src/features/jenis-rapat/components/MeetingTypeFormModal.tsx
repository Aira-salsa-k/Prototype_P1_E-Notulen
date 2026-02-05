"use client";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { generateMockAnggota } from "@/mocks/anggota-dewan";
import { generateMockSekretarisDewan } from "@/mocks/sekretaris-dewan";
import { mockUsers } from "@/mocks/user";
import { MeetingCategory, MeetingTypeVariant } from "@/types/meeting";
import { useJenisRapatStore } from "../store/useJenisRapatStore";
import { MeetingTypeFormInfo } from "./MeetingTypeForm.info";
import { MeetingTypeFormMembers } from "./MeetingTypeForm.members";
import { nanoid } from "@/lib/utils";

interface MeetingTypeFormData extends Omit<
  MeetingTypeVariant,
  "id" | "createdAt" | "updatedAt" | "isActive"
> {
  categoryName?: string;
  categoryColor?: any;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MeetingTypeVariant) => void;
  initialData?: MeetingTypeVariant | null;
  categoryId?: string;
  isLoading?: boolean;
}

export function MeetingTypeFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categoryId: initialCategoryId,
  isLoading,
}: Props) {
  const isEdit = !!initialData;
  const mockAnggotaDewan = useMemo(() => {
    const raw = generateMockAnggota();
    return raw.map((m) => {
      const user = mockUsers.find((u) => u.id === m.userId);
      return {
        ...m,
        name: user?.name || "Tanpa Nama",
        username: user?.username || "-",
      };
    });
  }, []);
  const sekwans = useMemo(() => {
    const profiles = generateMockSekretarisDewan();
    return profiles.map((s) => {
      const user = mockUsers.find((u) => u.id === s.userId);
      return {
        ...s,
        name: user?.name || "Tanpa Nama",
      };
    });
  }, []);

  const { categories, actions } = useJenisRapatStore();
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [selectedAKD, setSelectedAKD] = useState<string>("");

  const methods = useForm<MeetingTypeFormData>({
    defaultValues: {
      categoryId: "",
      subName: "",
      defaultSekretarisId: "",
      members: [],
    },
  });

  const { reset, handleSubmit, setValue, watch, getValues } = methods;

  // Sync Sekwan to members array

  // Init form on open
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          categoryId: initialData.categoryId,
          subName: initialData.subName || "",
          defaultSekretarisId: initialData.defaultSekretarisId || "",
          members: initialData.members || [],
        });
        setIsNewCategory(false);
      } else {
        reset({
          categoryId: initialCategoryId || "",
          categoryName: "",
          categoryColor: "info",
          subName: "",
          defaultSekretarisId: "",
          members: [],
        });
        setIsNewCategory(false);
      }
      setSelectedAKD("");
    }
  }, [isOpen, initialData, reset, initialCategoryId]);

  const handleCategoryChange = (val: string) => {
    if (val === "NEW") {
      setIsNewCategory(true);
      setValue("categoryId", "");
    } else {
      setIsNewCategory(false);
      setValue("categoryId", val);
    }
  };

  const handleFormSubmit = (data: MeetingTypeFormData) => {
    let finalCategoryId = data.categoryId;

    if (isNewCategory && data.categoryName) {
      const newCat: MeetingCategory = {
        id: `cat-${nanoid()}`,
        name: data.categoryName,
        color: data.categoryColor || "info",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      actions.addCategory(newCat);
      finalCategoryId = newCat.id;
    }

    if (!finalCategoryId) return;

    const variant: MeetingTypeVariant = {
      id: initialData?.id || `var-${nanoid()}`,
      categoryId: finalCategoryId,
      subName: data.subName || undefined,
      members: data.members,
      isActive: initialData?.isActive ?? true,
      defaultSekretarisId: data.defaultSekretarisId || undefined,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSubmit(variant);
  };

  const akdOptions = [
    "KOMISI_I",
    "KOMISI_II",
    "KOMISI_III",
    "BADAN_MUSYAWARAH",
    "BADAN_ANGGARAN",
    "ALL",
  ];

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="5xl">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col max-h-[90vh] overflow-hidden"
        >
          <ModalHeader className="text-2xl font-bold pt-8 px-8">
            {isEdit ? "Edit Konfigurasi Rapat" : "Buat Jenis Rapat Baru"}
          </ModalHeader>

          <ModalBody className="px-8 py-4 space-y-8">
            <MeetingTypeFormInfo
              categories={categories}
              isEdit={isEdit}
              isNewCategory={isNewCategory}
              onCategoryChange={handleCategoryChange}
            />

            <MeetingTypeFormMembers
              akdOptions={akdOptions}
              selectedAKD={selectedAKD}
              onAKDChange={setSelectedAKD}
              allMembers={mockAnggotaDewan}
              sekwans={sekwans}
            />
          </ModalBody>

          <ModalFooter className="px-8 pb-8 pt-4 border-t border-divider/50 mt-4">
            <AppButton variant="light" color="btn-batal" onPress={onClose}>
              Batal
            </AppButton>
            <AppButton
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="font-bold px-8"
            >
              {isEdit ? "Simpan Perubahan" : "Buat Jenis Rapat"}
            </AppButton>
          </ModalFooter>
        </form>
      </FormProvider>
    </ModalBase>
  );
}
