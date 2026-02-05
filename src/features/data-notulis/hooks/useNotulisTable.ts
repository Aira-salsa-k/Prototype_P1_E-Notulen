"use client";

import { useMemo, useState } from "react";
import { Notulis } from "@/types/notulis";
import { User } from "@/types/user";

export interface NotulisFilter {
  search: string;
  status: "all" | "active" | "inactive";
}

export const useNotulisTable = (data: Notulis[], users: User[]) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [filter, setFilter] = useState<NotulisFilter>({
    search: "",
    status: "all",
  });

  const resetFilter = () => setFilter({ search: "", status: "all" });

  const filteredData = useMemo(() => {
    let result = [...data];

    // Status Filter
    if (filter.status !== "all") {
      const isActive = filter.status === "active";
      result = result.filter((n) => n.isActive === isActive);
    }

    // Search Filter
    if (filter.search) {
      const lower = filter.search.toLowerCase();
      result = result.filter((n) => {
        const user = users.find((u) => u.id === n.userID);
        const nameMatch = user?.name.toLowerCase().includes(lower);
        const nipMatch = n.NIP.includes(lower);
        return nameMatch || nipMatch;
      });
    }

    return result;
  }, [data, filter, users]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  return {
    data: paginatedData,
    filter,
    setFilter,
    resetFilter,
    page,
    setPage,
    totalPages,
    totalItems,
    rowsPerPage,
  };
};
