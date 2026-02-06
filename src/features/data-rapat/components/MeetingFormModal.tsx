"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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

  const methods = useForm<MeetingFormData>({
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

  const {
    handleSubmit,
    reset,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = methods;

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

  // Removed automatic effect for invitedAnggotaDewanIds - will be handled in input component

  const handleNext = async () => {
    // Validate Step 1 fields only
    const isValid = await trigger([
      "title",
      "meetingVariantID",
      "agenda",
      "masaSidang",
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
        base: "bg-white max-h-[95vh] my-8",
        header: "border-b border-primary-700 px-12 py-4 !static",
        body: "p-0 bg-gray-50/20",
        footer: "border-t border-gray-100 px-12 py-2 bg-white !static",
        backdrop: "bg-black/60 backdrop-blur-md",
        wrapper: "z-[9999] px-4",
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
          <FormProvider {...methods}>
            <form className="flex flex-col h-full w-full">
              <ModalHeader className="flex flex-row justify-between items-center bg-primary !static">
                <h2 className="text-xl font-bold text-white">
                  {initialData ? "Edit Data Rapat" : "Buat Jadwal Rapat Baru"}
                </h2>
                <StepIndicator currentStep={step} />
              </ModalHeader>

              <ModalBody className="overflow-y-auto w-full max-w-[1600px] mx-auto px-4">
                {step === 1 && <MeetingInfoStep />}
                {step === 2 && <ParticipantsStep />}
              </ModalBody>

              <ModalFooter className="bg-white border-t border-gray-100 flex justify-between items-center px-8 py-4 !static">
                <div className="flex gap-4">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="flat"
                      color="default"
                      size="md"
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
                    size="md"
                    variant="light"
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
                      size="md"
                      onPress={handleNext}
                      endContent={<ChevronRightIcon className="w-5 h-5" />}
                      className="font-semibold"
                    >
                      Lanjut
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      type="button"
                      size="md"
                      className="font-bold"
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
          </FormProvider>
        )}
      </ModalContent>
    </Modal>
  );
}
