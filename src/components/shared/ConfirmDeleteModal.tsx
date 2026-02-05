"use client";

import { useState, useEffect } from "react";
import { Alert } from "@heroui/react";
import { Input } from "@heroui/input";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { AppButton } from "@/components/ui/button/AppButton";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  name?: string;
  entityLabel?: string; // "Instansi", "Rapat", dll
  recommendation?: string; // custom saran
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?:
    | "danger"
    | "warning"
    | "primary"
    | "secondary"
    | "success"
    | "default";
  confirmWord?: string;
  actionType?: "delete" | "archive";
}

export function ConfirmDeleteModal({
  isOpen,
  title = "Hapus Data?",
  name,
  entityLabel = "data",
  recommendation = "Pertimbangkan untuk menonaktifkan data jika tidak ingin menghapus permanen.",
  onCancel,
  onConfirm,
  isLoading,
  confirmButtonText,
  confirmButtonColor = "danger",
  confirmWord = "HAPUS",
  actionType = "delete",
}: ConfirmDeleteModalProps) {
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!isOpen) setConfirmText("");
  }, [isOpen]);

  const canConfirm = confirmText.toUpperCase() === confirmWord.toUpperCase();

  return (
    <ModalBase isOpen={isOpen} onClose={onCancel} size="xl">
      <div className="p-6 space-y-5">
        {/* Title & description */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">{title}</h1>

          <p className="text-sm text-gray-600">
            Anda akan {actionType === "archive" ? "mengarsipkan" : "menghapus"}{" "}
            <span className="font-semibold text-gray-800">
              {name || entityLabel}
            </span>
            .
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {entityLabel} ini{" "}
            {actionType === "archive" ? (
              "akan dipindahkan ke tab Arsip & Sampah"
            ) : (
              <span className="font-semibold">tidak dapat dipulihkan</span>
            )}
            .
          </p>
        </div>

        {/* Warning */}
        <Alert
          color={actionType === "archive" ? "primary" : "warning"}
          variant="flat"
          title={
            actionType === "archive"
              ? "Informasi Pengarsipan"
              : "Saran Sebelum Menghapus"
          }
          description={recommendation}
        />

        {/* Confirmation */}
        <Input
          label={`Ketik ${confirmWord} untuk konfirmasi`}
          value={confirmText}
          onValueChange={setConfirmText}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <AppButton color={"ungu-muda"} onPress={onCancel} isDisabled={isLoading}>
            Batal
          </AppButton>

          <AppButton
            color={confirmButtonColor}
            isDisabled={!canConfirm}
            isLoading={isLoading}
            onPress={onConfirm}
          >
            {confirmButtonText ||
              (actionType === "archive"
                ? "Arsipkan Sekarang"
                : "Hapus Permanen")}
          </AppButton>
        </div>
      </div>
    </ModalBase>
  );
}
