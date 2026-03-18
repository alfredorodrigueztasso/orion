import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllTemplates, getItemByName } from '@/lib/registry';
import { Badge } from '@/components/ClientComponents';
import DocsPageHeader from '@/components/DocsPageHeader';
import TemplateDetail from '@/components/TemplateDetail';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const templates = await getAllTemplates();
  return templates.map((template) => ({
    name: template.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const template = await getItemByName(resolvedParams.name);

  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  return {
    title: `${template.title} Template`,
    description: template.description,
    keywords: [template.title, 'template', 'react', 'orion', template.category],
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const resolvedParams = await params;
  const template = await getItemByName(resolvedParams.name);

  if (!template || template.type !== 'registry:template') {
    notFound();
  }

  return (
    <div className="main-content">
      <DocsPageHeader
        title={template.title}
        description={template.description}
        badge={
          <Badge variant="secondary" size="sm">
            {template.category}
          </Badge>
        }
      />

      <TemplateDetail template={template} />
    </div>
  );
}
