// import { useFormBase } from "@/hooks/useFormBase";
// import { SekretarisDewanFormData, defaultSekretarisDewanFormData } from "../types/SekretarisDewanFormData";

// export function useSekretarisForm(
//   initialData: SekretarisDewanFormData | undefined,
//   isOpen: boolean,
// ) {
//   return useFormBase<SekretarisDewanFormData>({
//     initialData,
//     isOpen,
//     defaultData: defaultSekretarisDewanFormData,
//   });
// }

// features/sekretaris-dewan/hooks/useSekretarisForm.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SekretarisDewanFormData } from "../types/SekretarisDewanFormData";

export function useSekretarisForm(
  initialData?: SekretarisDewanFormData,
  isOpen?: boolean,
) {
  const form = useForm<SekretarisDewanFormData>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      nip: "",
      jabatan: "",
      periodeStart: null,
      periodeEnd: null,
      isActive: true,
    },
  });

  // Sinkronisasi data saat modal dibuka atau data berganti
  useEffect(() => {
    if (isOpen) {
      form.reset(
        initialData || {
          username: "",
          password: "",
          name: "",
          nip: "",
          jabatan: "",
          periodeStart: null,
          periodeEnd: null,
          isActive: true,
        },
      );
    }
  }, [isOpen, initialData, form]);

  return {
    data: form.watch(),
    update: form.setValue,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
  };
}
