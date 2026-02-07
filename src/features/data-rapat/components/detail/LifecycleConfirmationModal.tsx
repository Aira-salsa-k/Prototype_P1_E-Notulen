"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { AppButton } from "@/components/ui/button/AppButton";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import {
  PlayIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface LifecycleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "start" | "finish";
  isLoading?: boolean;
}

export function LifecycleConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  isLoading,
}: LifecycleConfirmationModalProps) {
  const isStart = type === "start";

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader className="flex flex-col gap-1 pb-2">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${isStart ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {isStart ? (
              <PlayIcon className="w-6 h-6" />
            ) : (
              <CheckBadgeIcon className="w-6 h-6" />
            )}
          </div>
          <h2 className="text-xl font-bold">
            {isStart ? "Mulai Rapat (LIVE)" : "Selesaikan Rapat"}
          </h2>
        </div>
      </ModalHeader>

      <ModalBody className="py-4">
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {isStart ? (
              <>
                Apakah Anda yakin ingin{" "}
                <span className="font-bold text-gray-900">
                  mengaktifkan rapat
                </span>{" "}
                sekarang? Setelah dimulai, daftar hadir akan dikunci dan
                perubahan jenis rapat tidak akan disinkronisasi lagi.
              </>
            ) : (
              <>
                Apakah Anda yakin ingin{" "}
                <span className="font-bold text-gray-900">
                  menyelesaikan rapat
                </span>{" "}
                ini? Rapat akan masuk mode hitung mundur 5 jam sebelum dikunci
                permanen untuk pengeditan notulensi.
              </>
            )}
          </p>

          <div
            className={`p-4 rounded-xl border flex gap-3 ${isStart ? "bg-blue-50 border-blue-100 text-blue-700" : "bg-orange-50 border-orange-100 text-orange-700"}`}
          >
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              {isStart
                ? "Pastikan semua peserta sudah hadir sebelum memulai rapat."
                : "Pastikan poin-poin notulensi penting sudah tercatat."}
            </p>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="border-t border-gray-100 mt-2">
        <AppButton
          variant="light"
          onPress={onClose}
          isDisabled={isLoading}
          className="font-semibold text-gray-500"
        >
          Batal
        </AppButton>
        <AppButton
          color={isStart ? "success" : "danger"}
          onPress={onConfirm}
          isLoading={isLoading}
          className="font-bold text-white px-8"
        >
          {isStart ? "YA, MULAI SEKARANG" : "YA, SELESAIKAN"}
        </AppButton>
      </ModalFooter>
    </ModalBase>
  );
}
