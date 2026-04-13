"use client";

import React, { useState } from "react";
import {
  EyeIcon,
  RectangleGroupIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export const ModalInspectShowcase = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>("AppModal");
  const [fullscreen, setFullscreen] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const layers = [
    { id: "AppModal", name: "Modal Root (3xl)", type: "Root", group: "Layout" },
    { id: "ModalHeader", name: "Header Slot", type: "Slot", group: "Slots" },
    { id: "ModalBody", name: "Body Slot", type: "Slot", group: "Slots" },
    {
      id: "PreviewCard",
      name: "Preview Component",
      type: "Component",
      group: "Features",
    },
    {
      id: "FormGrid",
      name: "Form Grid (Cols:2)",
      type: "Layout",
      group: "Features",
    },
    {
      id: "Input:Name",
      name: "Field: Nama Lengkap",
      type: "Input",
      group: "Fields",
    },
    {
      id: "Input:Jabatan",
      name: "Field: Jabatan",
      type: "Input",
      group: "Fields",
    },
    {
      id: "Input:Username",
      name: "Field: Username",
      type: "Input",
      group: "Fields",
    },
    {
      id: "Input:Password",
      name: "Field: Password",
      type: "Input",
      group: "Fields",
    },
    {
      id: "Select:AKD",
      name: "Field: AKD (Multi)",
      type: "Select",
      group: "Fields",
    },
    {
      id: "Select:Status",
      name: "Field: Status",
      type: "Select",
      group: "Fields",
    },
    { id: "ModalFooter", name: "Footer Slot", type: "Slot", group: "Slots" },
    {
      id: "Button:Cancel",
      name: "Button: Batal",
      type: "Button",
      group: "Actions",
    },
    {
      id: "Button:Submit",
      name: "Button: Simpan",
      type: "Button",
      group: "Actions",
    },
  ];

  const inspectDetails: Record<string, any> = {
    AppModal: {
      title: "AppModal Wrapper",
      desc: "Komponen modal utama yang membungkus semua konten. Menggunakan size='3xl' (max-width: 48rem / 768px).",
      classes:
        "bg-background rounded-2xl shadow-2xl relative w-full mx-auto my-auto sm:my-16 max-w-3xl",
      css: {
        "max-width": "768px",
        "border-radius": "16px",
        background: "#FFFFFF",
        "box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      specs: { width: "768px", height: "auto", padding: "0" },
    },
    ModalHeader: {
      title: "Modal Header",
      desc: "Area judul modal. Menggunakan typography bold dan padding yang konsisten.",
      classes: "flex flex-col gap-1 py-4 px-6 text-2xl font-bold border-b-0",
      css: {
        padding: "24px 32px 8px 32px",
        "font-weight": "700",
        "font-size": "1.5rem (24px)",
        "line-height": "2rem (32px)",
      },
      specs: { width: "100%", height: "auto", padding: "32px 32px 8px" },
    },
    ModalBody: {
      title: "Modal Body",
      desc: "Kontainer utama konten. Layout vertikal dengan gap antar elemen.",
      classes: "flex flex-col gap-6 px-6 py-2 overflow-y-auto",
      css: {
        padding: "8px 32px",
        gap: "24px",
        display: "flex",
        "flex-direction": "column",
      },
      specs: {
        width: "100%",
        height: "auto",
        padding: "8px 32px",
        gap: "24px",
      },
    },
    PreviewCard: {
      title: "Preview Card Component",
      desc: "Komponen custom untuk preview data anggota dewan.",
      classes: "bg-gray-50 p-4 rounded-lg flex items-center gap-3",
      css: {
        background: "#F9FAFB",
        "border-radius": "8px",
        padding: "16px",
        gap: "12px",
      },
      specs: { width: "100%", height: "auto", padding: "16px", radius: "8px" },
    },
    FormGrid: {
      title: "Form Grid Layout",
      desc: "Container grid 2 kolom untuk input fields.",
      classes: "grid grid-cols-2 gap-6",
      css: {
        display: "grid",
        "grid-template-columns": "repeat(2, minmax(0, 1fr))",
        gap: "24px",
      },
      specs: { width: "100%", gap: "24px", columns: "2" },
    },
    "Input:Name": {
      title: "Input: Nama Lengkap",
      desc: "HeroUI Input component dengan label placement 'inside' (default).",
      classes: "group flex flex-col w-full",
      css: {
        height: "56px (approx)",
        "border-radius": "12px",
        background: "#F4F4F5 (default-100)",
      },
      specs: { width: "100%", height: "56px", radius: "12px" },
      props: { label: "Nama Lengkap", autoFocus: "true", required: "true" },
    },
    // ... Add more details for other inputs similarly ...
    ModalFooter: {
      title: "Modal Footer",
      desc: "Area aksi (buttons) dengan border top separator.",
      classes:
        "flex flex-row gap-2 px-6 py-4 justify-end border-t border-divider/50 mt-4",
      css: {
        padding: "24px",
        gap: "12px",
        "border-top": "1px solid rgba(0,0,0,0.1)",
        "margin-top": "16px",
      },
      specs: { width: "100%", height: "auto", padding: "24px", gap: "12px" },
    },
    "Button:Submit": {
      title: "Button: Simpan Data",
      desc: "Primary action button dengan warna custom 'ungu'.",
      classes:
        "z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium w-full sm:w-auto font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
      css: {
        background: "#4F46E5",
        color: "#FFFFFF",
        "border-radius": "12px",
        padding: "10px 16px",
        "font-weight": "600",
      },
      specs: { height: "40px", radius: "12px", padding: "0 16px" },
    },
  };

  // Helper to get current details, fallback to root
  const current = inspectDetails[selectedLayer] || inspectDetails["AppModal"];

  // Helper for highlighting logic
  const isHighlighted = (id: string) =>
    selectedLayer === id || hoveredLayer === id;

  const handleLayerClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLayer(id);
  };

  return (
    <section
      className={`transition-all duration-300 font-sans ${fullscreen ? "fixed inset-0 z-[200] bg-[#1E1E1E] p-0" : "space-y-4 pt-4"}`}
    >
      {/* --- FIGMA DEV MODE TOOLBAR --- */}
      <div
        className={`flex items-center justify-between border-b border-[#383838] bg-[#2C2C2C] px-4 h-12 ${fullscreen ? "" : "rounded-t-lg"}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#7C3AED] rounded flex items-center justify-center text-[10px] font-bold text-white">
              AF
            </div>
            <span className="text-xs font-semibold text-gray-200">
              AnggotaForm.modal
            </span>
          </div>

          <div className="h-4 w-px bg-[#444]" />

          {/* Mode Switcher */}
          <div className="flex bg-[#1E1E1E] p-0.5 rounded-lg border border-[#383838]">
            <button className="px-3 py-1 text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
              Design
            </button>
            <button className="px-3 py-1 bg-[#363636] text-[#A78BFA] text-[10px] font-bold rounded flex items-center gap-1.5 shadow-sm border border-[#444]">
              <CodeBracketIcon className="w-3 h-3" />
              Dev Mode
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[10px] text-gray-400 font-mono">100%</div>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-1.5 hover:bg-[#363636] rounded text-gray-400 transition-all"
          >
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div
        className={`grid grid-cols-[240px_1fr_280px] bg-[#1E1E1E] ${fullscreen ? "h-[calc(100vh-48px)]" : "h-[800px] border-x border-b border-[#383838] rounded-b-lg overflow-hidden"}`}
      >
        {/* === LEFT: LAYERS PROPER === */}
        <div className="border-r border-[#383838] bg-[#2C2C2C] flex flex-col">
          <div className="p-3 border-b border-[#383838] flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Layers
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`w-full px-3 py-1.5 rounded cursor-pointer flex items-center gap-2 group transition-all ${
                  selectedLayer === layer.id
                    ? "bg-[#7C3AED] text-white"
                    : "text-gray-400 hover:bg-[#383838] hover:text-gray-200"
                }`}
              >
                <span className="opacity-70">
                  {layer.type === "Root" && (
                    <RectangleGroupIcon className="w-3 h-3" />
                  )}
                  {layer.type === "Slot" && <SwatchIcon className="w-3 h-3" />}
                  {layer.type === "Component" && (
                    <RectangleGroupIcon className="w-3 h-3" />
                  )}
                  {layer.type === "Field" && (
                    <CodeBracketIcon className="w-3 h-3" />
                  )}
                </span>
                <span className="text-[11px] truncate flex-1 font-medium">
                  {layer.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* === CENTER: CANVAS (High Fidelity) === */}
        <div className="bg-[#121212] relative flex items-center justify-center p-8 overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#888 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* === THE MODAL === */}
          <div
            className={`w-[768px] bg-white rounded-2xl shadow-2xl relative transition-all duration-200 ${selectedLayer === "AppModal" ? "ring-2 ring-[#7C3AED]" : ""}`}
            onClick={(e) => handleLayerClick("AppModal", e)}
          >
            {/* HEADER */}
            <div
              className={`pt-8 px-8 pb-2 cursor-pointer relative hover:bg-blue-50/10 ${selectedLayer === "ModalHeader" ? "ring-2 ring-[#7C3AED] z-10" : ""}`}
              onClick={(e) => handleLayerClick("ModalHeader", e)}
              onMouseEnter={() => setHoveredLayer("ModalHeader")}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Tambah Anggota
              </h2>

              {/* Measure: Heading Padding */}
              {isHighlighted("ModalHeader") && (
                <>
                  <div className="absolute top-0 left-0 w-full h-8 bg-red-500/10 pointer-events-none border-b border-red-500/30 flex items-center justify-center text-[9px] text-red-500 font-mono">
                    32px
                  </div>
                  <div className="absolute left-0 top-0 h-full w-8 bg-red-500/10 pointer-events-none border-r border-red-500/30 flex items-center justify-center text-[9px] text-red-500 font-mono">
                    32px
                  </div>
                </>
              )}
            </div>

            {/* BODY */}
            <div
              className={`px-8 py-2 space-y-6 cursor-pointer relative ${selectedLayer === "ModalBody" ? "ring-2 ring-[#7C3AED] z-10" : ""}`}
              onClick={(e) => handleLayerClick("ModalBody", e)}
            >
              {/* PREVIEW COMPONENT */}
              <div
                className={`bg-gray-50 p-4 rounded-lg flex items-center gap-3 relative hover:ring-1 hover:ring-blue-400 cursor-pointer ${selectedLayer === "PreviewCard" ? "ring-2 ring-[#7C3AED] z-20" : ""}`}
                onClick={(e) => handleLayerClick("PreviewCard", e)}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-lg">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    [Nama]
                  </div>
                  <div className="text-sm text-gray-600">[Jabatan] • [AKD]</div>
                </div>

                {isHighlighted("PreviewCard") && (
                  <div className="absolute inset-0 bg-blue-500/5 pointer-events-none border border-blue-500/30" />
                )}
              </div>

              {/* FORM GRID */}
              <div
                className={`grid grid-cols-2 gap-6 relative ${selectedLayer === "FormGrid" ? "ring-2 ring-[#7C3AED] p-1 -m-1 rounded-lg z-10" : ""}`}
                onClick={(e) => handleLayerClick("FormGrid", e)}
              >
                {/* Input: Nama */}
                <div
                  className={`group relative flex flex-col gap-1.5 cursor-pointer ${selectedLayer === "Input:Name" ? "ring-2 ring-[#7C3AED] rounded-xl z-20" : ""}`}
                  onClick={(e) => handleLayerClick("Input:Name", e)}
                >
                  <label className="text-xs font-medium text-gray-900">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`h-10 px-3 bg-gray-100 rounded-lg border-2 border-transparent transition-colors flex items-center text-sm ${selectedLayer === "Input:Name" ? "border-[#7C3AED]" : ""}`}
                  >
                    {/* Empty state implicitly */}
                  </div>
                </div>

                {/* Input: Jabatan */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-900">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <div className="h-10 px-3 bg-gray-100 rounded-lg flex items-center"></div>
                </div>

                {/* Input: Username (Bordered) */}
                <div className="flex flex-col gap-1.5 opacity-60">
                  <label className="text-xs font-medium text-gray-900">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="h-10 px-3 border-2 border-gray-200 rounded-lg flex items-center bg-transparent"></div>
                </div>

                {/* Input: Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-900">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="h-10 px-3 border-2 border-gray-200 bg-transparent rounded-lg flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      Masukkan password baru
                    </span>
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Select: AKD */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-900">
                    AKD <span className="text-red-500">*</span>
                  </label>
                  <div className="min-h-[44px] bg-gray-100 rounded-lg p-2 flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-blue-100 rounded-full"></div>
                    <div className="h-6 w-20 bg-green-100 rounded-full"></div>
                  </div>
                </div>

                {/* GAP Marker */}
                {isHighlighted("FormGrid") && (
                  <div className="absolute left-1/2 top-0 bottom-0 w-6 -ml-3 bg-red-500/10 pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] text-red-600 bg-white/80 px-1 rounded font-mono">
                      24px
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div
              className={`border-t border-gray-200 mt-4 p-6 flex justify-end gap-3 cursor-pointer relative ${selectedLayer === "ModalFooter" ? "ring-2 ring-[#7C3AED] z-10" : ""}`}
              onClick={(e) => handleLayerClick("ModalFooter", e)}
            >
              <button className="px-4 h-10 rounded-lg text-sm font-semibold hover:bg-gray-100 text-gray-700 transition-colors">
                Batal
              </button>
              <button
                className={`px-4 h-10 rounded-lg text-sm font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-colors relative ${selectedLayer === "Button:Submit" ? "ring-2 ring-[#7C3AED] ring-offset-2" : ""}`}
                onClick={(e) => handleLayerClick("Button:Submit", e)}
              >
                Simpan Data
              </button>

              {isHighlighted("ModalFooter") && (
                <div className="absolute inset-x-0 top-0 h-6 bg-red-500/10 flex items-center justify-center text-[9px] text-red-500 font-mono">
                  24px
                </div>
              )}
            </div>

            {/* INSPECT OVERLAY (HOVER) */}
            {hoveredLayer && hoveredLayer !== selectedLayer && (
              <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none z-50">
                Select {inspectDetails[hoveredLayer]?.title || hoveredLayer}
              </div>
            )}
          </div>
        </div>

        {/* === RIGHT: INSPECT PANEL === */}
        <div className="border-l border-[#383838] bg-[#2C2C2C] flex flex-col">
          {/* Panel Header */}
          <div className="h-10 border-b border-[#383838] flex">
            <button className="flex-1 text-[11px] font-bold text-gray-200 border-b-2 border-[#7C3AED] bg-[#333]">
              Inspect
            </button>
            <button className="flex-1 text-[11px] font-bold text-gray-500 hover:text-gray-300">
              Properties
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Selected Item Info */}
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Selection
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white">
                  {current.title}
                </h3>
                <span className="text-[9px] bg-[#7C3AED] text-white px-1.5 py-0.5 rounded font-mono">
                  {selectedLayer.split(":")[0]}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Layout / Specs */}
            {current.specs && (
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Layout
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(current.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-[#1E1E1E] rounded p-2 flex flex-col gap-1 border border-[#383838]"
                    >
                      <span className="text-[9px] text-gray-500 uppercase">
                        {key}
                      </span>
                      <span className="text-xs font-mono text-gray-200">
                        {val as string}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code / CSS */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  CSS / Code
                </span>
                <button className="text-[9px] text-[#A78BFA] hover:underline">
                  Copy
                </button>
              </div>
              <div className="bg-[#1E1E1E] rounded-md p-3 border border-[#383838] font-mono text-[10px] text-[#E5E7EB] leading-5">
                {Object.entries(current.css).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-[#F472B6]">{k}:</span>
                    <span className="text-[#60A5FA]">{v as string};</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tailwind Props */}
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tailwind Classes
              </div>
              <div className="text-[11px] text-gray-400 bg-[#1E1E1E] p-3 rounded-md border border-[#383838] leading-relaxed break-words font-mono">
                {current.classes}
              </div>
            </div>

            {/* Typography if applicable */}
            {selectedLayer.includes("Header") && (
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Typography
                </div>
                <div className="bg-[#1E1E1E] p-3 rounded-md border border-[#383838] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Font</span>{" "}
                    <span className="text-[10px] text-white">
                      Plus Jakarta Sans
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Weight</span>{" "}
                    <span className="text-[10px] text-white">Bold (700)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Size</span>{" "}
                    <span className="text-[10px] text-white">24px</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </section>
  );
};
