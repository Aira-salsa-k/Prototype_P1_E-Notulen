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

    // Default Sorting: Active First, then by Name
    result.sort((a, b) => {
      if (a.status === "active" && b.status === "inactive") return -1;
      if (a.status === "inactive" && b.status === "active") return 1;

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
