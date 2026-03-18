import { getAllComponents, getCategoriesByType } from '@/lib/registry';
import ComponentsList from '@/components/ComponentsList';

export const metadata = {
  title: 'Components',
  description: 'Browse all available Orion Design System components',
};

export default async function ComponentsListPage() {
  const components = await getAllComponents();
  const categories = getCategoriesByType('registry:component');

  return (
    <div style={{ padding: 'var(--spacing-8)' }}>
      <ComponentsList
        components={components}
        categories={categories}
        title="Components"
        subtitle={`${components.length} ready-to-use React components with full TypeScript support`}
      />
    </div>
  );
}
