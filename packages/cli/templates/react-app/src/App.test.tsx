import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
  });

  it('renders buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has links to documentation', () => {
    render(<App />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
