import React from "react";
import { AppAccordion } from "@/components/ui/accordion/AppAccordion";
import { Chip } from "@heroui/chip";

export const AccordionShowcase = () => {
  const items = [
    {
      id: "1",
      title: "How do I create a new meeting?",
      description:
        "You can create a new meeting by clicking the 'New Meeting' button on the dashboard.",
      category: "Feature",
    },
    {
      id: "2",
      title: "Is there a limit on participants?",
      description:
        "No, there is no hard limit on the number of participants, but we recommend keeping it under 100 for better performance.",
      category: "Technical",
    },
    {
      id: "3",
      title: "What file formats are supported for attachments?",
      description: "We support PDF, DOCX, XLSX, and JPG/PNG files up to 10MB.",
      category: "Feature",
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        10. Accordion
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Component <code>AppAccordion</code> dirancang untuk menampilkan data
        list yang bisa di-expand/collapse dengan styling enterprise.
      </p>

      <div className="space-y-8">
        <AppAccordion
          items={items}
          renderItem={(item) => ({
            key: item.id,
            title: (
              <div className="flex items-center gap-3">
                <span className="font-bold">{item.title}</span>
                <Chip
                  size="sm"
                  variant="flat"
                  color={item.category === "Technical" ? "warning" : "primary"}
                >
                  {item.category}
                </Chip>
              </div>
            ),
            content: (
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            ),
          })}
        />

        <div className="bg-gray-800 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
          <p className="text-gray-400 mb-2">// Managed Accordion Usage</p>
          <pre>{`<AppAccordion
  items={data}
  renderItem={(item) => ({
    key: item.id,
    title: <TitleComponent data={item} />,
    content: <ContentComponent data={item} />
  })}
/>`}</pre>
        </div>
      </div>
    </section>
  );
};
