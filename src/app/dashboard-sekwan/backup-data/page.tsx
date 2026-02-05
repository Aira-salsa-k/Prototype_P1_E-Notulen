"use client";

import React from "react";
import { BackupDataPage } from "@/features/backup-data/components/BackupDataPage";
import AccessGuard from "@/features/manajemen-akses/components/AccessGuard";

export default function Page() {
  return (
    <AccessGuard role="sekwan">
      <BackupDataPage />
    </AccessGuard>
  );
}
