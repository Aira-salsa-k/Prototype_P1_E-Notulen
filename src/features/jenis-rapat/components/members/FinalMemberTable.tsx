import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Input } from "@heroui/input";
import {
  TrashIcon,
  UserGroupIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { MeetingTypeMemberConfig } from "@/types/meeting";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface FinalMemberTableProps {
  fields: (MeetingTypeMemberConfig & { id: string })[];
  onRemove: (index: number) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
  onUpdate: (
    index: number,
    field: keyof MeetingTypeMemberConfig,
    value: string,
  ) => void;
}

const COMMON_ROLES = [
  "Ketua",
  "Wakil Ketua I",
  "Wakil Ketua II",
  "Wakil Ketua III",
  "Anggota",
  "Sekretaris",
];

const MAPPED_ROLES = COMMON_ROLES.map((r) => ({
  value: r,
  label: r,
}));

// Sortable Row Component using standard HTML <tr>
function SortableRow({
  field,
  index,
  onRemove,
  onUpdate,
}: {
  field: MeetingTypeMemberConfig & { id: string };
  index: number;
  onRemove: (index: number) => void;
  onUpdate: (
    index: number,
    field: keyof MeetingTypeMemberConfig,
    value: string,
  ) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  // Use local state for the input value to prevent table re-renders on every keystroke
  const [localMeetingRole, setLocalMeetingRole] = React.useState(
    field.meetingRole || "",
  );

  // Sync with group value if it changes externally (e.g. reorder)
  React.useEffect(() => {
    setLocalMeetingRole(field.meetingRole || "");
  }, [field.meetingRole]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: "relative" as any,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`
        ${isDragging ? "bg-indigo-50 shadow-2xl ring-2 ring-indigo-200" : "bg-white hover:bg-gray-50/50"}
        transition-colors border-b border-gray-100 group
      `}
    >
      <td className="p-4 text-center align-middle">
        <div className="flex items-center gap-3 justify-center">
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-indigo-600 transition-colors touch-none rounded-lg hover:bg-white"
            title="Drag to reorder"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          <span className="text-gray-500 font-bold text-sm min-w-[20px]">
            {index + 1}
          </span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-900 leading-tight">
            {field.name || "Tanpa Nama"}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">
            {field.jabatan || "Anggota"}
          </span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <Autocomplete
          aria-label="Pilih Jabatan Rapat"
          defaultItems={MAPPED_ROLES}
          inputValue={localMeetingRole}
          onInputChange={(val) => setLocalMeetingRole(val)}
          onSelectionChange={(key) => {
            if (key) {
              const val = String(key);
              setLocalMeetingRole(val);
              onUpdate(index, "meetingRole", val);
            }
          }}
          onBlur={() => {
            onUpdate(index, "meetingRole", localMeetingRole);
          }}
          size="sm"
          variant="bordered"
          allowsCustomValue
          classNames={{ base: "max-w-[300px]" }}
        >
          {(role) => (
            <AutocompleteItem key={role.value}>{role.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </td>
      <td className="p-4 align-middle">
        <Input
          size="sm"
          variant="bordered"
          value={field.displayFormat || ""}
          onValueChange={(val) => onUpdate(index, "displayFormat", val)}
          classNames={{ input: "text-xs font-mono text-gray-600" }}
        />
      </td>
      <td className="p-4 text-center align-middle">
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="light"
          onPress={() => onRemove(index)}
          className="text-danger-400 hover:text-danger hover:bg-danger-50"
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </td>
    </tr>
  );
}

export function FinalMemberTable({
  fields,
  onRemove,
  onReorder,
  onUpdate,
}: FinalMemberTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="border-2 border-primary/40 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* Header Panel */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-gray-800 text-base">
            Daftar Peserta Terdaftar
          </h3>
          <Chip size="sm" color="primary" className="font-bold">
            {fields.length}
          </Chip>
        </div>
        {fields.length > 0 && (
          <p className="text-sm font-medium text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-2">
            <Bars3Icon className="w-4 h-4" />
            <span>Drag handle untuk ganti urutan</span>
          </p>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="p-4 text-xs font-bold text-gray-500 text-center w-[120px]">
                  No
                </th>
                <th className="p-4 text-xs font-bold text-gray-500">
                  NAMA ANGGOTA
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 w-[320px]">
                  JABATAN RAPAT
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 w-[550px]">
                  DISPLAY FORMAT
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 text-center w-[80px]">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fields.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24">
                    <div className="text-center text-gray-400">
                      <UserGroupIcon className="w-20 h-20 mx-auto mb-4 opacity-10" />
                      <p className="text-lg font-medium text-gray-400">
                        Belum ada anggota yang didaftarkan.
                      </p>
                      <p className="text-sm mt-2">
                        Gunakan panel di atas untuk menambahkan peserta.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <SortableContext
                  items={fields.map((f) => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field, index) => (
                    <SortableRow
                      key={field.id}
                      field={field}
                      index={index}
                      onRemove={onRemove}
                      onUpdate={onUpdate}
                    />
                  ))}
                </SortableContext>
              )}
            </tbody>
          </table>
        </div>
      </DndContext>
    </div>
  );
}
