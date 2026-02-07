"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import { MeetingCategory, MeetingTypeVariant } from "@/types/meeting";
import { CategorySection } from "./CategorySection";
import { TrashIcon } from "@heroicons/react/24/outline";

interface MeetingTypeListViewProps {
  variants: MeetingTypeVariant[];
  filteredCategories: MeetingCategory[];
  onCreate?: (categoryId?: string) => void;
  onEdit?: (variant: MeetingTypeVariant) => void;
  onDelete?: (id: string, name: string) => void;
  onCategoryDelete?: (id: string, name: string) => void;
  isReadOnly?: boolean;
}

export function MeetingTypeListView({
  variants,
  filteredCategories,
  onCreate,
  onEdit,
  onDelete,
  onCategoryDelete,
  isReadOnly = false,
}: MeetingTypeListViewProps) {
  return (
    <div className="flex flex-col gap-6 ">
      {filteredCategories.length > 0 ? (
        <div className="space-y-6">
          <Accordion
            variant="splitted"
            selectionMode="multiple"
            className="px-0"
            defaultSelectedKeys={
              filteredCategories.length === 1
                ? [filteredCategories[0].id]
                : undefined
            }
          >
            {filteredCategories.map((category) => (
              <AccordionItem
                key={category.id}
                aria-label={category.name}
                title={
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {category.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-indigo-100 text-indigo-700 font-bold px-2 py-2"
                        >
                          {
                            variants.filter((v) => v.categoryId === category.id)
                              .length
                          }
                        </Chip>
                        <span className="text-sm text-gray-500">
                          Sub Jenis Rapat
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MeetingTypeBadge
                        categoryName={category.name}
                        color={category.color}
                        size="md"
                      />

                      {/* CATEGORY ACTIONS */}
                      {!isReadOnly && onCategoryDelete && (
                        <div className="flex items-center gap-1 border-l pl-3 border-gray-200">
                          <div
                            role="button"
                            title="Hapus Kategori"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCategoryDelete(category.id, category.name);
                            }}
                            className="p-2 rounded-lg hover:bg-danger/10 text-danger transition-colors cursor-pointer"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }
                classNames={{
                  base: "border border-gray-100 shadow-sm rounded-2xl mb-4 overflow-hidden bg-white",
                  trigger: "px-6 py-5 hover:bg-gray-50/50 transition-colors",
                  content: "px-6 pb-6 pt-2",
                }}
              >
                <CategorySection
                  category={category}
                  variants={variants}
                  onCreate={onCreate}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center py-20 bg-default-50 rounded-3xl border-2 border-dashed border-divider">
          <p className="text-default-500 font-bold text-xl">
            Tidak ada jenis rapat ditemukan.
          </p>
        </div>
      )}
    </div>
  );
}
