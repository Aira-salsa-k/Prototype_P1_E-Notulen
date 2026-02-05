

"use client";
import { Button } from "@heroui/button";
import { extendVariants } from "@heroui/react";

export const AppButton = extendVariants(Button, {
  variants: {
    color: {
      ungu: "bg-indigo-900/89 text-indigo-50 hover:bg-indigo-800 hover:text-indigo-100 active:bg-indigo-900",

      "ungu-muda":
        "bg-indigo-200/30 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-900  active:bg-indigo-200",

      "btn-batal":
        "text-indigo-800 hover:bg-indigo-200/30 active:bg-indigo-300/70",

      kuning:
        "bg-amber-300/70 text-amber-800 hover:bg-amber-300/68 active:bg-amber-300/70 ",

      merah: "bg-red-600/80 text-white hover:bg-red-700 active:bg-red-800",

      hijau: " bg-lime-400/50 text-lime-900 active:bg-green-800 font-semibold",

      olive:
        "bg-lime-900 text-lime-200 border-lime-700 hover:bg-lime-800 active:bg-black",

      "biru-muda": "bg-sky-100 text-sky-700 hover:bg-sky-200 active:bg-sky-300",

      // Standar grayscale untuk UI neutral
      ghost: "bg-transparent hover:bg-zinc-100 text-zinc-600",
    },
    isDisabled: {
      true: "bg-zinc-200 text-zinc-400 opacity-100 cursor-not-allowed shadow-none",
    },
    size: {
      xs: "px-4 h-8 text-xs gap-1 rounded-md",
      sm: "px-4 h-10 text-sm gap-2 rounded-lg",
      md: "px-6 h-12 text-base gap-2 rounded-xl",
      lg: "px-8 h-14 text-lg gap-2 rounded-xl",
      xl: "px-10 h-16 text-xl gap-4 rounded-2xl font-bold",
    },
    fontWeight: {
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    color: "ungu",
    size: "md",
    fontWeight: "semibold",
  },
  compoundVariants: [
    // Logic khusus: Jika tombol 'olive' sedang disabled
    {
      isDisabled: true,
      color: "ungu",
      class: "bg-indigo-900/10 text-neutral-700/50 border-transparent",
    },
    // Logic khusus: Efek scale down saat diklik (hanya jika tidak disabled)
    {
      isDisabled: false,
      class: "transition-transform active:scale-95 duration-100",
    },
  ],
});
