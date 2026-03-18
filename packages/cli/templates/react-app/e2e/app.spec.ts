import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/{{projectName}}/);
});

test('has heading', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h1');
  await expect(heading).toContainText('Welcome to {{projectName}}');
});

test('has buttons', async ({ page }) => {
  await page.goto('/');
  const buttons = page.locator('button');
  await expect(buttons).toHaveCount(6); // 2 main buttons + 4 badge buttons
});

test('has documentation links', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a');
  await expect(links).toHaveCount(3); // Vite, React, Orion DS docs
});
