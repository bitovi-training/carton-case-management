import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should display error message when API fails', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      (route) => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            error: {
              message: 'Database connection failed',
              code: -32603,
            },
          }),
        });
      }
    );

    await page.goto('/');

    await expect(page.getByText(/Error loading cases/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Database connection failed/i)).toBeVisible();

    const retryButton = page.getByRole('button', { name: /retry/i });
    await expect(retryButton).toBeVisible();
  });

  test('should retry request when retry button is clicked', async ({ page }) => {
    let requestCount = 0;

    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      (route) => {
        requestCount++;
        if (requestCount <= 4) {
          route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
              error: {
                message: 'Temporary server error',
                code: -32603,
              },
            }),
          });
        } else {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              result: {
                data: [
                  {
                    id: '1',
                    title: 'Test Case',
                    description: 'Test Description',
                    status: 'OPEN',
                    creator: { id: '1', name: 'John Doe', email: 'john@example.com' },
                    assignee: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                ],
              },
            }),
          });
        }
      }
    );

    await page.goto('/');

    await expect(page.getByText(/Error loading cases/i)).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /retry/i }).click();

    await expect(page.getByText('Test Case')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Error loading cases/i)).not.toBeVisible();
  });

  test('should display loading spinner while fetching', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      async (route) => {
        await new Promise((resolve) => globalThis.setTimeout(resolve, 1000));
        await route.continue();
      }
    );

    await page.goto('/');

    const loadingText = page.getByText(/Loading cases/i);
    await expect(loadingText).toBeVisible();

    const spinner = page.locator('.animate-spin').first();
    await expect(spinner).toBeVisible();

    await expect(loadingText).not.toBeVisible({ timeout: 10000 });
  });

  test('should show background refetch indicator', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Loading cases/i)).not.toBeVisible({ timeout: 10000 });

    await page.goto('/about');
    await page.goto('/');

    const caseList = page.locator('.grid > a');
    await expect(caseList.first()).toBeVisible({ timeout: 500 });

    await page.reload();

    await expect(caseList.first()).toBeVisible({ timeout: 2000 });
  });

  test('should display empty state when no cases exist', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            result: {
              data: [],
            },
          }),
        });
      }
    );

    await page.goto('/');

    await expect(page.getByText(/Loading cases/i)).not.toBeVisible({ timeout: 10000 });

    await expect(page.getByText(/No cases found/i)).toBeVisible();
    await expect(page.getByText(/Create a new case to get started/i)).toBeVisible();

    const caseLinks = page.locator('.grid > a');
    await expect(caseLinks).toHaveCount(0);
  });

  test('should show error loading cases message', async ({ page }) => {
    await page.route(
      (url) => url.href.includes('/trpc') && url.href.includes('batch=1'),
      (route) => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            error: {
              message: 'Failed to load cases',
              code: -32603,
            },
          }),
        });
      }
    );

    await page.goto('/');

    await expect(page.getByText(/Error loading cases/i)).toBeVisible({ timeout: 15000 });

    await expect(page.getByRole('button', { name: /retry/i })).toBeVisible();
  });
});
