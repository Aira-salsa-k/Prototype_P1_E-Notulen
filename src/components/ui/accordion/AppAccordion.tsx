"use client";

import {
  Accordion as HeroAccordion,
  AccordionItem,
  AccordionProps,
} from "@heroui/accordion";
import { cn } from "@/lib/utils";

interface AppAccordionProps extends Omit<AccordionProps, "children"> {
  items: any[];
  renderItem: (item: any) => {
    key: string;
    title: React.ReactNode;
    content: React.ReactNode;
    subtitle?: React.ReactNode;
    startContent?: React.ReactNode;
  };
  classNames?: any;
}

export const AppAccordion = ({
  items,
  renderItem,
  className,
  classNames,
  ...props
}: AppAccordionProps) => {
  return (
    <HeroAccordion
      variant="splitted"
      selectionMode="multiple"
      className={cn("px-0", className)}
      {...props}
    >
      {items.map((item) => {
        const { key, title, content, subtitle, startContent } =
          renderItem(item);
        return (
          <AccordionItem
            key={key}
            aria-label={typeof title === "string" ? title : key}
            title={title}
            subtitle={subtitle}
            startContent={startContent}
            classNames={{
              base: "border border-gray-100 shadow-sm rounded-2xl mb-4 overflow-hidden bg-white",
              trigger: "px-6 py-5 hover:bg-gray-50/50 transition-colors",
              content: "px-6 pb-6 pt-2 text-gray-700",
              title: "text-lg font-semibold text-gray-900",
              subtitle: "text-gray-500",
              ...classNames,
            }}
          >
            {content}
          </AccordionItem>
        );
      })}
    </HeroAccordion>
  );
};
