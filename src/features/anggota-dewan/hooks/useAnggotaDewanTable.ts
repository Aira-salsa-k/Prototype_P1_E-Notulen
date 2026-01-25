"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AnggotaDewan, AnggotaFilter, AKD } from "@/types/anggota-dewan";
import { AKD_CONFIG } from "@/lib/config/akd";

// Enterprise Standard: Simpan konstanta di luar hook
const ROWS_PER_PAGE = 10;

export function useAnggotaDewanTable(data: AnggotaDewan[]) {
  const [filter, setFilter] = useState<AnggotaFilter>({
    status: "all",
    akd: [],
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  const [page, setPage] = useState(1);

  // 1. Logika Filtering & Sorting Utama
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // --- FILTERING ---

    // Filter berdasarkan Status (active/inactive)
    if (filter.status !== "all") {
      result = result.filter((a) => a.status === filter.status);
    }

    // Filter berdasarkan Multi-select AKD (Jika ada AKD yang dipilih)
    if (filter.akd && filter.akd.length > 0) {
      result = result.filter((item) =>
        filter.akd.some((selectedAkd) => item.akd.includes(selectedAkd)),
      );
    }

    // Filter berdasarkan Search (Nama, Jabatan, atau Label AKD)
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((a) => {
        const matchName = a.name.toLowerCase().includes(q);
        const matchJabatan = a.jabatan.toLowerCase().includes(q);
        const matchAkd = a.akd.some((akdKey) =>
          AKD_CONFIG[akdKey]?.label.toLowerCase().includes(q),
        );
        return matchName || matchJabatan || matchAkd;
      });
    }

    // --- SORTING (Enterprise Pattern: Active First + User Selection) ---
    result.sort((a, b) => {
      // Prioritas 1: Status "active" selalu di atas (kecuali jika user memfilter status)
      if (a.status === "active" && b.status === "inactive") return -1;
      if (a.status === "inactive" && b.status === "active") return 1;

      // Prioritas 2: User Defined Sort (berdasarkan sortBy & sortOrder)
      const aVal = String(a[filter.sortBy] || "").toLowerCase();
      const bVal = String(b[filter.sortBy] || "").toLowerCase();

      if (aVal !== bVal) {
        const comparison = aVal.localeCompare(bVal, undefined, {
          numeric: true,
        });
        return filter.sortOrder === "asc" ? comparison : -comparison;
      }

      // Prioritas 3: Secondary Sort (Jika data sama, urutkan berdasarkan nama sebagai fallback)
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [data, filter]);

  // 2. Logika Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredAndSortedData.slice(start, start + ROWS_PER_PAGE);
  }, [filteredAndSortedData, page]);

  // Reset ke halaman 1 setiap kali filter berubah
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // Enterprise Helper: Reset Filter function
  const resetFilter = useCallback(() => {
    setFilter({
      status: "all",
      akd: [],
      search: "",
      sortBy: "name",
      sortOrder: "asc",
    });
  }, []);

  return {
    data: paginatedData,
    filter,
    setFilter,
    resetFilter, // Fungsi tambahan untuk mempermudah UI
    page,
    setPage,
    totalPages,
    totalItems,
    rowsPerPage: ROWS_PER_PAGE,
  };
}

// "use client";

// import { useMemo, useState, useEffect } from "react";
// import { AnggotaDewan, AnggotaFilter } from "@/types/anggota-dewan";
// import { AKD_CONFIG } from "@/lib/config/akd";

// const ROWS_PER_PAGE = 10; // 🔥 STABIL & BENAR

// export function useAnggotaDewanTable(data: AnggotaDewan[]) {
//   const [filter, setFilter] = useState<AnggotaFilter>({
//     status: "all",
//     akd: [],
//     search: "",
//     sortBy: "name",
//     sortOrder: "asc",
//   });

//   const [page, setPage] = useState(1);

//   const filteredData = useMemo(() => {
//     let result = [...data];

//     if (filter.status !== "all") {
//       result = result.filter((a) => a.status === filter.status);
//     }

//     if (filter.search) {
//       const q = filter.search.toLowerCase();
//       result = result.filter(
//         (a) =>
//           a.name.toLowerCase().includes(q) ||
//           a.jabatan.toLowerCase().includes(q) ||
//           a.akd.some((akd) => AKD_CONFIG[akd].label.toLowerCase().includes(q))
//       );
//     }

//     result.sort((a, b) => {
//       const aVal = a[filter.sortBy];
//       const bVal = b[filter.sortBy];
//       return filter.sortOrder === "asc"
//         ? String(aVal).localeCompare(String(bVal))
//         : String(bVal).localeCompare(String(aVal));
//     });

//     return result;
//   }, [data, filter]);

//   const totalItems = filteredData.length;
//   const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);

//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * ROWS_PER_PAGE;
//     return filteredData.slice(start, start + ROWS_PER_PAGE);
//   }, [filteredData, page]);

//   useEffect(() => {
//     setPage(1);
//   }, [filter]);

//   return {
//     data: paginatedData,
//     filter,
//     setFilter,
//     page,
//     setPage,
//     totalPages,
//     totalItems,
//     rowsPerPage: ROWS_PER_PAGE,
//   };
// }
