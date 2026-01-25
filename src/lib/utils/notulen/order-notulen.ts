import { NotulenSection, NotulenPoint } from "../../../types";
// Helper function untuk mengurutkan sections berdasarkan order
function sortSectionsByOrder(sections: NotulenSection[]): NotulenSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

// Helper function untuk mengurutkan points dalam section
function sortPointsByOrder(points: NotulenPoint[]): NotulenPoint[] {
  return [...points].sort((a, b) => a.order - b.order);
}

// Contoh penggunaan di komponen/PDF generator
export function generatePDFContent(sections: NotulenSection[]): string {
  // Urutkan sections berdasarkan order
  const sortedSections = sortSectionsByOrder(sections);

  let pdfContent = "";

  sortedSections.forEach((section) => {
    // Tambahkan header section (nama dan jabatan)
    pdfContent += `${section.displayFormat}\n\n`;

    // Urutkan points dalam section
    const sortedPoints = sortPointsByOrder(section.points);

    // Tambahkan points dengan bullet points
    sortedPoints.forEach((point) => {
      pdfContent += `- ${point.content}\n`;
    });

    // Tambahkan baris kosong antar section
    pdfContent += "\n\n";
  });

  return pdfContent;
}

/**
 * Menghasilkan order baru untuk section (auto-increment)
 */
export function generateNewSectionOrder(
  existingSections: NotulenSection[],
): number {
  if (existingSections.length === 0) return 1;

  const maxOrder = Math.max(...existingSections.map((s) => s.order));
  return maxOrder + 1;
}

/**
 * Menghasilkan order baru untuk point dalam section
 */
export function generateNewPointOrder(existingPoints: NotulenPoint[]): number {
  if (existingPoints.length === 0) return 1;

  const maxOrder = Math.max(...existingPoints.map((p) => p.order));
  return maxOrder + 1;
}

/**
 * Mengatur ulang order jika ada yang dihapus
 */
export function reorderSectionsAfterDelete(
  sections: NotulenSection[],
  deletedOrder: number,
): NotulenSection[] {
  return sections.map((section) => {
    if (section.order > deletedOrder) {
      return { ...section, order: section.order - 1 };
    }
    return section;
  });
}
