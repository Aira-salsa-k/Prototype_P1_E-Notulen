"use client";

import { Card, CardBody } from "@heroui/react";
import { KopSuratHeader } from "./KopSuratHeader";

export const KopSuratPreview = () => {
  return (
    <Card className="w-full h-full bg-gray-50/50">
      <CardBody className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="bg-white p-3 shadow-md w-full max-w-[210mm] min-h-[297mm] mx-auto scale-75 origin-top border border-gray-200">
          <KopSuratHeader />

          {/* Dummy Content to visualize context */}
          <div className="mt-8 space-y-4 text-gray-400">
            <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-100 rounded w-full mt-12"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
