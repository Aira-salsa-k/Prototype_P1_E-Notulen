
"use client";

import { ModalHeader, ModalBody, ModalFooter, Alert } from "@heroui/react";
import { ModalBase } from "@/components/ui/modal/ModalBase";
import { AppButton } from "@/components/ui/button/AppButton";
import { Snippet } from "@heroui/snippet";
import {
  KeyIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
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
  mode?: "reset" | "create"; // Tambahkan mode
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
    ? (mode === "create" ? "Akun Berhasil Dibuat" : "Kata Sandi Berhasil Direset")
    : "Konfirmasi Reset Password";

  return (
    // <ModalBase isOpen={isOpen} onClose={onClose} size="xl">
    //   {/* HEADER */}
    //   <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
    //     <div className="flex items-center gap-3">
    //       <div
    //         className={`p-2 rounded-lg ${!temporaryPassword ? "bg-warning/50 text-amber-900" : "bg-success-50 text-success"}`}
    //       >
    //         {!temporaryPassword ? (
    //           <KeyIcon className="w-6 h-6" />
    //         ) : (
    //           <ShieldCheckIcon className="w-6 h-6" />
    //         )}
    //       </div>
    //       <h2 className="text-2xl font-bold">
    //         {!temporaryPassword
    //           ? "Reset Kata Sandi"
    //           : "Kata Sandi Berhasil Direset"}
    //       </h2>
    //     </div>
    //   </ModalHeader>

    //   <ModalBody className="px-8 py-4">
    //     {!temporaryPassword ? (
    //       /* STATE 1: KONFIRMASI */
    //       <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
    //         <div className="p-4 rounded-xl bg-default-50 border-1 border-default-200">
    //           <p className="text-sm text-default-500 mb-1">Target Pengguna:</p>
    //           <h3 className="text-lg font-bold text-default-900">
    //             {user.name}
    //           </h3>
    //           <p className="text-sm font-mono text-default-400">
    //             @{user.username}
    //           </p>
    //         </div>

    //         <Alert
    //           color="warning"
    //           variant="flat"
    //           title="Perhatian"
    //           description="Tindakan ini akan mencabut akses kata sandi lama secara permanen. Pengguna harus login kembali menggunakan kata sandi baru."
    //         />
    //       </div>
    //     ) : (
    //       /* STATE 2: BERHASIL */
    //       <div className="space-y-6 animate-in zoom-in-95 duration-400">
    //         <div className="p-1 bg-success-50/50 rounded-2xl border-1 border-success-100">
    //           <div className="bg-white p-5 rounded-xl">
    //             <p className="text-sm text-success-700 font-medium mb-4 flex items-center gap-2">
    //               <InformationCircleIcon className="w-4 h-4" />
    //               Salin dan kirimkan kredensial ini kepada Anggota:
    //             </p>

    //             <Snippet
    //               symbol=""
    //               variant="flat"
    //               color="success"
    //               className="w-full justify-between py-3 px-4 bg-success-50 text-success-700 font-mono text-md"
    //             >
    //               {`User: ${user.username} | Pass: ${temporaryPassword}`}
    //             </Snippet>
    //           </div>
    //         </div>

    //         <Alert
    //           color="warning"
    //           variant="faded"
    //           title="Penting"
    //           description="Kata sandi ini hanya muncul sekali. Harap segera dicatat atau dikirimkan sebelum Anda menutup jendela ini."
    //         />
    //       </div>
    //     )}
    //   </ModalBody>

    //   {/* FOOTER */}
    //   <ModalFooter className="px-8 pb-8 pt-4">
    //     <AppButton
    //       variant="faded"
    //       color="primary"
    //       onPress={onClose}
    //       className="font-medium"
    //     >
    //       {temporaryPassword ? "Selesai & Tutup" : "Batal"}
    //     </AppButton>

    //     {!temporaryPassword && (
    //       <AppButton
    //         color="danger"
    //         onPress={onReset}
    //         isLoading={isLoading}
    //         className="px-8 font-bold"
    //       >
    //         Reset Sekarang
    //       </AppButton>
    //     )}
    //   </ModalFooter>
    // </ModalBase>

    <ModalBase isOpen={isOpen} onClose={onClose} size="xl">
      <ModalHeader className="flex flex-col gap-1 pt-8 px-8">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${!isSuccessState ? "bg-warning/20 text-warning" : "bg-success-50 text-success"}`}
          >
            {!isSuccessState ? (
              <KeyIcon className="w-6 h-6" />
            ) : (
              <ShieldCheckIcon className="w-6 h-6" />
            )}
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </ModalHeader>

      <ModalBody className="px-8 py-4">
        {!isSuccessState ? (
          /* STATE 1: KONFIRMASI (Hanya muncul jika dipicu tombol reset) */
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-default-50 border-1 border-default-200">
              <p className="text-sm text-default-500 mb-1">Target Pengguna:</p>
              <h3 className="text-lg font-bold text-default-900">
                {user.name}
              </h3>
              <p className="text-sm font-mono text-default-400">
                @{user.username}
              </p>
            </div>
            <Alert
              color="warning"
              variant="flat"
              title="Perhatian"
              description="Password lama akan hangus dan diganti dengan yang baru."
            />
          </div>
        ) : (
          /* STATE 2: BERHASIL (Muncul setelah reset ATAU setelah tambah akun baru) */
          <div className="space-y-6 animate-in zoom-in-95 duration-400">
            <div className="p-1 bg-success-50/50 rounded-2xl border-1 border-success-100">
              <div className="bg-white p-5 rounded-xl">
                <p className="text-sm text-success-700 font-medium mb-4 flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4" />
                  {mode === "create"
                    ? "Akun telah aktif. Salin data ini:"
                    : "Password baru telah dibuat. Salin data ini:"}
                </p>
                <Snippet
                  symbol=""
                  variant="flat"
                  color="success"
                  className="w-full justify-between py-3 px-4 bg-success-50 font-mono"
                >
                  {`User: ${user.username} | Pass: ${temporaryPassword} Link website : https://E-ntar.id/login`}
                </Snippet>
              </div>
            </div>
            <Alert
              color="warning"
              variant="faded"
              title="Peringatan Keamanan"
              description="Kredensial ini hanya muncul sekali demi keamanan."
            />
          </div>
        )}
      </ModalBody>

      <ModalFooter className="px-8 pb-8 pt-4">
        <AppButton variant="light" onPress={onClose}>
          {isSuccessState ? "Selesai & Tutup" : "Batal"}
        </AppButton>
        {!isSuccessState && (
          <AppButton color="danger" onPress={onReset} isLoading={isLoading}>
            Reset Sekarang
          </AppButton>
        )}
      </ModalFooter>
    </ModalBase>
  );
}
// "use client";

// import { ModalBase } from "@/components/ui/modal/ModalBase";
// import { AppButton } from "@/components/ui/button/AppButton";
// import { Snippet } from "@heroui/snippet";

// interface ResetPasswordModalProps {
//   isOpen: boolean;
//   user?: {
//     name: string;
//     username: string;
//   }| null;
//   temporaryPassword?: string;
//   onReset: () => void;
//   onClose: () => void;
//   isLoading?: boolean;
// }

// export function ResetPasswordModal({
//   isOpen,
//   user,
//   temporaryPassword,
//   onReset,
//   onClose,
//   isLoading,
// }: ResetPasswordModalProps) { 
//        if (!isOpen || !user) return null;
//   return (
//     <ModalBase isOpen={isOpen} onClose={onClose} size="xl">
//       <div className="p-6 space-y-4">
//         <h2 className="text-2xl font-bold">Reset Password</h2>

//         <p className="text-md text-gray-600">
//           Anda akan mereset password untuk:
//           <br />
//           <span className="font-semibold">{user.name}</span>
//         </p>

//         {!temporaryPassword ? (
//           <AppButton
//             color="danger"
//             onPress={onReset}
//             isLoading={isLoading}
//             isDisabled={!!temporaryPassword}
//             className="w-full"
//           >
//             Reset Password
//           </AppButton>
//         ) : (
//           <div className="space-y-2">
//             <p className="text-md text-gray-600 mb-4">
//               Reset Password Berhasil ! Salin data akun baru di bawah ini:
//             </p>

//             <Snippet
//               symbol=""
//               variant="flat"
              
//               className="w-full justify-between"
//             >
//               {`User: ${user.username} | Pass: ${temporaryPassword}`}
//             </Snippet>

//             <p className="text-md text-danger mt-4">
//               Password ini hanya muncul sekali. Pastikan sudah dicatat.
//             </p>
//           </div>
//         )}

//         <div className="flex justify-end pt-2">
//           <AppButton variant="light" onPress={onClose}>
//             Tutup
//           </AppButton>
//         </div>
//       </div>
//     </ModalBase>
//   );
// }
