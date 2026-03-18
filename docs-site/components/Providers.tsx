'use client';

import { ThemeProvider } from '@orion-ds/react';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider disableCSSWarnings disableAutoFontLoading>
      {children}
    </ThemeProvider>
  );
}
