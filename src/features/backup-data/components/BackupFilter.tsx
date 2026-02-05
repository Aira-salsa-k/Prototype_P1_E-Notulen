"use client";

import React from "react";
import { Button } from "@heroui/react";
import { DatePicker, DateRangePicker } from "@heroui/date-picker";
import { BackupFilterType } from "../hooks/useBackupData";
import { parseDate, CalendarDate } from "@internationalized/date";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface BackupFilterProps {
  filterType: BackupFilterType;
  setFilterType: (type: BackupFilterType) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
}

export const BackupFilter = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}: BackupFilterProps) => {
  // Helper to convert JS Date to CalendarDate for HeroUI
  const getCalendarDate = (date: Date): CalendarDate => {
    return parseDate(format(date, "yyyy-MM-dd"));
  };

  // Helper to handle date changes from HeroUI
  const handleDateChange = (date: CalendarDate | null) => {
    if (date) {
      setSelectedDate(date.toDate("Asia/Jakarta"));
    }
  };

  // Helper for range picker
  const handleRangeChange = (
    range: { start: CalendarDate; end: CalendarDate } | null,
  ) => {
    if (range) {
      setCustomStartDate(range.start.toString());
      setCustomEndDate(range.end.toString());
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Periode Data
          </h3>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "daily", label: "Harian" },
              { id: "weekly", label: "Mingguan" },
              { id: "monthly", label: "Bulanan" },
              { id: "yearly", label: "Tahunan" },
              { id: "custom", label: "Custom Range" },
            ].map((type) => (
              <Button
                key={type.id}
                size="md"
                variant={filterType === type.id ? "solid" : "bordered"}
                color={filterType === type.id ? "primary" : "default"}
                onPress={() => setFilterType(type.id as BackupFilterType)}
                className={`font-medium min-w-[100px] ${
                  filterType === type.id ? "shadow-md" : "bg-white"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
         

          <div className="flex-1">
            {filterType !== "custom" ? (
              <div className="w-full max-w-sm">
                <DatePicker
                  label={
                    filterType === "daily"
                      ? "Pilih Tanggal"
                      : filterType === "weekly"
                        ? "Pilih Minggu (pilih tanggal dalam minggu)"
                        : filterType === "monthly"
                          ? "Pilih Bulan"
                          : "Pilih Tahun"
                  }
                  value={getCalendarDate(selectedDate)}
                  onChange={handleDateChange}
                  variant="bordered"
                  className="max-w-xs"
                  description={
                    filterType === "weekly" ? (
                      <span className="font-semibold text-primary-600 block mt-1">
                        {(() => {
                          const start = startOfWeek(selectedDate, {
                            weekStartsOn: 1,
                          });
                          const end = endOfWeek(selectedDate, {
                            weekStartsOn: 1,
                          });
                          return `${format(start, "dd MMM", { locale: id })} - ${format(end, "dd MMM yyyy", { locale: id })}`;
                        })()}
                      </span>
                    ) : filterType === "monthly" ? (
                      "Data akan diambil untuk satu bulan penuh."
                    ) : filterType === "yearly" ? (
                      "Data akan diambil untuk satu tahun penuh."
                    ) : (
                      "Data akan diambil untuk tanggal yang dipilih."
                    )
                  }
                />
              </div>
            ) : (
              <div className="w-full max-w-sm">
                <DateRangePicker
                  label="Rentang Tanggal"
                  variant="bordered"
                  description="Pilih tanggal mulai dan tanggal akhir untuk backup data."
                  value={
                    customStartDate && customEndDate
                      ? {
                          start: parseDate(customStartDate),
                          end: parseDate(customEndDate),
                        }
                      : null // Handle initial empty state if needed
                  }
                  onChange={(range) => range && handleRangeChange(range)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
