"use client";

import { useForm } from "react-hook-form";
import { MeetingTypeVariant } from "@/types/meeting";
import { useEffect } from "react";

export function useJenisRapatForm(
  initialData?: MeetingTypeVariant | null,
  isOpen?: boolean,
) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MeetingTypeVariant>({
    defaultValues: initialData || {
      id: "",
      categoryId: "",
      subName: "",
      members: [],
    },
  });

  // Reset form when modal opens with new/different data
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          id: "",
          categoryId: "",
          subName: "",
          members: [],
        });
      }
    }
  }, [isOpen, initialData, reset]);

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    data: watch(),
  };
}
