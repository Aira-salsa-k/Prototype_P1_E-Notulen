import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  PencilIcon,
  TrashIcon,
  KeyIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  HomeIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  InboxStackIcon as InboxStackIconSolid,
} from "@heroicons/react/24/solid";

function IconPreview({
  icon,
  name,
  variant = "outline",
}: {
  icon: React.ReactNode;
  name: string;
  variant?: "outline" | "solid";
}) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <CardBody className="flex flex-col items-center p-4">
        <div
          className={`p-3 rounded-lg mb-3 ${variant === "outline" ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600"}`}
        >
          {icon}
        </div>
        <p className="text-xs font-mono text-gray-600 text-center break-all">
          {name}
        </p>
      </CardBody>
    </Card>
  );
}

export const IconLibrary = () => {
  return (
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
              icon={<InboxStackIconSolid className="w-6 h-6 text-primary/90" />}
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
  );
};
