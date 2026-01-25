import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import clsx from "clsx";
interface Column {
  key: string;
  label: string;
  className?:string;
}

interface DataTableProps<T> {
  columns: Column[];
  items: T[];
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
  emptyContent?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  items,
  renderCell,
  emptyContent = "Tidak ada data",
}: DataTableProps<T>) {
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white">
      <Table
        removeWrapper
        classNames={{
          th: "bg-gray-50 text-gray-600 border-b border-gray-200 h-12",
          td: "py-3 border-b border-gray-100",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className={clsx("px-4", column.className)}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={items} emptyContent={emptyContent}>
          {(item) => (
            <TableRow key={(item as any).id}>
              {(columnKey) => (
                <TableCell className="px-4">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
