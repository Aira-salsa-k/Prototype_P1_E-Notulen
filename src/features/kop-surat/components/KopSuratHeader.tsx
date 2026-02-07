"use client";

import React from "react";
import { useKopSuratStore } from "../store/useKopSuratStore";

interface KopSuratHeaderProps {
  className?: string;
  /**
   * Use simplified styling for preview vs strict absolute positioning for print
   */
  /* Custom class for the text/logo container */
  contentClassName?: string;
  /* Custom class for the separator line container */
  lineClassName?: string;
  /* Custom class for the logo container */
  logoClassName?: string;
  /* Custom class for the img element */
  imgClassName?: string;
  mode?: "print" | "preview";
}

export const KopSuratHeader = ({
  className = "",
  mode = "print",
  contentClassName = "",
  lineClassName = "",
  logoClassName = "",
  imgClassName = "",
}: KopSuratHeaderProps) => {
  const { config } = useKopSuratStore();

  const fullAddress = `${config.address} Telp/E-Mail : ${config.phone || "..."}/${config.email || "..."} ${config.districtName ? config.districtName.split(" ").slice(-1)[0] : ""}- Papua Kode Pos ${config.postalCode}`;

  return (
    <div className={`font-arimo text-black w-full ${className}`}>
      {/* Header Container */}
      {/* Header Container */}
      <div
        className={`grid grid-cols-[110px_1fr_110px] items-center border-black pb-1 mb-0 min-h-[50px] ${contentClassName}`}
      >
        {/* LOGO */}
        <div className={`flex items-center justify-center ${logoClassName}`}>
          <img
            src={config.logoUrl}
            className={`w-20 h-20 print:w-[110px] print:h-[110px] object-contain ${imgClassName}`}
            alt="Logo Instansi"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="text-center w-full">
          <h1
            style={{
              fontFamily: '"Book Antiqua", serif',
              fontSize: "15.5pt",
            }}
            className="font-bold uppercase leading-tight tracking-wide text-black"
          >
            {config.institutionName}
            <br />
            {config.districtName}
          </h1>
          <p
            style={{ fontFamily: '"Book Antiqua", serif', fontSize: "10.5pt" }}
            className="mt-1 print:mt-0 print:-mt-1 text-black leading-tight"
          >
            {fullAddress}
          </p>
        </div>

        {/* Spacer for centering */}
        <div />
      </div>

      {/* DOUBLE LINE Separator */}
      <div className={`mb-4 print:mb-6 print:-mt-3 ${lineClassName}`}>
        <div className="border-b-[3px] border-black"></div>
        <div className="border-b-[1px] border-black mt-[2px]"></div>
      </div>
    </div>
  );
};
