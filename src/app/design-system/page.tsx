"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { AppButton } from "@/components/ui/button/AppButton";
import { StatusBadge } from "@/components/ui/badges/StatusBadge";
import { MeetingTypeBadge } from "@/components/ui/badges/meeting-type-badge";
import { MeetingStatusBadge } from "@/components/ui/badges/MeetingStatusBadge";
import { AKDBadge } from "@/components/ui/badges/AKDBadge";
import { BaseBadge } from "@/components/ui/badges/BaseBadge";
import {
  HomeIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  InboxStackIcon as InboxStackIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AKD_CONFIG } from "@/lib/config/akd";
import { AKD } from "@/types/anggota-dewan";
import { Tooltip } from "@heroui/tooltip";
import { semanticToClassName } from "@/lib/semantic/semantic-chip";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-16">
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
        <section>
          <div className="flex items-center gap-3 mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">
              1. Color Palette
            </h2>
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
              Click to Copy HEX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ColorCard
              name="Primary (Indigo)"
              hex="#312c85"
              variable="--color-primary"
              bgClass="bg-[#312c85]"
              textClass="text-white"
            />
            <ColorCard
              name="Secondary/Background"
              hex="#f4f4f5"
              variable="--color-secondary / zinc-100"
              bgClass="bg-zinc-100"
              textClass="text-zinc-900"
            />
            <ColorCard
              name="Danger (Red-600)"
              hex="#dc2626"
              variable="--color-danger / red-600"
              bgClass="bg-red-600"
              textClass="text-white"
              description="Digunakan untuk aksi penghapusan (Destroy)"
            />
            <ColorCard
              name="Warning (Amber-400)"
              hex="#fbbf24"
              variable="--color-warning / amber-400"
              bgClass="bg-amber-400"
              textClass="text-amber-900"
              description="Warna peringatan & aksi edit (High Visibility)"
            />
          </div>
        </section>

        {/* 2. Form & Input Colors */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            2. Form & Input Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorCard
              name="Input Background"
              hex="#F5F5FA (Mixed)"
              variable="--input-bg-default"
              bgClass="bg-[color:var(--input-bg-default)]"
              textClass="text-gray-900"
              description="Campuran Primary (7%) dengan White"
            />
            <ColorCard
              name="Input Border"
              hex="#d1d5db"
              variable="--color-input-border-default"
              bgClass="bg-gray-300"
              textClass="text-gray-900"
            />
            <ColorCard
              name="Focus Ring/Border"
              hex="#312c85"
              variable="--color-input-border-focus"
              bgClass="bg-[#312c85]"
              textClass="text-white"
            />
          </div>
        </section>

        {/* 3. Sidebar Colors */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            3. Sidebar Navigation
          </h2>

          <div className="space-y-6">
            {/* Visual Example */}
            <Card className="max-w-md bg-[#312c85] p-4">
              <CardBody className="space-y-3">
                <p className="text-indigo-200 text-xs uppercase font-semibold mb-2 ml-1">
                  Example Menu
                </p>
                <div className="flex items-center p-3 rounded-lg bg-indigo-200 text-indigo-900 border-l-4 border-indigo-900/30 shadow-sm cursor-default">
                  <HomeIcon className="w-5 h-5 mr-3 text-blue-900/80" />
                  <span className="font-medium">Active Menu Item</span>
                </div>
                <div className="flex items-center p-3 rounded-lg text-neutral-100 hover:bg-indigo-900/40 border-l-4 border-transparent cursor-pointer transition-colors">
                  <HomeIcon className="w-5 h-5 mr-3 text-indigo-300" />
                  <span className="font-medium">Inactive Menu Item</span>
                </div>
              </CardBody>
            </Card>

            {/* Color Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SidebarStateCard
                title="Active State"
                bgColor="bg-indigo-200"
                textColor="text-indigo-900"
                iconColor="text-blue-900/80"
                borderColor="border-indigo-900/30"
                code={`bg-indigo-200 text-indigo-900 border-l-4 border-indigo-900/30`}
                description="Background indigo-200, teks indigo-900, border kiri indigo-900/30"
              />
              <SidebarStateCard
                title="Inactive State"
                bgColor="bg-transparent"
                textColor="text-neutral-100"
                iconColor="text-indigo-300"
                borderColor="border-transparent"
                code={`text-neutral-100 border-l-4 border-transparent`}
                description="Teks neutral-100, icon indigo-300, border transparan"
              />
              <SidebarStateCard
                title="Hover State"
                bgColor="bg-indigo-900/40"
                textColor="text-neutral-200"
                iconColor="text-indigo-300"
                borderColor="border-transparent"
                code={`hover:bg-indigo-900/40 hover:text-neutral-200`}
                description="Background indigo-900 dengan opacity 40% saat hover"
              />
              <SidebarStateCard
                title="Sidebar Background"
                bgColor="bg-[#312c85]"
                textColor="text-white"
                iconColor="text-indigo-200"
                borderColor="border-none"
                code={`bg-[#312c85]`}
                description="Primary color (#312c85) untuk background sidebar"
              />
            </div>

            {/* Icon Usage */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-bold text-blue-900 mb-4">
                Icon Usage Pattern
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-blue-100 px-2 py-1 rounded">
                    Inactive:
                  </span>
                  <span>
                    Outline icons dari{" "}
                    <code className="bg-white px-1 rounded">
                      @heroicons/react/24/outline
                    </code>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-blue-100 px-2 py-1 rounded">
                    Active:
                  </span>
                  <span>
                    Solid icons dari{" "}
                    <code className="bg-white px-1 rounded">
                      @heroicons/react/24/solid
                    </code>
                  </span>
                </div>
                <div className="mt-4 bg-white p-3 rounded border border-blue-100">
                  <p className="text-xs font-semibold mb-2">
                    Available Navigation Icons:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>• HomeIcon</div>
                    <div>• UsersIcon</div>
                    <div>• UserGroupIcon</div>
                    <div>• UserIcon</div>
                    <div>• DocumentTextIcon</div>
                    <div>• CalendarIcon</div>
                    <div>• CogIcon</div>
                    <div>• DocumentIcon</div>
                    <div>• InboxStackIcon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Buttons */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            4. Buttons (AppButton Variants)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VariantPreview
              name="Ungu (Primary)"
              code="bg-indigo-900/89 text-indigo-50 hover:bg-indigo-800 hover:text-indigo-100 active:bg-indigo-900"
              component={<AppButton color="ungu">Simpan Data</AppButton>}
              description="Warna utama untuk aksi primary."
            />
            <VariantPreview
              name="Ungu Muda (Secondary)"
              code="bg-indigo-100 text-indigo-900 hover:bg-indigo-200/60 active:bg-indigo-200"
              component={
                <AppButton color="ungu-muda">Download Dokumen</AppButton>
              }
              description="Warna soft (Indigo-100). Cocok untuk tombol download atau aksi sekunder."
            />
            <VariantPreview
              name="Btn Batal (Ghost/Cancel)"
              code="text-indigo-800 hover:bg-indigo-200/30 active:bg-indigo-300/70"
              component={<AppButton color="btn-batal">Batalkan</AppButton>}
              description="Digunakan eksklusif untuk aksi batal/cancel."
            />
            <VariantPreview
              name="Kuning (Warning/Edit)"
              code="bg-amber-300/90 text-amber-800 hover:bg-amber-300/68 active:bg-amber-300/70"
              component={<AppButton color="kuning">Edit Data</AppButton>}
              description="Warna Amber-300 dengan opacity tinggi (90%) untuk edit."
            />
            <VariantPreview
              name="Merah (Danger/Delete)"
              code="bg-red-600/80 text-white hover:bg-red-700 active:bg-red-800"
              component={<AppButton color="merah">Hapus Permanen</AppButton>}
              description="Red-600 untuk aksi destruktif."
            />
            <VariantPreview
              name="Hijau (Live Button)"
              code="bg-lime-400/50 text-lime-900 active:bg-green-800 font-semibold"
              component={<AppButton color="hijau">Live Button</AppButton>}
              description="Lime-400 untuk aksi live button."
            />
          </div>
          <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
            <span className="font-bold">Note:</span> Varian seperti "hijau",
            "olive", dan "biru-muda" saat ini belum digunakan secara aktif di
            flow utama.
          </div>
        </section>

        {/* 5. Semantic Tones (Badges) */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">
              5. Semantic Tones (Badges / BaseBadge)
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(semanticToClassName).map(([tone, className]) => {
              const [copied, setCopied] = React.useState(false);

              const handleCopy = () => {
                const fullInfo = `// Tone: "${tone}"\n// Tailwind: "${className}"`;
                navigator.clipboard.writeText(fullInfo);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              };

              return (
                <Card
                  key={tone}
                  className="p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <BaseBadge label={tone.toUpperCase()} tone={tone as any} />
                    <div className="w-full">
                      <p className="text-[10px] text-gray-400 font-mono mb-1 truncate">
                        {tone}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="text-[10px] text-indigo-500 hover:underline flex items-center gap-1 mx-auto"
                      >
                        {copied ? (
                          <>
                            <ClipboardDocumentCheckIcon className="w-3 h-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <ClipboardIcon className="w-3 h-3" />
                            Copy Info
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Specific Badge Examples */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            6. Specific Badge Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
                Status Badge
              </h3>
              <div className="flex gap-4">
                <StatusBadge status="active" />
                <StatusBadge status="inactive" />
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
                Meeting Type Badge
              </h3>
              <div className="flex flex-wrap gap-4">
                <MeetingTypeBadge
                  categoryName="Pansus"
                  subCategoryName="LKPJ"
                  color="cyan"
                />
                <MeetingTypeBadge
                  categoryName="Pansus"
                  subCategoryName="LHP"
                  color="cyan"
                />
                <MeetingTypeBadge categoryName="Komisi I" color="info" />
                <MeetingTypeBadge categoryName="Banmus" color="warning" />
                <MeetingTypeBadge categoryName="Bapemperda" color="lime" />
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
                AKD Badge
              </h3>
              <div className="flex flex-wrap gap-4">
                {(Object.keys(AKD_CONFIG) as AKD[]).map((akd) => (
                  <AKDBadge key={akd} akd={akd} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
                Meeting Status Badge
              </h3>
              <div className="flex flex-wrap gap-4">
                <MeetingStatusBadge status="scheduled" />
                <MeetingStatusBadge status="live" />
                <MeetingStatusBadge status="completed" />
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-700 font-medium mb-2">
                  Status Logic:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>
                    • <strong>Terjadwal</strong> → Indigo/Primary (`neutral`
                    fallback)
                  </li>
                  <li>
                    • <strong>Live</strong> → Green/Success
                  </li>
                  <li>
                    • <strong>Selesai</strong> → Red/Danger
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Table Actions */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            7. Table Action Buttons
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Standard pattern untuk action buttons di tabel menggunakan HeroUI
            Button dengan variant="flat"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TableActionPreview
              icon={<PencilIcon className="h-5 w-5" />}
              label="Edit"
              color="primary"
              tooltipContent="Edit"
              code={`<Tooltip content="Edit" color="primary">
  <Button
    isIconOnly
    size="sm"
    variant="flat"
    color="primary"
    onPress={() => onEdit?.(item)}
    className="text-primary hover:scale-105 transition-transform"
  >
    <PencilIcon className="h-5 w-5" />
  </Button>
</Tooltip>`}
            />
            <TableActionPreview
              icon={<TrashIcon className="h-5 w-5" />}
              label="Delete"
              color="danger"
              tooltipContent="Hapus"
              code={`<Tooltip color="danger" content="Hapus">
  <Button
    isIconOnly
    size="sm"
    variant="flat"
    color="danger"
    onPress={() => onDelete?.(item)}
    className="text-danger"
  >
    <TrashIcon className="h-5 w-5" />
  </Button>
</Tooltip>`}
            />
            <TableActionPreview
              icon={<KeyIcon className="h-5 w-5" />}
              label="Reset Password"
              color="warning"
              tooltipContent="Reset Password"
              className="bg-amber-200/80"
              code={`<Tooltip content="Reset Password" color="warning">
  <Button
    isIconOnly
    size="sm"
    variant="flat"
    color="warning"
    onPress={() => onResetPassword?.(item)}
    className="hover:scale-105 transition-transform bg-amber-200/80"
  >
    <KeyIcon className="h-5 w-5" />
  </Button>
</Tooltip>`}
            />
          </div>
        </section>

        {/* 8. Icon Library */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
            8. Icon Library (Heroicons v2)
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Aplikasi menggunakan{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
              @heroicons/react
            </code>{" "}
            v2. Tersedia dalam 2 varian: <strong>outline</strong> (24x24) dan{" "}
            <strong>solid</strong> (24x24, 20x20).
          </p>

          <div className="space-y-8">
            {/* Outline Icons */}
            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-[10px]">
                  @heroicons/react/24/outline
                </span>
                Common Icons
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <IconPreview
                  icon={<PencilIcon className="w-6 h-6" />}
                  name="PencilIcon"
                />
                <IconPreview
                  icon={<TrashIcon className="w-6 h-6" />}
                  name="TrashIcon"
                />
                <IconPreview
                  icon={<KeyIcon className="w-6 h-6" />}
                  name="KeyIcon"
                />
                <IconPreview
                  icon={<PlusIcon className="w-6 h-6" />}
                  name="PlusIcon"
                />
                <IconPreview
                  icon={<MagnifyingGlassIcon className="w-6 h-6" />}
                  name="MagnifyingGlassIcon"
                />
                <IconPreview
                  icon={<XMarkIcon className="w-6 h-6" />}
                  name="XMarkIcon"
                />
                <IconPreview
                  icon={<HomeIcon className="w-6 h-6" />}
                  name="HomeIcon"
                />
                <IconPreview
                  icon={<UserCircleIcon className="w-6 h-6" />}
                  name="UserCircleIcon"
                />
                <IconPreview
                  icon={<CalendarIcon className="w-6 h-6" />}
                  name="CalendarIcon"
                />
                <IconPreview
                  icon={<DocumentTextIcon className="w-6 h-6" />}
                  name="DocumentTextIcon"
                />
                <IconPreview
                  icon={<ClipboardDocumentCheckIcon className="w-6 h-6" />}
                  name="ClipboardDocumentCheckIcon"
                />
                <IconPreview
                  icon={<ArrowLeftIcon className="w-6 h-6" />}
                  name="ArrowLeftIcon"
                />
              </div>
            </div>

            {/* Solid Icons */}
            <div>
              <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-[10px]">
                  @heroicons/react/24/solid
                </span>
                Common Icons solid
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <IconPreview
                  icon={
                    <InboxStackIconSolid className="w-6 h-6 text-primary/90" />
                  }
                  name="InboxStackIconSolid"
                  variant="solid"
                />
                <IconPreview
                  icon={<HomeIconSolid className="w-6 h-6 text-primary/90" />}
                  name="HomeIconSolid"
                  variant="solid"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800">
                <strong>Import Example:</strong>
              </p>
              <code className="block mt-2 text-[11px] bg-white p-3 rounded border border-blue-100 text-gray-800">
                {`import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";`}
                <br />
                {`import { ArrowLeftIcon } from "@heroicons/react/24/solid";`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// === HELPER COMPONENTS ===

function ColorCard({
  name,
  hex,
  variable,
  bgClass,
  textClass,
  description,
}: {
  name: string;
  hex: string;
  variable: string;
  bgClass: string;
  textClass: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      isPressable
      onPress={handleCopy}
      className="shadow-sm border border-gray-100 hover:shadow-md transition-all group relative"
    >
      <CardBody className="p-0">
        <div
          className={`h-28 w-full ${bgClass} flex items-center justify-center relative`}
        >
          {/* Hover overlay hint */}
          <div className="absolute top-20 inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
              {copied ? "Copied!" : "Click to Copy HEX"}
            </span>
          </div>
          <span
            className={`font-mono text-lg font-bold ${textClass} opacity-90`}
          >
            {hex}
          </span>
        </div>
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-1">
            <p className="font-bold text-gray-900 text-base">{name}</p>
            {copied ? (
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
            )}
          </div>
          <p className="text-xs text-gray-500 font-mono bg-gray-50 p-1 rounded inline-block mb-2">
            {variable}
          </p>
          {description && (
            <p className="text-xs text-gray-500 leading-relaxed border-t pt-2 mt-1">
              {description}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

function VariantPreview({
  name,
  code,
  component,
  description,
}: {
  name: string;
  code: string;
  component: React.ReactNode;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm border border-gray-100 bg-white group h-full">
      <CardBody className="p-6 flex flex-col items-center">
        <div className="h-16 flex items-center justify-center transform scale-100 hover:scale-110 transition-transform duration-200">
          {component}
        </div>
        <div className="text-center w-full mt-4">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <p className="font-bold text-gray-900 text-sm">{name}</p>
            {copied ? (
              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <button onClick={handleCopy}>
                <ClipboardIcon className="w-4 h-4 text-gray-300 hover:text-indigo-500 transition-colors" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-gray-500 mb-3 h-8 line-clamp-2">
            {description}
          </p>

          <div
            className="bg-gray-50 rounded p-2 relative group/code cursor-pointer transition-colors hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100"
            onClick={handleCopy}
          >
            <code className="text-[10px] text-indigo-700 font-mono block truncate">
              {code}
            </code>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/code:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {copied ? "Berhasil Disalin!" : "Klik untuk Salin Kode"}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function ActionIconPreview({
  icon,
  label,
  colorClass,
  colorName,
  bgClass,
}: any) {
  return (
    <div className="text-center space-y-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
      <div
        className={`p-4 ${bgClass} rounded-lg inline-flex shadow-sm transform hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm text-gray-800">{label}</p>
        <p className={`text-[10px] font-mono mt-1 ${colorClass}`}>
          {colorName}
        </p>
        <div className="mt-2 text-[9px] text-gray-400 font-mono bg-gray-100 px-1 py-0.5 rounded">
          variant="flat"
        </div>
      </div>
    </div>
  );
}

function TableActionPreview({
  icon,
  label,
  color,
  tooltipContent,
  code,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  color: "primary" | "danger" | "warning";
  tooltipContent: string;
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm border border-gray-100 bg-white">
      <CardBody className="p-6">
        <div className="flex flex-col items-center gap-4">
          <Tooltip content={tooltipContent} color={color}>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color={color}
              className={`
                ${
                  color === "primary"
                    ? "text-primary hover:scale-105 transition-transform"
                    : color === "danger"
                      ? "text-danger"
                      : "hover:scale-105 transition-transform"
                }
                ${className || ""}
              `}
            >
              {icon}
            </Button>
          </Tooltip>

          <div className="text-center w-full">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              {copied ? (
                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <button onClick={handleCopy}>
                  <ClipboardIcon className="w-4 h-4 text-gray-300 hover:text-indigo-500 transition-colors" />
                </button>
              )}
            </div>

            <div
              className="bg-gray-50 rounded p-3 relative group cursor-pointer transition-colors hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100 max-h-32 overflow-y-auto"
              onClick={handleCopy}
            >
              <pre className="text-[9px] text-indigo-700 font-mono text-left whitespace-pre-wrap">
                {code}
              </pre>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                {copied ? "Berhasil Disalin!" : "Klik untuk Salin Kode"}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function IconPreview({
  icon,
  name,
  variant = "outline",
}: {
  icon: React.ReactNode;
  name: string;
  variant?: "outline" | "solid";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const importPath =
      variant === "solid"
        ? `import { ${name} } from "@heroicons/react/24/solid";`
        : `import { ${name} } from "@heroicons/react/24/outline";`;
    navigator.clipboard.writeText(importPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      isPressable
      onPress={handleCopy}
      className="p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className={`p-3 rounded-lg ${variant === "solid" ? "bg-purple-50" : "bg-indigo-50"} group-hover:scale-110 transition-transform`}
        >
          <div className="text-gray-700">{icon}</div>
        </div>
        <div className="w-full">
          <p className="text-[10px] font-mono text-gray-700 mb-1 truncate font-semibold">
            {name}
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-gray-400">
            {copied ? (
              <>
                <ClipboardDocumentCheckIcon className="w-3 h-3 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="w-3 h-3" />
                <span>Click to copy</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SidebarStateCard({
  title,
  bgColor,
  textColor,
  iconColor,
  borderColor,
  code,
  description,
}: {
  title: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  code: string;
  description: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      isPressable
      onPress={handleCopy}
      className="shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <CardBody className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-gray-900">{title}</h3>
            {copied ? (
              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4 text-gray-300" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded ${bgColor} ${borderColor} border-l-4 flex items-center justify-center`}
            >
              <HomeIcon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <span
              className={`text-xs ${textColor === "text-neutral-100" ? "text-gray-700" : textColor}`}
            >
              Preview
            </span>
          </div>

          <p className="text-[10px] text-gray-500 leading-relaxed">
            {description}
          </p>

          <div className="bg-gray-50 rounded p-2 border border-gray-100">
            <code className="text-[9px] text-indigo-700 font-mono block break-all">
              {code}
            </code>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
