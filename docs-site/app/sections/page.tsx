import { getAllSections, getCategoriesByType } from '@/lib/registry';
import SectionCardGrid from '@/components/SectionCardGrid';

export const metadata = {
  title: 'Sections',
  description: 'Pre-built page sections for rapid development',
};

export default async function SectionsListPage() {
  const sections = await getAllSections();
  const categories = getCategoriesByType('registry:section');

  return (
    <div style={{ padding: 'var(--spacing-8)' }}>
      {/* SectionCardGrid handles hero, search, filters, and cards */}
      <SectionCardGrid sections={sections} categories={categories} />
    </div>
  );
}
