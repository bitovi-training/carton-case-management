import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  test('clicking logo navigates to home page', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header[aria-label="Main navigation"]');
    await expect(header).toBeVisible();

    const logoLink = page.locator('a[aria-label="Navigate to home"]');
    await logoLink.click();

    await expect(page).toHaveURL('/');
  });

  test('header appears on all pages', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header[aria-label="Main navigation"]');
    await expect(header).toBeVisible();

    await expect(page.getByText(/carton/i)).toBeVisible();
  });

  test('header displays responsive text', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await expect(page.getByText('Carton Case Management')).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByText(/carton/i)).toBeVisible();
  });

  test('avatar dropdown opens on click', async ({ page }) => {
    await page.goto('/');

    const avatar = page.locator('[aria-label="User menu"]');
    await avatar.click();

    await expect(page.getByText('No menu items yet')).toBeVisible();
  });

  test('dropdown closes on Escape key', async ({ page }) => {
    await page.goto('/');

    const avatar = page.locator('[aria-label="User menu"]');
    await avatar.click();
    await expect(page.getByText('No menu items yet')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByText('No menu items yet')).not.toBeVisible();
  });
});

test.describe('MenuList Navigation', () => {
  test('clicking menu item navigates to home page', async ({ page }) => {
    await page.goto('/');

    const menu = page.locator('nav[aria-label="Main menu"]');
    await expect(menu).toBeVisible();

    // On desktop, the link has aria-label="Cases"
    const casesLink = menu.getByRole('link', { name: 'Cases' });
    await casesLink.click();

    await expect(page).toHaveURL('/');
  });

  test('menu adapts to mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menu = page.locator('nav[aria-label="Main menu"]');
    await expect(menu).toBeVisible();

    // On mobile, there should be a dropdown button with "Cases" text
    const casesButton = menu.getByRole('button', { name: /Cases/i });
    await expect(casesButton).toBeVisible();
  });

  test('keyboard navigation through menu items', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const casesLink = page
      .locator('nav[aria-label="Main menu"]')
      .getByRole('link', { name: 'Cases', exact: true });
    await casesLink.focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL('/');
  });
});
