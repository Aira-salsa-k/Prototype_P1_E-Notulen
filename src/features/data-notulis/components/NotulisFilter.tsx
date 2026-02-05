"use client";

import React from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NotulisFilter as FilterType } from "../hooks/useNotulisTable";

interface NotulisFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onReset: () => void;
  onClose?: () => void;
}

export default function NotulisFilter({
  filter,
  onFilterChange,
  onReset,
  onClose,
}: NotulisFilterProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Cari nama atau NIP..."
            startContent={
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            }
            value={filter.search}
            onValueChange={(val) => onFilterChange({ ...filter, search: val })}
            variant="bordered"
            isClearable
            onClear={() => onFilterChange({ ...filter, search: "" })}
          />
        </div>

        {/* Status */}
        <div className="w-full md:w-64">
          <Select
            placeholder="Filter Status"
            selectedKeys={[filter.status]}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as any;
              onFilterChange({ ...filter, status: val });
            }}
            variant="bordered"
          >
            <SelectItem key="all" textValue="Semua Status">
              Semua Status
            </SelectItem>
            <SelectItem key="active" textValue="Aktif">
              Aktif
            </SelectItem>
            <SelectItem key="inactive" textValue="Non-Aktif">
              Non-Aktif
            </SelectItem>
          </Select>
        </div>

        {/* Reset */}

        <Button
          className="font-semibold border-2 border-indigo-900/30 text-red-950"
          color="danger"
          startContent={<XMarkIcon className="h-4 w-4" />}
          onPress={onReset}
          size="sm"
        >
          Reset Filter
        </Button>

        {/* Close Button */}
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
  );
}
