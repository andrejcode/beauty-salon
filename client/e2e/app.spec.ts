import { test, expect } from '@playwright/test';

test('visit the home page', async ({ page }) => {
  await page.goto('/');
  expect(
    page.getByRole('heading', { name: 'Welcome to the Beauty Salon' }),
  ).toBeTruthy();
});
