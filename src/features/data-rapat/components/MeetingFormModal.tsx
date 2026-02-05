"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import {
  today,
  getLocalTimeZone,
  parseDate,
  parseTime,
} from "@internationalized/date";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// Store & Mocks
import { useJenisRapatStore } from "@/features/jenis-rapat/store/useJenisRapatStore";
import { Meeting } from "@/types/meeting";
import { StepIndicator } from "./form/StepIndicator";
import { MeetingInfoStep } from "./form/MeetingInfoStep";
import { ParticipantsStep } from "./form/ParticipantsStep";

export interface MeetingFormData {
  title: string;
  meetingCategoryID: string;
  meetingVariantID: string;
  date: any;
  startTime: any;
  endTime: any;
  room: string;
  agenda: string;
  dasarSurat: string;
  masaSidang: string;
  sekretarisId: string;
  notulisIds: string[];
  invitedAnggotaDewanIds: string[];
}

interface MeetingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Meeting | null;
  isLoading?: boolean;
}

export function MeetingFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: MeetingFormModalProps) {
  const { variants } = useJenisRapatStore();
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<MeetingFormData>({
    defaultValues: {
      title: "",
      meetingCategoryID: "",
      meetingVariantID: "",
      date: today(getLocalTimeZone()),
      startTime: null,
      endTime: null,
      room: "",
      agenda: "",
      dasarSurat: "",
      masaSidang: "",
      sekretarisId: "",
      notulisIds: [],
      invitedAnggotaDewanIds: [],
    },
  });

  // Handle Initial Data for Edit Mode
  useEffect(() => {
    const safeParseTime = (timeStr: string) => {
      if (!timeStr) return null;
      try {
        const [h, m] = timeStr.split(":").map((s) => s.padStart(2, "0"));
        return parseTime(`${h}:${m}`);
      } catch (e) {
        return null;
      }
    };

    if (isOpen) {
      setStep(1); // Reset to step 1 on open
      if (initialData) {
        reset({
          ...(initialData as any),
          meetingCategoryID: initialData.meetingCategoryID || "",
          meetingVariantID: initialData.subMeetingCategoryID || "",
          date: initialData.date
            ? parseDate(initialData.date)
            : today(getLocalTimeZone()),
          startTime: initialData.startTime
            ? safeParseTime(initialData.startTime)
            : null,
          endTime: initialData.endTime
            ? safeParseTime(initialData.endTime)
            : null,
          sekretarisId: initialData.sekretarisId || "",
          notulisIds: initialData.notulisIds || [],
          invitedAnggotaDewanIds: initialData.invitedAnggotaDewanIds || [],
        });
      } else {
        reset({
          title: "",
          meetingCategoryID: "",
          meetingVariantID: "",
          date: today(getLocalTimeZone()),
          startTime: null,
          endTime: null,
          room: "",
          agenda: "",
          dasarSurat: "",
          masaSidang: "",
          sekretarisId: "",
          notulisIds: [],
          invitedAnggotaDewanIds: [],
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const selectedVariantId = watch("meetingVariantID");

  // Auto-populate Attendees when Variant Changes
  useEffect(() => {
    if (selectedVariantId) {
      const variant = variants.find((v) => v.id === selectedVariantId);
      if (variant) {
        const memberIds = variant.members.map((m) => m.memberId);
        setValue("invitedAnggotaDewanIds", memberIds);
        setValue("meetingCategoryID", variant.categoryId);
      }
    }
  }, [selectedVariantId, variants, setValue]);

  const handleNext = async () => {
    const isValid = await trigger([
      "title",
      "meetingVariantID",
      "date",
      "startTime",
      "endTime",
      "room",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFormSubmit = (data: MeetingFormData) => {
    if (step !== 2) {
      setStep(2);
      return;
    }

    const pad = (n: number) => n.toString().padStart(2, "0");

    const payload = {
      ...data,
      subMeetingCategoryID: data.meetingVariantID,
      status: initialData?.status || "scheduled",
      date: data.date.toString(),
      startTime: data.startTime
        ? `${pad(data.startTime.hour)}:${pad(data.startTime.minute)}`
        : "",
      endTime: data.endTime
        ? `${pad(data.endTime.hour)}:${pad(data.endTime.minute)}`
        : "",
      notulisIds: Array.isArray(data.notulisIds)
        ? data.notulisIds
        : (data.notulisIds as string).split(",").filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full" // Full width for "lega" feel
      scrollBehavior="inside"
      classNames={{
        base: "bg-white", // Ensure solid background
        header: "border-b border-gray-100 px-8 py-5", // More padding
        body: "p-0 bg-gray-50/30",
        footer: "border-t border-gray-100 px-8 py-5 bg-white",
        backdrop: "bg-black/60 backdrop-blur-md", // Premium backdrop
        wrapper: "z-[9999]",
      }}
      closeButton={
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onClose}
          className="z-50 top-4 right-4"
        >
          <span className="text-2xl">&times;</span>
        </Button>
      }
    >
      <ModalContent>
        {(onClose) => (
          <form className="flex flex-col h-full w-full">
            <ModalHeader className="flex flex-row justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {initialData ? "Edit Data Rapat" : "Buat Jadwal Rapat Baru"}
                </h2>
                <p className="text-sm font-normal text-gray-500 mt-1">
                  {step === 1
                    ? "Lengkapi detail informasi rapat"
                    : "Atur petugas dan undangan rapat"}
                </p>
              </div>
              <StepIndicator currentStep={step} />
            </ModalHeader>

            <ModalBody className="overflow-y-auto w-full max-w-7xl mx-auto">
              {step === 1 && <MeetingInfoStep control={control} />}
              {step === 2 && (
                <ParticipantsStep control={control} watch={watch} />
              )}
            </ModalBody>

            <ModalFooter className="bg-white border-t border-gray-100 flex justify-between items-center px-8 py-5">
              <div className="flex gap-4">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="flat"
                    color="default"
                    size="lg"
                    startContent={<ChevronLeftIcon className="w-5 h-5" />}
                    onPress={handleBack}
                    className="font-semibold text-gray-600"
                  >
                    Kembali
                  </Button>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  type="button"
                  color="danger"
                  variant="light"
                  size="lg"
                  onPress={onClose}
                  isDisabled={isLoading}
                  className="font-semibold"
                >
                  Batal
                </Button>
                {step === 1 ? (
                  <Button
                    type="button"
                    color="primary"
                    size="lg"
                    onPress={handleNext}
                    endContent={<ChevronRightIcon className="w-5 h-5" />}
                    className="font-bold px-10 shadow-lg shadow-blue-500/30"
                  >
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    type="button"
                    size="lg"
                    className="font-bold px-10 shadow-lg shadow-blue-500/30"
                    isLoading={isLoading}
                    startContent={<CheckIcon className="w-5 h-5" />}
                    onPress={() => handleSubmit(handleFormSubmit)()}
                  >
                    {initialData ? "Simpan Perubahan" : "Terbitkan Jadwal"}
                  </Button>
                )}
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
