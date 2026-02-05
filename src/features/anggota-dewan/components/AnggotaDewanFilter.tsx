// app/components/anggota-dewan/AnggotaDewanFilter.tsx
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnggotaFilter } from "@/types/anggota-dewan";

interface AnggotaDewanFilterProps {
  filter: AnggotaFilter;
  onFilterChange: (filter: AnggotaFilter) => void;
  onReset: () => void;
  onClose?: () => void;
}

export default function AnggotaDewanFilter({
  filter,
  onFilterChange,
  onReset,
  onClose,
}: AnggotaDewanFilterProps) {
  const handleClose = () => {
    onReset(); // Otomatis reset saat ditutup
    onClose?.();
  };

  return (
    <Card className="mb-6 bg-primary/10 border-none shadow-sm">
      <CardBody className="py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <Input
              isClearable
              placeholder="Cari nama atau jabatan anggota dewan..."
              value={filter.search}
              onValueChange={(value) =>
                onFilterChange({ ...filter, search: value })
              }
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              variant="flat"
              size="lg"
              classNames={{
                inputWrapper: "bg-white border-none shadow-sm h-12",
              }}
              onClear={() => onReset()}
            />
          </div>

          {/* Close Button Only */}
          {onClose && (
            <Button
              isIconOnly
              variant="light"
              onPress={handleClose}
              size="lg"
              className="text-gray-400 hover:text-danger rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
