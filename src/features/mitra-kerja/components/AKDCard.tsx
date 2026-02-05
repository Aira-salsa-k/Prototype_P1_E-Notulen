// app/components/mitra-kerja/AKDCard.tsx
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@heroui/tooltip";
import { MitraInstitution } from "@/types";
import { AKD_CONFIG } from "@/lib/config/akd";
import { semanticToClassName } from "@/lib/semantic/semantic-chip";
import clsx from "clsx";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

interface AKDCardProps {
  akdId: string;
  institutions: MitraInstitution[];
  onEdit: (institution: MitraInstitution) => void;
  onRequestDelete: (institution: MitraInstitution) => void;
  isReadOnly?: boolean;
}

export default function AKDCard({
  akdId,
  institutions,
  onEdit,
  onRequestDelete,
  isReadOnly = false,
}: AKDCardProps) {
  const config = AKD_CONFIG[akdId as keyof typeof AKD_CONFIG];
  const colorClass = semanticToClassName[config.tone];

  return (
    <Card
      className={clsx(
        "border-0 shadow-sm hover:shadow-md transition-shadow duration-200",
        "hover:border-primary/20 hover:border hover:border-solid",
      )}
    >
      <CardHeader className={clsx("px-6 py-4 border-b", colorClass)}>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-right">{config.label}</h2>

          <span className="text-sm font-medium opacity-80">
            {institutions.length} instansi
          </span>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        <div className="divide-y divide-gray-100">
          {institutions.map((institution) => (
            <div
              key={institution.id}
              className={clsx(
                "group relative px-6 py-4 flex items-start",
                "hover:bg-primary/5 transition-colors duration-150 overflow-hidden",
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Status Indicator */}
                <div className="relative">
                  <div
                    className={clsx(
                      "h-2 w-2 rounded-full",
                      institution.status === "active"
                        ? "bg-success"
                        : "bg-gray-300",
                    )}
                  />
                  {institution.status === "active" && (
                    <div className="absolute inset-0 h-2 w-2 rounded-full bg-success animate-ping" />
                  )}
                </div>

                {/* Institution Name */}
                <div
                  className={clsx(
                    "flex-1 transition-all duration-300 ease-in-out",
                    "group-hover:pr-24",
                  )}
                >
                  <p className="text-gray-900 font-medium">
                    {institution.name}
                  </p>
                </div>
              </div>

              {/* Action Buttons (shown on hover) */}
              {!isReadOnly && (
                <div className="flex items-center gap-2">
                  {/* === DESKTOP ACTION (hover) === */}
                  <div
                    className={clsx(
                      "hidden md:flex absolute right-4 top-7 -translate-y-1/2",
                      "items-center gap-1",
                      "opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0",
                    )}
                  >
                    <Tooltip content="Edit">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        onPress={() => onEdit(institution)}
                        className="text-primary hover:scale-105 transition-transform"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Hapus" color="danger">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => onRequestDelete(institution)}
                        className="text-danger hover:scale-105 transition-transform"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </div>

                  {/* === MOBILE ACTION (3-dot menu) === */}
                  <div className="lg:hidden  ml-2">
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-gray-500"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu aria-label="Aksi Mitra Kerja">
                        <DropdownItem
                          key="edit"
                          startContent={<PencilIcon className="h-4 w-4" />}
                          onPress={() => onEdit(institution)}
                        >
                          Edit
                        </DropdownItem>

                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<TrashIcon className="h-4 w-4" />}
                          onPress={() => onRequestDelete(institution)}
                        >
                          Hapus
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
