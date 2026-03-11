import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllComponents, getItemByName } from '@/lib/registry';
import { PageHeader, Badge } from '@/components/ClientComponents';
import ComponentDetail from '@/components/ComponentDetail';

interface PageProps {
  params: Promise<{ name: string }>;
}

// ✨ Generate static pages for all components at build time
export async function generateStaticParams() {
  const components = await getAllComponents();
  return components.map((component) => ({
    name: component.name,
  }));
}

// 🎯 Generate SEO metadata for each component
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const component = await getItemByName(resolvedParams.name);

  if (!component) {
    return {
      title: 'Component Not Found',
    };
  }

  return {
    title: `${component.title} Component`,
    description: component.description,
    keywords: [component.title, 'component', 'react', 'orion', component.category],
    openGraph: {
      title: `${component.title} - Orion Components`,
      description: component.description,
      url: `/components/${component.name}`,
    },
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const component = await getItemByName(resolvedParams.name);

  if (!component || component.type !== 'registry:component') {
    notFound();
  }

  return (
    <div className="main-content">
      {/* Header */}
      <PageHeader
        size="lg"
        title={component.title}
        description={component.description}
        badge={
          <>
            <Badge variant="secondary" size="sm">
              {component.category}
            </Badge>
            {component.modeAware && (
              <Badge variant="info" size="sm">
                Mode Aware
              </Badge>
            )}
          </>
        }
      />

      {/* Client component handles all compound components */}
      <ComponentDetail component={component} />
    </div>
  );
}
