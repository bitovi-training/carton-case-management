import { test, expect } from '@playwright/test';

test.describe('Like and Dislike Buttons', () => {
  test('should display like and dislike buttons on comments', async ({ page }) => {
    // Navigate to a case details page (assuming first case)
    await page.goto('http://localhost:5173/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on the first case to view details
    const firstCase = page.locator('[data-testid="case-item"]').first();
    if (await firstCase.count() > 0) {
      await firstCase.click();
    } else {
      // Fallback: just navigate to /cases/:id if testid not available
      await page.goto('http://localhost:5173/cases');
      await page.waitForLoadState('networkidle');
      const caseLinks = page.locator('a[href^="/cases/"]');
      if (await caseLinks.count() > 0) {
        await caseLinks.first().click();
      }
    }
    
    // Wait for the case details page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Take a screenshot of the full page
    await page.screenshot({ path: '/tmp/like-dislike-buttons-implementation.png', fullPage: true });
    
    // Verify upvote buttons exist
    const upvoteButtons = page.getByLabel('Upvote');
    await expect(upvoteButtons.first()).toBeVisible();
    
    // Verify downvote buttons exist
    const downvoteButtons = page.getByLabel('Downvote');
    await expect(downvoteButtons.first()).toBeVisible();
    
    // Verify vote counts are displayed (they should show 0 initially)
    const voteCounts = page.locator('button[aria-label="Upvote"] span, button[aria-label="Downvote"] span');
    await expect(voteCounts.first()).toBeVisible();
  });
  
  test('should toggle like button on click', async ({ page }) => {
    // Navigate to a case details page
    await page.goto('http://localhost:5173/cases');
    await page.waitForLoadState('networkidle');
    
    const caseLinks = page.locator('a[href^="/cases/"]');
    if (await caseLinks.count() > 0) {
      await caseLinks.first().click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Get the first upvote button
    const upvoteButton = page.getByLabel('Upvote').first();
    
    // Check initial state (not pressed)
    await expect(upvoteButton).toHaveAttribute('aria-pressed', 'false');
    
    // Click the upvote button
    await upvoteButton.click();
    
    // Wait for optimistic update
    await page.waitForTimeout(500);
    
    // Verify button is now active
    await expect(upvoteButton).toHaveAttribute('aria-pressed', 'true');
    
    // Take screenshot of voted state
    await page.screenshot({ path: '/tmp/like-button-active.png', fullPage: true });
    
    // Click again to toggle off
    await upvoteButton.click();
    await page.waitForTimeout(500);
    
    // Verify button is back to inactive
    await expect(upvoteButton).toHaveAttribute('aria-pressed', 'false');
  });
});
