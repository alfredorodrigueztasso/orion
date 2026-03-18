'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      style={{
        position: 'absolute',
        top: 'var(--spacing-3)',
        right: 'var(--spacing-3)',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-layer)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        transition: 'all 0.2s',
        zIndex: 10,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--surface-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--surface-layer)';
      }}
    >
      {copied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy
        </>
      )}
    </button>
  );
}
