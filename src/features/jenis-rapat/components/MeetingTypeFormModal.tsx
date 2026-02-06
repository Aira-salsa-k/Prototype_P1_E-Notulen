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
import { useAnggotaStore } from "@/features/anggota-dewan/store/useAnggotaStore";
import { useSekretarisDewanStore } from "@/features/sekretaris-dewan/store/useSekretarisDewanStore";
import { AKD } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";
import { MeetingTypeFormInfo } from "./MeetingTypeForm.info";
import { MeetingTypeFormMembers } from "./MeetingTypeForm.members";
import { nanoid } from "@/lib/utils";
import { SwatchIcon as SwatchIconSolid } from "@heroicons/react/24/solid";

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
  const {
    anggota,
    users: anggotaUsers,
    isInitialized: isAnggotaInit,
    _hasHydrated: isAnggotaHydrated,
    setAnggota,
    setUsers: setAnggotaUsers,
    markAsInitialized: markAnggotaInit,
  } = useAnggotaStore();

  const {
    sekretarisDewan: sekwanProfiles,
    users: sekwanUsers,
    isInitialized: isSekwanInit,
    _hasHydrated: isSekwanHydrated,
    setSekretarisDewan,
    setUsers: setSekwanUsers,
    markAsInitialized: markSekwanInit,
  } = useSekretarisDewanStore();

  // 0. SILENT INITIALIZATION
  // Ensure we have data even if user lands directly here (Fix for Vercel persistence issue)
  useEffect(() => {
    if (isAnggotaHydrated && !isAnggotaInit) {
      setAnggota(generateMockAnggota());
      setAnggotaUsers(mockUsers);
      markAnggotaInit();
    }
    if (isSekwanHydrated && !isSekwanInit) {
      setSekretarisDewan(generateMockSekretarisDewan());
      setSekwanUsers(mockUsers);
      markSekwanInit();
    }
  }, [
    isAnggotaHydrated,
    isAnggotaInit,
    setAnggota,
    setAnggotaUsers,
    markAnggotaInit,
    isSekwanHydrated,
    isSekwanInit,
    setSekretarisDewan,
    setSekwanUsers,
    markSekwanInit,
  ]);

  const allUsers = useMemo(() => {
    // Merge users from both stores and mocks to be safe
    const map = new Map();
    [...mockUsers, ...anggotaUsers, ...sekwanUsers].forEach((u) => {
      map.set(u.id, u);
    });
    return Array.from(map.values());
  }, [anggotaUsers, sekwanUsers]);

  const resolvedAnggota = useMemo(() => {
    return anggota
      .filter((m) => m.status === "active")
      .map((m) => {
        const user = allUsers.find((u) => u.id === m.userId);
        return {
          ...m,
          name: user?.name || "Tanpa Nama",
          username: user?.username || "-",
        };
      });
  }, [anggota, allUsers]);

  const resolvedSekwans = useMemo(() => {
    return sekwanProfiles
      .filter((s) => s.isActive)
      .map((s) => {
        const user = allUsers.find((u) => u.id === s.userId);
        return {
          ...s,
          name: user?.name || "Tanpa Nama",
        };
      });
  }, [sekwanProfiles, allUsers]);

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

  const akdOptions = useMemo(() => {
    const options = Object.entries(AKD_CONFIG).map(([value, config]) => ({
      value: value as AKD,
      label: config.label,
    }));
    return [{ value: "ALL", label: "SEMUA ANGGOTA" }, ...options];
  }, []);

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="outside"
      classNames={{
        base: "bg-white max-w-full m-0 rounded-none shadow-none !h-auto",
        wrapper: "p-0 !items-start",
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <ModalHeader className="text-md text-white font-bold px-12 border-b border-divider/90 bg-primary">
            <SwatchIconSolid className="w-5 h-5 mr-2 text-primary-70" />{" "}
            {isEdit ? "Edit Konfigurasi Rapat" : "Buat Jenis Rapat Baru"}
          </ModalHeader>

          <ModalBody className="px-12 py-6 space-y-6">
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
              allMembers={resolvedAnggota}
              sekwans={resolvedSekwans}
              users={allUsers}
            />
          </ModalBody>

          <ModalFooter className="px-12 pb-2 pt-2 border-t border-divider/50 gap-4">
            <AppButton
              variant="light"
              color="btn-batal"
              onPress={onClose}
              size="sm"
              className="min-w-[160px]"
            >
              Batal
            </AppButton>
            <AppButton
              color="ungu"
              type="submit"
              isLoading={isLoading}
              size="sm"
              className=" min-w-[200px]"
            >
              {isEdit ? "Simpan Perubahan" : "Buat Jenis Rapat"}
            </AppButton>
          </ModalFooter>
        </form>
      </FormProvider>
    </ModalBase>
  );
}
