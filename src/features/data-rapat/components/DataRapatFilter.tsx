"use client";

import { Input } from "@heroui/input";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface DataRapatFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset?: () => void;
}

export function DataRapatFilter({
  searchQuery,
  onSearchChange,
  onReset,
}: DataRapatFilterProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            labelPlacement="outside"
            placeholder="Cari judul rapat, agenda, atau nomor surat..."
            startContent={
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            }
            value={searchQuery}
            onValueChange={onSearchChange}
            variant="bordered"
            size="lg"
            className="w-full bg-white"
            classNames={{
              inputWrapper: "bg-white",
            }}
            endContent={
              searchQuery && (
                <button
                  onClick={onReset}
                  className="p-1 rounded-full hover:bg-white text-gray-400 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
