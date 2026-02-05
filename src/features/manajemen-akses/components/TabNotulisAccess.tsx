"use client";

import { useMemo, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAccessStore } from "../store/useAccessStore";
import { useUIStore } from "@/store/useUIStore";
import { mockUsers } from "@/mocks/user";

export default function TabNotulisAccess() {
  const notulisAccessMode = useAccessStore((state) => state.notulisAccessMode);
  const allowedNotulisIds = useAccessStore((state) => state.allowedNotulisIds);
  const setNotulisAccessMode = useAccessStore(
    (state) => state.setNotulisAccessMode,
  );
  const toggleNotulisAccess = useAccessStore(
    (state) => state.toggleNotulisAccess,
  );

  const showNotification = useUIStore((state) => state.showNotification);

  const [searchQuery, setSearchQuery] = useState("");

  const isAllAllowed = notulisAccessMode === "all";

  const notulisUsers = useMemo(() => {
    const all = mockUsers.filter(
      (u) => u.id.includes("notulis") || u.username.includes("notulis"),
    );

    const filtered = !searchQuery
      ? all
      : all.filter(
          (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.username.toLowerCase().includes(searchQuery.toLowerCase()),
        );

    // Map the permission state into the items so the table detects changes
    return filtered.map((user) => ({
      ...user,
      isAllowed: isAllAllowed || allowedNotulisIds.includes(user.id),
    }));
  }, [searchQuery, isAllAllowed, allowedNotulisIds]);

  const handleModeToggle = (val: boolean) => {
    const newMode = val ? "all" : "custom";
    setNotulisAccessMode(newMode);
    showNotification(
      "success",
      newMode === "all"
        ? "Akses dibuka untuk SEMUA Notulis"
        : "Mode Kustom Aktif: Tentukan akses per individu",
    );
  };

  return (
    <div className="space-y-6">
      {/* CONTROL PANEL */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Kontrol Global Notulis
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Aktifkan toggle ini untuk mengizinkan <strong>semua</strong> akun
            notulis mengakses sistem.
            <br />
            Matikan untuk memilih notulis tertentu saja.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-xl border border-gray-100">
          <span
            className={`text-sm font-bold ${isAllAllowed ? "text-blue-600" : "text-gray-400"}`}
          >
            IZINKAN SEMUA
          </span>
          <Switch
            isSelected={isAllAllowed}
            onValueChange={handleModeToggle}
            size="lg"
          />
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-end">
        <Input
          placeholder="Cari Notulis..."
          className="w-full md:max-w-xs"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          }
          value={searchQuery}
          onValueChange={setSearchQuery}
          variant="bordered"
        />
      </div>

      {/* NOTULIS TABLE */}
      <div
        className={`border border-gray-200 rounded-2xl overflow-hidden shadow-xs bg-white transition-opacity duration-300 ${isAllAllowed ? "opacity-60 pointer-events-none grayscale-[0.5]" : ""}`}
      >
        <Table
          aria-label="Tabel Akses Notulis"
          removeWrapper
          classNames={{
            th: "bg-gray-50 text-gray-600 font-bold uppercase text-xs py-4",
            td: "py-4 text-sm",
          }}
        >
          <TableHeader>
            <TableColumn width={60}>STATUS</TableColumn>
            <TableColumn>NAMA NOTULIS</TableColumn>
            <TableColumn>USERNAME</TableColumn>
            <TableColumn align="end">AKSES LOGIN</TableColumn>
          </TableHeader>
          <TableBody items={notulisUsers}>
            {(user) => {
              const isAllowed = user.isAllowed;
              return (
                <TableRow key={user.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${isAllowed ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                    >
                      {isAllowed ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        <XCircleIcon className="w-6 h-6" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-gray-900 text-base">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ID: {user.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" className="font-mono">
                      {user.username}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Switch
                        size="sm"
                        isDisabled={isAllAllowed} // Disabled if global "All" is on
                        isSelected={isAllowed}
                        onValueChange={() => {
                          toggleNotulisAccess(user.id);
                          showNotification(
                            "success",
                            `Akses diperbarui untuk ${user.name}`,
                          );
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>

      {isAllAllowed && (
        <div className="text-center text-gray-400 text-sm italic py-4">
          * Tabel dinonaktifkan karena "Izinkan Semua Notulis" sedang aktif.
        </div>
      )}
    </div>
  );
}
