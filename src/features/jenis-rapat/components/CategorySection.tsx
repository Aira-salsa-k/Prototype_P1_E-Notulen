"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  PlusIcon,
  ListBulletIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { MeetingCategory, MeetingTypeVariant } from "@/types/meeting";
import { VariantCard } from "./VariantCard";

interface CategorySectionProps {
  category: MeetingCategory;
  variants: MeetingTypeVariant[];
  onCreate?: (categoryId?: string) => void;
  onEdit?: (variant: MeetingTypeVariant) => void;
  onDelete?: (id: string, name: string) => void;
  isReadOnly?: boolean;
}

export function CategorySection({
  category,
  variants,
  onCreate,
  onEdit,
  onDelete,
  isReadOnly = false,
}: CategorySectionProps) {
  const categoryVariants = variants.filter((v) => v.categoryId === category.id);

  return (
    <div className="mb-2">
      {/* CATEGORY HEADER (Non-Accordion) */}
      {!isReadOnly && onCreate && (
        <div className="flex items-center justify-end mb-6 pt-4 border-t border-gray-200">
          <Button
            color="primary"
            onPress={() => onCreate(category.id)}
            startContent={<PlusIcon className="h-5 w-5" />}
          >
            Tambah Varian
          </Button>
        </div>
      )}

      {/* VARIANTS LIST (ACCORDION) */}
      <div className="space-y-4 ">
        {categoryVariants.length > 0 ? (
          <Accordion
            variant="splitted"
            selectionMode="multiple"
            className="px-0 "
          >
            {categoryVariants.map((variant) => (
              <AccordionItem
                key={variant.id}
                aria-label={variant.subName || category.name}
                title={
                  <div className="flex items-center justify-between w-full pr-4 ">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <FolderIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {variant.subName}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <Chip
                            size="sm"
                            variant="dot"
                            color="primary"
                            className="border-none px-0"
                          >
                            {variant.members.length} Anggota
                          </Chip>
                          <span className="text-[10px] text-gray-400 font-mono">
                            ID: {variant.id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* ACTIONS GROUP - Granular Checks */}
                      {(onEdit || onDelete) && !isReadOnly && (
                        <div className="flex items-center gap-2 border-l pl-4 border-gray-200 ml-4">
                          {/* EDIT */}
                          {onEdit && (
                            <div
                              role="button"
                              tabIndex={0}
                              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                              title="Edit Varian"
                              onClick={() => onEdit(variant)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </div>
                          )}

                          {/* DELETE */}
                          {onDelete && (
                            <div
                              role="button"
                              tabIndex={0}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Hapus Varian"
                              onClick={() => {
                                const variantName = variant.subName
                                  ? `${category.name} - ${variant.subName}`
                                  : category.name;
                                onDelete(variant.id, variantName);
                              }}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                }
                classNames={{
                  base: "border border-gray-200 shadow-xs rounded-2xl mb-4 overflow-hidden",
                  title: "w-full",
                  trigger: "px-6 py-4 hover:bg-gray-50 transition-colors",
                  content: "px-4 pb-4 pt-0",
                }}
                indicator={
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                }
              >
                <VariantCard
                  variant={variant}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isReadOnly={isReadOnly}
                />
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <ListBulletIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Belum ada varian rapat
              </h4>
              <p className="text-gray-500 mb-6">
                Buat varian rapat pertama untuk kategori {category.name}
              </p>
              {!isReadOnly && onCreate && (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => onCreate(category.id)}
                  startContent={<PlusIcon className="h-5 w-5" />}
                >
                  Buat Varian Pertama
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
