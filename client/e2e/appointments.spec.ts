import { test, expect } from '@playwright/test';

test('user can signup, create and delete appointment', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: "Don't have an account?" }).click();
  await page.getByPlaceholder('Enter first name').click();
  await page.getByPlaceholder('Enter first name').fill('User');
  await page.getByPlaceholder('Enter last name').click();
  await page.getByPlaceholder('Enter last name').fill('User');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('user@user.com');
  await page.getByPlaceholder('Enter password', { exact: true }).click();
  await page.getByPlaceholder('Enter password', { exact: true }).fill('User1234');
  await page.getByPlaceholder('Enter password again').click();
  await page.getByPlaceholder('Enter password again').fill('User1234');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('button', { name: 'Book an appointment' }).click();
  await page.getByPlaceholder('yyyy-MM-dd').click();

  const validDate = getNextValidDate();

  await page.getByPlaceholder('yyyy-MM-dd').fill(validDate);
  await page.getByPlaceholder('yyyy-MM-dd').press('Enter');
  await page.getByLabel('Classic Facial').check();
  await page.getByText('Meet Mikey Mike, our cosmic').click();
  await page.getByRole('button', { name: 'Select Time' }).click();
  await page.getByRole('button', { name: '09:30:' }).click();
  await page.getByRole('button', { name: 'Book Appointment' }).click();

  // Expect that appointment is created
  await expect(page.getByText('Appointment on')).toBeVisible();

  await page.getByRole('main').locator('path').nth(1).click();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Expect that appointment is deleted
  await expect(page.getByText('Appointment successfully')).toBeVisible();
});

// Off days can be changed in the database
// We are seeding our db so that the off days are
// Saturday and Sunday
// To keep this simple this function will return
// first valid date
function getNextValidDate(): string {
  const currentDate = new Date();
  const nextDate = new Date(currentDate);

  // Check if it's Saturday or Sunday
  if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
    // If it's Saturday or Sunday, find the next weekday
    while (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
  } else {
    // If it's a weekday, find the next date that is not Saturday or Sunday
    nextDate.setDate(nextDate.getDate() + 1);
  }

  // Return the next valid date in yyyy-mm-dd format
  return nextDate.toISOString().split('T')[0];
}
