"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  getKeyValue,
} from "@heroui/react";
import { Meeting } from "@/types/meeting";
import { formatTanggalID } from "@/features/notulen/utils/dateFormat";
import { mockMeetingCategories } from "@/mocks/meeting-category";

interface BackupListProps {
  meetings: Meeting[];
}

export const BackupList = ({ meetings }: BackupListProps) => {
  const columns = [
    { key: "no", label: "NO" },
    { key: "title", label: "JUDUL RAPAT" },
    { key: "date", label: "TANGGAL" },
    { key: "category", label: "JENIS RAPAT" },
    { key: "status", label: "STATUS" },
  ];

  const getCategoryName = (id: string) => {
    return mockMeetingCategories.find((c) => c.id === id)?.name || id;
  };

  const rows = meetings.map((meeting, index) => ({
    key: meeting.id,
    no: index + 1,
    title: meeting.title,
    date: formatTanggalID(meeting.date),
    category: getCategoryName(meeting.meetingCategoryID),
    status: meeting.status,
  }));

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
      case "status":
        return (
          <Chip color="success" size="sm" variant="flat">
            Selesai
          </Chip>
        );
      case "title":
        return (
          <div className="whitespace-normal max-w-md">
            <p className="font-semibold text-sm">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Daftar Rapat Terpilih ({meetings.length})
        </h3>
      </div>

      <Table aria-label="Backup Data Table" shadow="none" selectionMode="none">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "no" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          emptyContent={"Tidak ada data rapat untuk periode ini."}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
