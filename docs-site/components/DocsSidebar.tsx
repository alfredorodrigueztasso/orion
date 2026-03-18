'use client';

import { usePathname } from 'next/navigation';
import { Home, BookOpen, Download, Palette, Terminal, Layers, Grid3x3, Layout, FileText } from 'lucide-react';
import { Sidebar } from '@/components/ClientComponents';
import type { SidebarSection } from '@orion-ds/react';

const sections: SidebarSection[] = [
  {
    items: [
      { id: 'home', label: 'Home', href: '/', icon: <Home size={18} /> },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction', href: '/docs/getting-started', icon: <BookOpen size={18} /> },
      { id: 'installation', label: 'Installation', href: '/docs/installation', icon: <Download size={18} /> },
      { id: 'theming', label: 'Theming', href: '/docs/theming', icon: <Palette size={18} /> },
      { id: 'cli', label: 'CLI', href: '/docs/cli', icon: <Terminal size={18} /> },
      { id: 'tokens', label: 'Tokens', href: '/docs/tokens', icon: <Layers size={18} /> },
    ],
  },
  {
    title: 'Library',
    items: [
      { id: 'components', label: 'Components', href: '/components', icon: <Grid3x3 size={18} /> },
      { id: 'sections', label: 'Sections', href: '/sections', icon: <Layout size={18} /> },
      { id: 'templates', label: 'Templates', href: '/templates', icon: <FileText size={18} /> },
    ],
  },
];

function getActiveItem(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname === '/docs/getting-started') return 'introduction';
  if (pathname === '/docs/installation') return 'installation';
  if (pathname === '/docs/theming') return 'theming';
  if (pathname === '/docs/cli') return 'cli';
  if (pathname === '/docs/tokens') return 'tokens';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/templates')) return 'templates';
  return '';
}

export function DocsSidebar() {
  const pathname = usePathname();

  // Hide sidebar on homepage (full-width Hero)
  if (pathname === '/') return null;

  const activeItem = getActiveItem(pathname ?? '');

  return (
    <Sidebar
      sections={sections}
      activeItem={activeItem}
      width={256}
      style={{ height: 'calc(100vh - 64px)' }}
    />
  );
}
