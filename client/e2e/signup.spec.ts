import { test } from '@playwright/test';

test('user can signup', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Book an Appointment' }).first().click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();
  await page.getByPlaceholder('Enter your first name').click();
  await page.getByPlaceholder('Enter your first name').fill('Test');
  await page.getByPlaceholder('Enter your first name').press('Tab');
  await page.getByPlaceholder('Enter your last name').fill('User');
  await page.getByPlaceholder('Enter your last name').press('Tab');
  await page.getByPlaceholder('Enter your email address').fill('test@test.com');
  await page.getByPlaceholder('Enter your email address').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('Test1234');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByPlaceholder('Confirm your password').fill('Test1234');
  await page.getByRole('button', { name: 'Signup' }).click();
});
