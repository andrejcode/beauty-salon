import { test, expect } from '@playwright/test';

test('user can signup and create review', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();
  await page.getByPlaceholder('Enter first name').click();
  await page.getByPlaceholder('Enter first name').fill('test');
  await page.getByPlaceholder('Enter last name').click();
  await page.getByPlaceholder('Enter last name').fill('test');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('test@reviews.com');
  await page.getByPlaceholder('Enter password', { exact: true }).click();
  await page.getByPlaceholder('Enter password', { exact: true }).fill('Reviews123');
  await page.getByPlaceholder('Enter password again').click();
  await page.getByPlaceholder('Enter password again').fill('Reviews123');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.locator('#basic-nav-dropdown').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.locator('form').getByRole('img').nth(4).click();
  await page.getByPlaceholder('Enter your review').click();
  await page.getByPlaceholder('Enter your review').fill('Awesome salon');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Review successfully created.')).toBeVisible();
});
