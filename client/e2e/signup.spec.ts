import { test, expect, Page } from '@playwright/test';

test('signup', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();
  await page.getByPlaceholder('Enter first name').click();
  await page.getByPlaceholder('Enter first name').fill('Test');
  await page.getByPlaceholder('Enter last name').click();
  await page.getByPlaceholder('Enter last name').fill('Test');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('test@test.com');
  await page.getByPlaceholder('Enter password', { exact: true }).click();
  await page.getByPlaceholder('Enter password', { exact: true }).fill('Test1234');
  await page.getByPlaceholder('Enter password again').click();
  await page.getByPlaceholder('Enter password again').fill('Test1234');
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.locator('#basic-nav-dropdown')).toBeVisible();
});

test('cannot signup with same email twice', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();

  await fillInSignupForm(page);

  await page.locator('#basic-nav-dropdown').click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();

  await fillInSignupForm(page);

  await expect(page.getByText('User with this email already')).toBeVisible();
});

async function fillInSignupForm(page: Page) {
  await page.getByPlaceholder('Enter first name').click();
  await page.getByPlaceholder('Enter first name').fill('Test');
  await page.getByPlaceholder('Enter last name').click();
  await page.getByPlaceholder('Enter last name').fill('Test');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('test@test.com');
  await page.getByPlaceholder('Enter password', { exact: true }).click();
  await page.getByPlaceholder('Enter password', { exact: true }).fill('Test1234');
  await page.getByPlaceholder('Enter password again').click();
  await page.getByPlaceholder('Enter password again').fill('Test1234');
  await page.getByRole('button', { name: 'Signup' }).click();
}
