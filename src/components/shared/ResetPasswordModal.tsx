"use client";

import { ModalHeader, ModalBody, ModalFooter, Alert } from "@heroui/react";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { AppButton } from "@/components/ui/button/AppButton";
import { Snippet } from "@heroui/snippet";
import {
  KeyIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ResetPasswordModalProps {
  isOpen: boolean;
  user?: {
    name: string;
    username: string;
  } | null;
  temporaryPassword?: string;
  onReset: () => void;
  onClose: () => void;
  isLoading?: boolean;
  mode?: "reset" | "create";
}

export function ResetPasswordModal({
  isOpen,
  user,
  temporaryPassword,
  onReset,
  onClose,
  isLoading,
  mode = "reset",
}: ResetPasswordModalProps) {
  if (!isOpen || !user) return null;

  const isSuccessState = !!temporaryPassword;
  const title = isSuccessState
    ? mode === "create"
      ? "Akun Berhasil Dibuat"
      : "Kata Sandi Berhasil Direset"
    : "Konfirmasi Reset Password";

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} size="xl">
      <ModalHeader className="flex flex-col gap-1 pt-6 sm:pt-8 px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${!isSuccessState ? "bg-warning/20 text-warning" : "bg-success-50 text-success"}`}
          >
            {!isSuccessState ? (
              <KeyIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight">
            {title}
          </h2>
        </div>
      </ModalHeader>

      <ModalBody className="px-4 sm:px-8 py-4">
        {!isSuccessState ? (
          /* STATE 1: KONFIRMASI */
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 rounded-xl bg-default-50 border-1 border-default-200">
              <p className="text-xs sm:text-sm text-default-500 mb-1">
                Target Pengguna:
              </p>
              <h3 className="text-base sm:text-lg font-bold text-default-900 leading-snug">
                {user.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-default-400">
                @{user.username}
              </p>
            </div>
            <Alert
              color="warning"
              variant="flat"
              title="Perhatian"
              description="Password lama akan hangus dan diganti dengan yang baru secara permanen."
              classNames={{
                title: "text-sm font-bold",
                description: "text-xs sm:text-sm",
              }}
            />
          </div>
        ) : (
          /* STATE 2: BERHASIL */
          <div className="space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-400">
            <div className="p-1 bg-success-50/50 rounded-2xl border-1 border-success-100">
              <div className="bg-white p-4 sm:p-5 rounded-xl">
                <p className="text-xs sm:text-sm text-success-700 font-medium mb-3 sm:mb-4 flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4" />
                  {mode === "create"
                    ? "Akun telah aktif. Salin data ini:"
                    : "Password baru telah dibuat. Salin data ini:"}
                </p>
                <Snippet
                  symbol=""
                  variant="flat"
                  color="success"
                  className="w-full bg-success-50 border-1 border-success-100"
                  classNames={{
                    base: "items-start py-3 px-4", // Memastikan tombol copy tetap di atas atau mengikuti layout
                    pre: "whitespace-pre-wrap break-all text-xs sm:text-sm leading-relaxed w-full", // KUNCI: Membuat teks membungkus
                    copyButton: "mt-1", // Memberi jarak tombol copy agar tidak menempel ke teks atas
                  }}
                >
                  {`User: ${user.username}\nPass: ${temporaryPassword}\nLink: https://E-ntar.id/login`}
                </Snippet>
              </div>
            </div>
            <Alert
              color="warning"
              variant="faded"
              title="Peringatan Keamanan"
              description="Kredensial ini hanya muncul sekali. Harap segera simpan sebelum menutup jendela ini."
              classNames={{
                title: "text-sm font-bold",
                description: "text-xs sm:text-sm",
              }}
            />
          </div>
        )}
      </ModalBody>

      <ModalFooter className="px-4 sm:px-8 pb-6 sm:pb-8 pt-4 gap-3 flex-col sm:flex-row">
        <AppButton
          variant="flat"
          onPress={onClose}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          {isSuccessState ? "Selesai & Tutup" : "Batal"}
        </AppButton>
        {!isSuccessState && (
          <AppButton
            color="danger"
            onPress={onReset}
            isLoading={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2 font-bold"
          >
            Reset Sekarang
          </AppButton>
        )}
      </ModalFooter>
    </ModalBase>
  );
}
