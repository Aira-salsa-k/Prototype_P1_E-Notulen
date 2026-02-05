// app/components/meeting-type/FilterPanel.tsx
"use client";

import { Select, SelectItem } from "@heroui/select";
import { RadioGroup, Radio } from "@heroui/radio";
import { Chip } from "@heroui/chip";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FilterPanelProps {
  filters: {
    status: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const statusOptions = [
    { key: "all", label: "Semua Status" },
    { key: "active", label: "Aktif" },
    { key: "inactive", label: "Non-Aktif" },
  ];

  const sortOptions = [
    { key: "name", label: "Nama (A-Z)" },
    { key: "name_desc", label: "Nama (Z-A)" },
    { key: "created", label: "Dibuat Terbaru" },
    { key: "updated", label: "Diupdate Terbaru" },
    { key: "members", label: "Jumlah Anggota" },
  ];

  const handleReset = () => {
    onFilterChange({
      status: "all",
      sortBy: "name",
    });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Filter & Sortir</h3>
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <XMarkIcon className="h-4 w-4" />
          Reset semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* STATUS FILTER */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Status Varian
          </label>
          <RadioGroup
            value={filters.status}
            onValueChange={(value) => onFilterChange({ ...filters, status: value })}
            className="gap-3"
          >
            {statusOptions.map((option) => (
              <Radio
                key={option.key}
                value={option.key}
                classNames={{
                  base: "items-center",
                  label: "text-sm text-gray-700",
                }}
              >
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        {/* SORT FILTER */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Urutkan Berdasarkan
          </label>
          <Select
            selectedKeys={[filters.sortBy]}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            className="max-w-xs"
            size="sm"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* ACTIVE FILTERS */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter aktif:</span>
          {filters.status !== "all" && (
            <Chip
              size="sm"
              variant="flat"
              onClose={() => onFilterChange({ ...filters, status: "all" })}
            >
              Status: {filters.status === "active" ? "Aktif" : "Non-Aktif"}
            </Chip>
          )}
          {filters.sortBy !== "name" && (
            <Chip
              size="sm"
              variant="flat"
              onClose={() => onFilterChange({ ...filters, sortBy: "name" })}
            >
              Sortir: {sortOptions.find(o => o.key === filters.sortBy)?.label}
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
}