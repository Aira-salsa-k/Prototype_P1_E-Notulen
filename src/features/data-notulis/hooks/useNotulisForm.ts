"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotulisFormData } from "../types/notulis-form-data";

export function useNotulisForm(
  initialData?: NotulisFormData,
  isOpen?: boolean,
) {
  const form = useForm<NotulisFormData>({
    defaultValues: {
      username: "",
      name: "",
      NIP: "",
      isActive: true,
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        initialData || {
          username: "",
          name: "",
          NIP: "",
          isActive: true,
          password: "",
        },
      );
    }
  }, [isOpen, initialData, form]);

  return {
    data: form.watch(),
    update: form.setValue,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    register: form.register,
    formState: form.formState,
  };
}
