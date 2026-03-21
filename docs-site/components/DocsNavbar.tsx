'use client';

import { usePathname } from 'next/navigation';
import { Paintbrush, Sun, Moon, Check } from 'lucide-react';
import { Navbar, Button, Popover } from '@/components/ClientComponents';
import { useThemeContext } from '@orion-ds/react';
import Link from 'next/link';

// ─── Brand Picker ─────────────────────────────────────────────────────────────

type BrandId = 'orion' | 'red' | 'deepblue' | 'orange' | 'ember' | 'lemon';

// Brand accent colors — used only in this picker UI control, not in component styles
const BRANDS: { id: BrandId; label: string; color: string }[] = [
  { id: 'orion', label: 'Orion', color: '#1B5BFF' },
  { id: 'red', label: 'Red', color: '#D7282F' },
  { id: 'deepblue', label: 'Deep Blue', color: '#006FBA' },
  { id: 'orange', label: 'Orange', color: '#F15D22' },
  { id: 'ember', label: 'Ember', color: '#C1272D' },
  { id: 'lemon', label: 'Lemon', color: '#FBBF24' },
];

function BrandSwatch({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: color,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: active ? `2px solid ${color}` : '2px solid transparent',
        outlineOffset: '2px',
        flexShrink: 0,
      }}
    >
      {active && <Check size={10} color="white" strokeWidth={3} />}
    </button>
  );
}

function BrandPicker() {
  const { brand, setBrand } = useThemeContext();

  return (
    <Popover
      placement="bottom-end"
      showArrow={false}
      offset={6}
      trigger={
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          icon={<Paintbrush size={15} />}
          aria-label="Change brand"
        />
      }
      content={
        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            alignItems: 'center',
          }}
        >
          {BRANDS.map((b) => (
            <BrandSwatch
              key={b.id}
              label={b.label}
              color={b.color}
              active={brand === b.id}
              onClick={() => setBrand(b.id)}
            />
          ))}
        </div>
      }
    />
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
}

// ─── Nav Links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Docs', href: '/docs/getting-started', match: '/docs' },
  { label: 'Components', href: '/components', match: '/components' },
  { label: 'Sections', href: '/sections', match: '/sections' },
  { label: 'Templates', href: '/templates', match: '/templates' },
  { label: 'Pricing', href: '/pricing', match: '/pricing' },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function DocsNavbar() {
  const pathname = usePathname();

  return (
    <Navbar variant="solid" sticky bordered height="md">
      <Navbar.Brand href="/">
        <span
          style={{
            fontWeight: 700,
            fontSize: 'var(--font-size-base)',
            letterSpacing: '-0.02em',
          }}
        >
          Orion
        </span>
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-tertiary)',
            marginLeft: 'var(--spacing-1)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          DS
        </span>
      </Navbar.Brand>

      <Navbar.Nav>
        {NAV_LINKS.map((link) => (
          <Navbar.Link
            key={link.href}
            href={link.href}
            active={pathname?.startsWith(link.match) ?? false}
          >
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Nav>

      <Navbar.Actions>
        <Link href="/pricing">
          <Button variant="primary" size="sm">
            Founding Member
          </Button>
        </Link>
        <BrandPicker />
        <ThemeToggle />
        <a
          href="https://github.com/alfredorodrigueztasso/orion"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-tertiary)',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </Navbar.Actions>
    </Navbar>
  );
}
