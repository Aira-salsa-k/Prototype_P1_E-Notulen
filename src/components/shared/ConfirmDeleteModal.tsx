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
}: ConfirmDeleteModalProps) {
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!isOpen) setConfirmText("");
  }, [isOpen]);

  const canDelete = confirmText === "HAPUS";

  return (
    <ModalBase isOpen={isOpen} onClose={onCancel} size="xl">
      <div className="p-6 space-y-5">
        {/* Title & description */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">{title}</h1>

          <p className="text-sm text-gray-600">
            Anda akan menghapus{" "}
            <span className="font-semibold text-gray-800">
              {name || entityLabel}
            </span>
            .
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {entityLabel} yang dihapus{" "}
            <span className="font-semibold">tidak dapat dipulihkan</span>.
            
          </p>
        </div>

        {/* Warning */}
        <Alert
          color="warning"
          variant="flat"
          title="Saran Sebelum Menghapus"
          description={recommendation}
        />

        {/* Confirmation */}
        <Input
          label="Ketik HAPUS untuk konfirmasi"
          value={confirmText}
          onValueChange={setConfirmText}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <AppButton variant="light" onPress={onCancel} isDisabled={isLoading}>
            Batal
          </AppButton>

          <AppButton
            color="danger"
            isDisabled={!canDelete}
            isLoading={isLoading}
            onPress={onConfirm}
          >
            Hapus Permanen
          </AppButton>
        </div>
      </div>
    </ModalBase>
  );
}
