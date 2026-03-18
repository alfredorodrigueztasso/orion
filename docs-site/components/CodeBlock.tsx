import { createHighlighter, type Highlighter } from 'shiki';
import CopyButton from './CopyButton';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Singleton: initialize Shiki once per process, reuse across requests
let _highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!_highlighter) {
    _highlighter = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['tsx', 'typescript', 'javascript', 'bash', 'json', 'css', 'html'],
    });
  }
  return _highlighter;
}

export default async function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  let highlightedHtml = '';

  try {
    const hl = await getHighlighter();
    highlightedHtml = hl.codeToHtml(code, {
      lang: language,
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false,
    });
  } catch (error) {
    console.warn(`Failed to highlight code for language ${language}:`, error);
    // Fallback to plain text
    highlightedHtml = `<pre style="background: var(--surface-sunken); padding: var(--spacing-4); border-radius: var(--radius-control); border: 1px solid var(--border-subtle);"><code style="font-family: var(--font-mono); color: var(--text-primary);">${escapeHtml(code)}</code></pre>`;
  }

  return (
    <div className={styles.wrapper} style={{ position: 'relative' }}>
      <CopyButton code={code} />
      <div
        style={{
          borderRadius: 'var(--radius-control)',
          overflow: 'auto',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.9rem',
          lineHeight: '1.5',
        }}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
