import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { DocsNavbar } from '@/components/DocsNavbar';
import { DocsSidebar } from '@/components/DocsSidebar';
import { MainWrapper } from '@/components/MainWrapper';
import '@orion-ds/react/styles.css';
import '@orion-ds/blocks/styles.css';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Orion Design System',
    template: '%s | Orion Design System',
  },
  description: 'AI-first design system for beautiful, consistent interfaces built on the Chain of Truth principle',
  keywords: [
    'design system',
    'react',
    'components',
    'ui',
    'typescript',
    'ai-first',
    'orion',
  ],
  authors: [
    {
      name: 'Orion Design System',
    },
  ],
  creator: 'Orion Design System',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orion-ds.dev',
    title: 'Orion Design System',
    description: 'AI-first design system for beautiful, consistent interfaces',
    siteName: 'Orion Design System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orion Design System',
    description: 'AI-first design system for beautiful, consistent interfaces',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light" data-brand="orion" data-mode="display">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Work+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&family=Anton&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('orion-theme'),b=localStorage.getItem('orion-brand'),el=document.documentElement,themes=['light','dark'],brands=['orion','red','deepblue','orange','ember','lemon'];if(t&&themes.includes(t))el.setAttribute('data-theme',t);if(b&&brands.includes(b))el.setAttribute('data-brand',b)}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Providers>
          <DocsNavbar />
          <div style={{ display: 'flex' }}>
            <DocsSidebar />
            <MainWrapper>{children}</MainWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
