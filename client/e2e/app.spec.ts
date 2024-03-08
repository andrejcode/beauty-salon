import { test, expect } from '@playwright/test';

test('visit the home page', async ({ page }) => {
  await page.goto('/');
  expect(page.getByRole('heading', { name: 'Welcome to the Beauty Salon' })).toBeTruthy();
});

test('navigate to the reviews', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Reviews' }).click();
  await expect(page.getByRole('button', { name: 'One Star' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Two Stars' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Three Stars' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Four Stars' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Five Stars' })).toBeVisible();
});
