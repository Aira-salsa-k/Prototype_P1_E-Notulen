import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { PencilIcon, TrashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { TableActions } from "@/components/ui/table/TableActions";

function TableActionPreview({
  icon,
  label,
  code,
}: {
  icon: React.ReactNode;
  label: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm border border-gray-100 bg-white">
      <CardBody className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-50 rounded-xl w-full flex justify-center">
            {/* We mock the item here */}
            {label === "Edit" && (
              <TableActions item={{}} onEdit={() => alert("Edit")} />
            )}
            {label === "Delete" && (
              <TableActions item={{}} onDelete={() => alert("Delete")} />
            )}
            {label === "Reset Password" && (
              <TableActions
                item={{}}
                onResetPassword={() => alert("Reset Password")}
              />
            )}
            {label === "All Actions" && (
              <TableActions
                item={{}}
                onEdit={() => {}}
                onDelete={() => {}}
                onResetPassword={() => {}}
              />
            )}
          </div>

          <div className="w-full">
            <h4 className="font-bold text-sm text-gray-900 mb-1">{label}</h4>
            <div
              className="bg-gray-800 text-gray-100 p-3 rounded-lg text-[10px] font-mono overflow-x-auto cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={handleCopy}
            >
              <div className="flex justify-between items-center mb-1 text-gray-400 border-b border-gray-700 pb-1">
                <span>Usage</span>
                <span>{copied ? "Copied!" : "Click to copy"}</span>
              </div>
              {code}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export const TableActionShowcase = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        7. Table Action Buttons
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Standard pattern untuk action buttons di tabel menggunakan component{" "}
        <code>TableActions</code>. Component ini secara otomatis menangani
        responsive layout (buttons di desktop, dropdown di mobile).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TableActionPreview
          icon={<PencilIcon className="h-5 w-5" />}
          label="All Actions"
          code={`<TableActions 
  onEdit={(item) => handleEdit(item)}
  onDelete={(item) => handleDelete(item)}
  onResetPassword={(item) => handleReset(item)}
/>`}
        />
        <TableActionPreview
          icon={<PencilIcon className="h-5 w-5" />}
          label="Edit Only"
          code={`<TableActions 
  onEdit={(item) => handleEdit(item)}
/>`}
        />
      </div>
    </section>
  );
};
