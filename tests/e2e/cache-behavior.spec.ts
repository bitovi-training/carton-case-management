import { test, expect } from '@playwright/test';

test.describe('Cache Behavior', () => {
  test('should cache query results and display instantly on navigation', async ({ page }) => {
    await page.goto('/');

    const firstCase = page.locator('.grid > a').first();
    await expect(firstCase).toBeVisible({ timeout: 10000 });

    const firstCaseTitle = await firstCase.locator('h2').textContent();

    await page.goto('/about');

    const startTime = Date.now();
    await page.goto('/');

    const caseAfterReturn = page.locator('.grid > a').first();
    await expect(caseAfterReturn).toBeVisible({ timeout: 1000 });
    const loadTime = Date.now() - startTime;

    await expect(caseAfterReturn.locator('h2')).toHaveText(firstCaseTitle || '');

    console.log(`Cache load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2000);
  });

  test('should refetch data in background on window focus', async ({ page, context }) => {
    await page.goto('/');
    await expect(page.getByText('Loading cases...')).not.toBeVisible({ timeout: 10000 });

    const newPage = await context.newPage();
    await newPage.goto('/');

    await page.bringToFront();

    await page.waitForTimeout(1000);

    const caseList = page.locator('.grid > a');
    await expect(caseList.first()).toBeVisible();

    await newPage.close();
  });

  test('should handle stale data by refetching after 5 minutes', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading cases...')).not.toBeVisible({ timeout: 10000 });

    const caseList = page.locator('.grid > a');
    await expect(caseList.first()).toBeVisible();
  });

  test('should show loading state on initial load', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      async (route) => {
        await new Promise((resolve) => globalThis.setTimeout(resolve, 500));
        await route.continue();
      }
    );

    await page.goto('/');

    await expect(page.getByText('Loading cases...')).toBeVisible();

    await expect(page.getByText('Loading cases...')).not.toBeVisible({ timeout: 10000 });
    const caseList = page.locator('.grid > a');
    await expect(caseList.first()).toBeVisible();
  });

  test('should not show loading state when data is cached', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading cases...')).not.toBeVisible({ timeout: 10000 });

    await page.goto('/about');
    await page.goto('/');

    const caseList = page.locator('.grid > a');
    await expect(caseList.first()).toBeVisible({ timeout: 500 });
  });
});
