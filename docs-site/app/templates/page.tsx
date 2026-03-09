import { getAllTemplates, getCategoriesByType } from '@/lib/registry';
import TemplateCardGrid from '@/components/TemplateCardGrid';

export const metadata = {
  title: 'Templates',
  description: 'Complete page templates for common use cases',
};

export default async function TemplatesListPage() {
  const templates = await getAllTemplates();
  const categories = getCategoriesByType('registry:template');

  return (
    <div style={{ padding: 'var(--spacing-8)' }}>
      <TemplateCardGrid templates={templates} categories={categories} />
    </div>
  );
}
