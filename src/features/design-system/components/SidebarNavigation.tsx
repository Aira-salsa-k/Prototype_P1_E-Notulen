"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

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
      className={`border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden ${bgColor}`}
    >
      <CardBody className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${textColor}`}>
            <div
              className={`p-2 rounded bg-white/10 ${borderColor} border-l-2`}
            >
              <HomeIcon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <p className="font-bold text-sm">{title}</p>
              <p className="text-[10px] opacity-80 font-mono mt-0.5">{code}</p>
            </div>
          </div>
          {copied ? (
            <ClipboardDocumentCheckIcon className={`w-5 h-5 ${textColor}`} />
          ) : (
            <ClipboardIcon
              className={`w-4 h-4 ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
          )}
        </div>
        <div className="bg-white p-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}

export const SidebarNavigation = () => {
  return (
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
  );
};
