'use client';

import { LogoCloud } from '@/components/ClientComponents';

const ClaudeCodeLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="currentColor" />
    <path d="M8 10L14 16L20 10M8 18L14 12L20 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CursorLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L22 14L15 15L14 22L6 4Z" fill="currentColor" />
  </svg>
);

const ClineLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="12" fill="currentColor" />
    <path d="M10 14H18M14 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ContinueLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14L20 8V20L8 14Z" fill="currentColor" />
  </svg>
);

const ReactLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="2.5" fill="currentColor" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 14 14)" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 14 14)" />
  </svg>
);

const NextjsLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="currentColor" />
    <path d="M8 20L17.5 9h-2L8 17.5V20z" fill="white" />
    <path d="M16 9h2v7.5L16 9z" fill="white" />
    <path d="M18 16.5L20 19v-2l-2-2.5v2z" fill="white" opacity="0.5" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="3" fill="currentColor" />
    <path d="M6 15.5h4.5v-1.5H6V12h6v7h-2v-2H6v-1.5zM15 12h2v4c0 1.1.5 1.5 1.5 1.5s1.5-.4 1.5-1.5V12h2v4c0 2.2-1.3 3-3.5 3S15 18.2 15 16v-4z" fill="white" />
  </svg>
);

const logos = [
  { logo: <ClaudeCodeLogo />, name: 'Claude Code' },
  { logo: <CursorLogo />, name: 'Cursor' },
  { logo: <ClineLogo />, name: 'Cline' },
  { logo: <ContinueLogo />, name: 'Continue' },
  { logo: <ReactLogo />, name: 'React' },
  { logo: <NextjsLogo />, name: 'Next.js' },
  { logo: <TypeScriptLogo />, name: 'TypeScript' },
];

export default function HomepageLogoCloud() {
  return (
    <LogoCloud
      eyebrow="Built for AI-native workflows"
      title="Your AI agent can use Orion directly"
      logos={logos}
      layout="inline"
      grayscale={true}
      background="subtle"
      centered={true}
    />
  );
}
