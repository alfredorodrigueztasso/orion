'use client';

import CopyButton from './CopyButton';
import styles from './CodeBlockSimple.module.css';

interface CodeBlockSimpleProps {
  code: string;
  language?: string;
}

export default function CodeBlockSimple({ code }: CodeBlockSimpleProps) {
  return (
    <div className={styles.wrapper} style={{ position: 'relative' }}>
      <CopyButton code={code} />
      <pre
        style={{
          background: 'var(--surface-sunken)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-control)',
          border: '1px solid var(--border-subtle)',
          overflow: 'auto',
          fontSize: '0.9rem',
          lineHeight: '1.5',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
