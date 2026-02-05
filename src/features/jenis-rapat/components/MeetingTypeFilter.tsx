"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface MeetingTypeFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  onClose?: () => void;
}

export function MeetingTypeFilter({
  searchQuery,
  onSearchChange,
  onReset,
  onClose,
}: MeetingTypeFilterProps) {
  return (
    <div className="bg-primary/5 p-6 rounded-xl border border-gray-200 shadow-xs space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            
            labelPlacement="outside" // Memindahkan label ke atas kotak
            placeholder="Cari kategori atau jenis rapat ..."
            startContent={
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            }
            value={searchQuery}
            onValueChange={onSearchChange}
            variant="bordered"
            size="md" // Ukuran medium lebih proporsional untuk filter
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="font-semibold border-2 border-indigo-900/30 text-red-950"
            color="danger"
            startContent={<XMarkIcon className="h-4 w-4" />}
            onPress={onReset}
            size="sm"
          >
            Reset Filter
          </Button>

          {onClose && (
            <Button
              isIconOnly
              variant="flat"
              color="primary"
              onPress={onClose}
              size="sm"
              className="text-primary hover:scale-105 transition-transform"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
