'use client';

import { LogoCloud } from '@/components/ClientComponents';

const ReactLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="2.5" fill="#61DAFB" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 14 14)" />
    <ellipse cx="14" cy="14" rx="13" ry="5.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 14 14)" />
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
    <rect width="28" height="28" rx="3" fill="#3178C6" />
    <path d="M6 15.5h4.5v-1.5H6V12h6v7h-2v-2H6v-1.5zM15 12h2v4c0 1.1.5 1.5 1.5 1.5s1.5-.4 1.5-1.5V12h2v4c0 2.2-1.3 3-3.5 3S15 18.2 15 16v-4z" fill="white" />
  </svg>
);

const ViteLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4L15 24l-2-4L25 4h1zM13 20L5 6l1-.5 9 16-2-1.5z" fill="#646CFF" />
    <path d="M13 20L2 4h11l-2 4-6 12h-2z" fill="#BD34FE" opacity="0.8" />
  </svg>
);

const MCPLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#CC785C" />
    <path d="M7 10h14M7 14h10M7 18h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RemixLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" fill="currentColor" />
    <path d="M10 18v-4h4c1.7 0 2-1 2-2s-.3-2-2-2h-5v8h1z" fill="white" />
    <path d="M14 14h2l2 4h-2l-2-4z" fill="white" opacity="0.7" />
  </svg>
);

const logos = [
  { logo: <ReactLogo />, name: 'React' },
  { logo: <NextjsLogo />, name: 'Next.js' },
  { logo: <TypeScriptLogo />, name: 'TypeScript' },
  { logo: <ViteLogo />, name: 'Vite' },
  { logo: <MCPLogo />, name: 'MCP / Claude' },
  { logo: <RemixLogo />, name: 'Remix' },
];

export default function HomepageLogoCloud() {
  return (
    <LogoCloud
      eyebrow="Compatible with"
      title="Works with your entire stack"
      logos={logos}
      layout="inline"
      grayscale={true}
      background="subtle"
      centered={true}
    />
  );
}
