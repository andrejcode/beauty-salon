import { test, expect } from '@playwright/test';

test('admin can login and view upcoming appointments', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin@admin.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('Admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: 'Upcoming Appointments' })).toBeVisible();
});
