// app/components/anggota-dewan/AnggotaDewanFilter.tsx
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnggotaFilter } from "@/types/anggota-dewan";
import { AKD } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";

interface AnggotaDewanFilterProps {
  filter: AnggotaFilter;
  onFilterChange: (filter: AnggotaFilter) => void;
  onReset: () => void;
}

export default function AnggotaDewanFilter({
  filter,
  onFilterChange,
  onReset,
}: AnggotaDewanFilterProps) {
  const statusOptions = [
    { key: "all", label: "Semua Status" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ];

  const AKDOptions = Object.entries(AKD_CONFIG).map(([key, value]) => ({
    key: key as AKD,
    label: value.label,
  }));

  const sortOptions = [
    { key: "name", label: "Nama" },
    { key: "jabatan", label: "Jabatan" },
    { key: "akd", label: "AKD" },
    { key: "status", label: "Status" },
  ];

  return (
    <Card className="mb-6 bg-primary/50">
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <Input
            isClearable
            label="Cari Anggota"
            placeholder="Nama atau jabatan..."
            value={filter.search}
            onValueChange={(value) =>
              onFilterChange({ ...filter, search: value })
            }
            startContent={
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            }
            size="sm"
            className="max-w-xs"
          />

          {/* Status Filter */}
          <Select
            label="Status"
            selectedKeys={[filter.status]}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                status: e.target.value as AnggotaFilter["status"],
              })
            }
            size="sm"
            className="max-w-xs"
          >
            {statusOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>

          {/* Sort By */}
          <Select
            label="Urutkan Berdasarkan"
            selectedKeys={[filter.sortBy]}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                sortBy: e.target.value as AnggotaFilter["sortBy"],
              })
            }
            size="sm"
            className="max-w-xs"
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>

          {/* Sort Order */}
          <Select
            label="Urutan"
            selectedKeys={[filter.sortOrder]}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                sortOrder: e.target.value as AnggotaFilter["sortOrder"],
              })
            }
            size="sm"
            className="max-w-xs"
          >
            <SelectItem key="asc">A - Z</SelectItem>
            <SelectItem key="desc">Z - A</SelectItem>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            className="font-semibold border-2 border-indigo-900/30 text-red-950"
            color="danger"
            startContent={<XMarkIcon className="h-4 w-4" />}
            onPress={onReset}
            size="sm"
          >
            Reset Filter
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
