"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AnggotaDewan, AnggotaFilter } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";

import { User } from "@/types/user";

const ROWS_PER_PAGE = 10;

export function useAnggotaDewanTable(data: AnggotaDewan[], users: User[]) {
  const [filter, setFilter] = useState<AnggotaFilter>({
    search: "",
  });

  const [page, setPage] = useState(1);

  // 1. Logika Filtering Utama (Hanya Search)
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter berdasarkan Search (Nama, Jabatan, atau Label AKD)
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((a) => {
        const user = users.find((u) => u.id === a.userId);
        const name = user?.name.toLowerCase() || "";
        const matchName = name.includes(q);
        const matchJabatan = a.jabatan.toLowerCase().includes(q);
        const matchAkd = a.akd.some((akdKey) =>
          AKD_CONFIG[akdKey]?.label.toLowerCase().includes(q),
        );
        return matchName || matchJabatan || matchAkd;
      });
    }

    // Sorting: Status (Active First) then by Hierarchy (Ketua > Wakil) then by Name
    const getPriority = (jabatan: string) => {
      const up = jabatan.toUpperCase();
      if (up.includes("KETUA") && !up.includes("WAKIL")) return 1;
      if (
        up.includes("WAKIL KETUA I") &&
        !up.includes("WAKIL KETUA II") &&
        !up.includes("WAKIL KETUA III")
      )
        return 2;
      if (up.includes("WAKIL KETUA II") && !up.includes("WAKIL KETUA III"))
        return 3;
      if (up.includes("WAKIL KETUA III")) return 4;
      if (up.includes("ANGGOTA")) return 5;
      return 99;
    };

    result.sort((a, b) => {
      // 1. Sort by Status (active first)
      const statusA = a.status === "active" ? 0 : 1;
      const statusB = b.status === "active" ? 0 : 1;
      if (statusA !== statusB) return statusA - statusB;

      // 2. Sort by Position Hierarchy
      const pA = getPriority(a.jabatan || "");
      const pB = getPriority(b.jabatan || "");
      if (pA !== pB) return pA - pB;

      // 3. Secondary sort by name
      const userA = users.find((u) => u.id === a.userId);
      const userB = users.find((u) => u.id === b.userId);
      const nameA = userA?.name || "";
      const nameB = userB?.name || "";

      return nameA.localeCompare(nameB);
    });

    return result;
  }, [data, filter.search, users]);

  // 2. Logika Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredAndSortedData.slice(start, start + ROWS_PER_PAGE);
  }, [filteredAndSortedData, page]);

  // Reset ke halaman 1 setiap kali search berubah
  useEffect(() => {
    setPage(1);
  }, [filter.search]);

  const resetFilter = useCallback(() => {
    setFilter({
      search: "",
    });
  }, []);

  return {
    data: paginatedData,
    filter,
    setFilter,
    resetFilter,
    page,
    setPage,
    totalPages,
    totalItems,
    rowsPerPage: ROWS_PER_PAGE,
  };
}
