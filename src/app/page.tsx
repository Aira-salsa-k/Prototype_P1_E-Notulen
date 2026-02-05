"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/useAuthStore";
import { mockUsers } from "@/mocks/user";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { actions } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // MOCKUP LOGIN LOGIC
    // In a real app, this would validate credentials against an API.
    // Here we just simulate a delay and log in as the default admin for the mockup.

    setTimeout(() => {
      // Find the admin user for simulation
      const adminUser =
        mockUsers.find((u) => u.role === "ADMIN") || mockUsers[0];

      if (adminUser) {
        actions.login(adminUser.id);
        router.push("/dashboard-admin");
      } else {
        setIsLoading(false);
        alert("User simulasi tidak ditemukan.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-white dark:bg-zinc-950 font-sans">
      {/* LEFT SIDE - Hero / Brand */}
      <div className="hidden lg:flex w-1/2 bg-indigo-950 relative items-center justify-center p-12 overflow-hidden">
        {/* Background decorations - Abstract & Dynamic */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90 z-0"></div>

        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

        {/* Image mockup/illustration - Placeholder pattern since we generate code */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-900 to-black"></div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-10 animate-fade-in-up">
            <div className="h-20 w-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-8 border border-white/10 backdrop-blur-sm">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
              Sistem Informasi Manajemen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Risalah Rapat
              </span>
            </h1>
            <p className="text-indigo-100 text-lg leading-relaxed opacity-90 font-light max-w-md">
              Platform digital terintegrasi untuk pengelolaan jadwal, notulensi,
              dan arsip kegiatan rapat Dewan Perwakilan Rakyat Daerah secara
              efisien, aman, dan transparan.
            </p>
          </div>

          <div className="flex items-center gap-5 mt-12 pt-8 border-t border-white/10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full border-[3px] border-indigo-900 bg-gradient-to-br from-indigo-${i * 100 + 300} to-purple-500 shadow-md`}
                ></div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-base tracking-wide">
                Tim Sekwan Digital
              </span>
              <span className="text-sm text-indigo-300">
                Bergabung dengan 50+ pengguna aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative bg-white dark:bg-zinc-950">
        <div className="max-w-[420px] w-full space-y-10">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Selamat Datang
            </h2>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              Silakan masuk menggunakan akun administratif Anda untuk mengakses
              dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-6">
              <Input
                type="text"
                label="Username / NIP"
                placeholder="Masukkan username anda"
                variant="bordered"
                labelPlacement="outside"
                startContent={
                  <UserIcon className="text-gray-400 w-5 h-5 flex-shrink-0" />
                }
                value={username}
                onValueChange={setUsername}
                classNames={{
                  inputWrapper:
                    "h-14 py-2 border-zinc-200 data-[hover=true]:border-indigo-400 group-data-[focus=true]:border-indigo-600 dark:border-zinc-700 dark:data-[hover=true]:border-indigo-500",
                  label:
                    "font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm",
                  input: "text-base",
                }}
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  placeholder="Masukkan password anda"
                  variant="bordered"
                  labelPlacement="outside"
                  startContent={
                    <LockClosedIcon className="text-gray-400 w-5 h-5 flex-shrink-0" />
                  }
                  endContent={
                    <button
                      className="focus:outline-none transition-opacity hover:opacity-70"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className="text-gray-400 w-5 h-5" />
                      ) : (
                        <EyeIcon className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                  classNames={{
                    inputWrapper:
                      "h-14 py-2 border-zinc-200 data-[hover=true]:border-indigo-400 group-data-[focus=true]:border-indigo-600 dark:border-zinc-700 dark:data-[hover=true]:border-indigo-500",
                    label:
                      "font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm",
                    input: "text-base",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Checkbox
                size="sm"
                color="primary"
                classNames={{
                  label: "text-sm text-gray-600 dark:text-gray-400",
                }}
              >
                Ingat saya
              </Checkbox>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  Lupa password?
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Button
                fullWidth
                color="primary"
                size="lg"
                type="submit"
                isLoading={isLoading}
                className="h-14 font-semibold text-base shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                endContent={
                  !isLoading && <ArrowRightIcon className="w-5 h-5" />
                }
              >
                {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
              </Button>
            </div>
          </form>

          <div className="pt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-zinc-950 text-gray-500">
                Hubungi dukungan teknis jika bermasalah
              </span>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-auto pt-8">
            &copy; 2026 Sekretariat Dewan Perwakilan Rakyat Daerah. <br />
            All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
