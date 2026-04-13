import React from "react";
import { DataTable } from "@/components/ui/table/DataTable";
import { TableActions } from "@/components/ui/table/TableActions";
import { UserIcon } from "@heroicons/react/24/outline";

export const TableShowcase = () => {
  const columns = [
    { key: "name", label: "NAMA" },
    { key: "role", label: "PERAN" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "AKSI", className: "w-20" },
  ];

  const items = [
    { id: "1", name: "Budi Santoso", role: "Ketua", status: "Aktif" },
    { id: "2", name: "Siti Aminah", role: "Sekretaris", status: "Aktif" },
    { id: "3", name: "Ahmad Fauzi", role: "Anggota", status: "Non-Aktif" },
  ];

  const renderCell = (item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UserIcon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-gray-900">{item.name}</span>
          </div>
        );
      case "role":
        return <span className="text-gray-600">{item.role}</span>;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              item.status === "Aktif"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.status}
          </span>
        );
      case "actions":
        return (
          <TableActions
            item={item}
            onEdit={() => alert("Edit " + item.name)}
            onDelete={() => alert("Delete " + item.name)}
          />
        );
      default:
        return item[columnKey as keyof typeof item];
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        8. Data Table
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Component <code>DataTable</code> digunakan untuk menampilkan list data
        dengan layout yang bersih. Mendukung custom cell rendering dan header
        styling.
      </p>

      <div className="space-y-8">
        <DataTable columns={columns} items={items} renderCell={renderCell} />

        <div className="bg-gray-800 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
          <p className="text-gray-400 mb-2">// Basic Usage</p>
          <pre>{`<DataTable
  columns={columns}
  items={data}
  renderCell={(item, columnKey) => {
    if (columnKey === 'actions') return <TableActions ... />
    return item[columnKey]
  }}
/>`}</pre>
        </div>
      </div>
    </section>
  );
};
