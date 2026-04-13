"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AppButton } from "@/components/ui/button/AppButton";

// Feature Components
import { ColorPalette } from "@/features/design-system/components/ColorPalette";
import { ButtonVariants } from "@/features/design-system/components/ButtonVariants";
import { SidebarNavigation } from "@/features/design-system/components/SidebarNavigation";
import { BadgeShowcase } from "@/features/design-system/components/BadgeShowcase";
import { IconLibrary } from "@/features/design-system/components/IconLibrary";
import { TableActionShowcase } from "@/features/design-system/components/TableActionShowcase";
import { TableShowcase } from "@/features/design-system/components/TableShowcase";
import { CardShowcase } from "@/features/design-system/components/CardShowcase";
import { AccordionShowcase } from "@/features/design-system/components/AccordionShowcase";
import { ModalShowcase } from "@/features/design-system/components/ModalShowcase";
import { FormShowcase } from "@/features/design-system/components/FormShowcase";
import { ModalInspectShowcase } from "@/features/design-system/components/ModalInspectShowcase";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900 transition-all duration-700">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <AppButton
              variant="light"
              isIconOnly
              color="ghost"
              className="text-gray-500"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </AppButton>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Design System</h1>
            <p className="text-gray-500 mt-1">
              Dokumentasi warna dan komponen UI aplikasi (v1.0)
            </p>
          </div>
        </div>

        {/* 1. Color Palette */}
        <ColorPalette />

        {/* 3. Sidebar Colors */}
        <SidebarNavigation />

        {/* 4. Buttons */}
        <ButtonVariants />

        {/* 5. Semantic Tones (Badges) & 6. Specific Badge Examples */}
        <BadgeShowcase />

        {/* 7. Table Actions */}
        <TableActionShowcase />

        {/* 8. Data Table */}
        <TableShowcase />

        {/* 9. Cards */}
        <CardShowcase />

        {/* 10. Accordions */}
        <AccordionShowcase />

        {/* 11. Modals */}
        <ModalShowcase />

        {/* 14. Modal Inspection */}
        <ModalInspectShowcase />

        {/* 12. Form Elements */}
        <FormShowcase />

        {/* 13. Icon Library */}
        <IconLibrary />
      </div>
    </div>
  );
}
