import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

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

export const ColorPalette = () => {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">1. Color Palette</h2>
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
    </div>
  );
};
