'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <main className={isHomepage ? 'home-content' : 'main-content'}>
      {children}
    </main>
  );
}
