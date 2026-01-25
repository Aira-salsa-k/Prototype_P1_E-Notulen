"use client";

import { useMemo, useState, useEffect } from "react";
import { SekretarisDewanProfile } from "@/types/sekretaris-dewan";

const ROWS_PER_PAGE = 10;

export function useSekretarisDewanTable(data: SekretarisDewanProfile[]) {
  const [page, setPage] = useState(1);

  const orderedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // aktif tampil di atas
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1;
      }

      // yang paling baru di atas
      return (
        new Date(b.periodeStart).getTime() - new Date(a.periodeStart).getTime()
      );
    });
  }, [data]);

   const totalItems = orderedData.length;
  const totalPages = Math.ceil(orderedData.length / ROWS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return orderedData.slice(start, start + ROWS_PER_PAGE);
  }, [orderedData, page]);


  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages]);


  return {
    data: paginatedData,
    page,
    setPage,
    totalPages,
    rowsPerPage: ROWS_PER_PAGE,
    totalItems,
  };
}
