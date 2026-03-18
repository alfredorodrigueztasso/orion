import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSections, getItemByName } from '@/lib/registry';
import { Badge } from '@/components/ClientComponents';
import DocsPageHeader from '@/components/DocsPageHeader';
import SectionDetail from '@/components/SectionDetail';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const sections = await getAllSections();
  return sections.map((section) => ({
    name: section.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const section = await getItemByName(resolvedParams.name);

  if (!section) {
    return {
      title: 'Section Not Found',
    };
  }

  return {
    title: `${section.title} Section`,
    description: section.description,
    keywords: [section.title, 'section', 'react', 'orion', section.category],
  };
}

export default async function SectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const section = await getItemByName(resolvedParams.name);

  if (!section || section.type !== 'registry:section') {
    notFound();
  }

  return (
    <div className="main-content">
      <DocsPageHeader
        title={section.title}
        description={section.description}
        badge={
          <Badge variant="secondary" size="sm">
            {section.category}
          </Badge>
        }
      />

      <SectionDetail section={section} />
    </div>
  );
}
