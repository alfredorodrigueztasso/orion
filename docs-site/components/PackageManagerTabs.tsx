'use client';

import { useState, useEffect } from 'react';
import { Tabs } from '@/components/ClientComponents';
import CodeBlockSimple from './CodeBlockSimple';

type PackageManager = 'pnpm' | 'npm' | 'yarn';

interface PackageManagerTabsProps {
  packageName: string;
  noPanelPadding?: boolean;
}

const PM_KEY = 'orion-docs-pm';

const getCommand = (pm: PackageManager, pkg: string): string => {
  const commands: Record<PackageManager, (pkg: string) => string> = {
    pnpm: (p) => `pnpm add ${p}`,
    npm: (p) => `npm install ${p}`,
    yarn: (p) => `yarn add ${p}`,
  };
  return commands[pm](pkg);
};

export default function PackageManagerTabs({ packageName, noPanelPadding }: PackageManagerTabsProps) {
  const [defaultTab, setDefaultTab] = useState<PackageManager>('pnpm');
  const [mounted, setMounted] = useState(false);

  // Restore preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(PM_KEY) as PackageManager | null;
    if (saved && ['pnpm', 'npm', 'yarn'].includes(saved)) {
      setDefaultTab(saved);
    }
    setMounted(true);
  }, []);

  const handleTabChange = (tabId: string) => {
    const pm = tabId as PackageManager;
    localStorage.setItem(PM_KEY, pm);
  };

  if (!mounted) {
    // Avoid hydration mismatch
    return <CodeBlockSimple code={getCommand('pnpm', packageName)} language="bash" />;
  }

  return (
    <Tabs
      defaultTab={defaultTab}
      onChange={handleTabChange}
      noPanelPadding={noPanelPadding}
      tabs={(['pnpm', 'npm', 'yarn'] as const).map((pm) => ({
        id: pm,
        label: pm,
        content: <CodeBlockSimple code={getCommand(pm, packageName)} language="bash" />,
      }))}
    />
  );
}
