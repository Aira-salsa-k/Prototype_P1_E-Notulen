// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { GlobalDataInitializer } from "@/components/utils/GlobalDataInitializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <GlobalDataInitializer />
    </HeroUIProvider>
  );
}
