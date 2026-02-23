import { test, expect } from '@playwright/test';

test.describe('Toast Notifications', () => {
  // Tolerance for toast center position verification (pixels)
  // Allows for minor rendering differences across browsers/devices
  const CENTERING_TOLERANCE_PX = 50;

  test('should show success toast when creating a case', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/cases/');
    
    const createButton = page.getByRole('button', { name: /create new case/i });
    await expect(createButton).toBeVisible({ timeout: 10000 });
    await createButton.click();
    
    const titleInput = page.getByLabel(/case title/i);
    const descriptionInput = page.getByLabel(/case description/i);
    const customerSelect = page.getByRole('combobox', { name: /customer/i });
    
    await titleInput.fill('Test Case for Toast');
    await descriptionInput.fill('This is a test case to verify toast notifications');
    
    await customerSelect.click();
    await page.getByRole('option').first().click();
    
    const submitButton = page.getByRole('button', { name: /create case/i });
    await submitButton.click();
    
    const successToast = page.getByRole('alert').filter({ hasText: /success/i });
    await expect(successToast).toBeVisible({ timeout: 5000 });
    await expect(successToast).toContainText('A new claim has been created.');
    
    const dismissButton = successToast.getByRole('button', { name: /dismiss/i });
    await expect(dismissButton).toBeVisible();
    
    await dismissButton.click();
    await expect(successToast).not.toBeVisible({ timeout: 2000 });
  });

  test('should show delete toast when deleting a case', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/cases/');
    
    // Wait for navigation to a specific case
    await page.waitForURL(/\/cases\/.+/, { timeout: 10000 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15000 });
    
    const caseTitle = page.getByRole('heading', { level: 1 });
    await expect(caseTitle).toBeVisible();
    const caseTitleText = await caseTitle.textContent();
    
    const moreOptionsButton = page.getByRole('button', { name: /more options|ellipsis/i });
    await moreOptionsButton.click();
    
    const deleteMenuItem = page.getByRole('menuitem', { name: /delete case/i });
    await expect(deleteMenuItem).toBeVisible();
    await deleteMenuItem.click();
    
    const confirmDialog = page.getByRole('dialog', { name: /delete case/i });
    await expect(confirmDialog).toBeVisible();
    
    const confirmButton = confirmDialog.getByRole('button', { name: /delete$/i });
    await confirmButton.click();
    
    const deleteToast = page.getByRole('alert').filter({ hasText: /deleted/i });
    await expect(deleteToast).toBeVisible({ timeout: 5000 });
    
    if (caseTitleText) {
      await expect(deleteToast).toContainText(caseTitleText.trim());
    }
    await expect(deleteToast).toContainText('has been successfully deleted');
    
    const dismissButton = deleteToast.getByRole('button', { name: /dismiss/i });
    await expect(dismissButton).toBeVisible();
  });

  test('should position toast at bottom-center on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/cases/');
    
    await page.waitForURL(/\/cases\/.+/, { timeout: 10000 });
    
    const createButton = page.getByRole('button', { name: /create new case/i });
    await createButton.click();
    
    await page.waitForURL('/cases/', { timeout: 5000 });
    
    const titleInput = page.getByLabel(/case title/i);
    const descriptionInput = page.getByLabel(/case description/i);
    const customerSelect = page.getByRole('combobox', { name: /customer/i });
    
    await titleInput.fill('Test Toast Position');
    await descriptionInput.fill('Testing toast positioning');
    
    await customerSelect.click();
    await page.getByRole('option').first().click();
    
    const submitButton = page.getByRole('button', { name: /create case/i });
    await submitButton.click();
    
    const successToast = page.getByRole('alert');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    const toastBox = await successToast.boundingBox();
    expect(toastBox).toBeTruthy();
    
    if (toastBox) {
      const viewportWidth = 1280;
      const centerX = viewportWidth / 2;
      const toastCenterX = toastBox.x + toastBox.width / 2;
      
      // Verify toast is horizontally centered within tolerance
      expect(Math.abs(toastCenterX - centerX)).toBeLessThan(CENTERING_TOLERANCE_PX);
      // Verify toast is positioned near bottom (below 70% of viewport height)
      expect(toastBox.y).toBeGreaterThan(500);
    }
  });

  test('should position toast at bottom on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/cases/');
    
    await page.waitForURL(/\/cases\/.+/, { timeout: 10000 });
    
    const createButton = page.getByRole('button', { name: /create new case/i });
    await createButton.click();
    
    await page.waitForURL('/cases/', { timeout: 5000 });
    
    const titleInput = page.getByLabel(/case title/i);
    const descriptionInput = page.getByLabel(/case description/i);
    const customerSelect = page.getByRole('combobox', { name: /customer/i });
    
    await titleInput.fill('Test Mobile Toast');
    await descriptionInput.fill('Testing mobile toast positioning');
    
    await customerSelect.click();
    await page.getByRole('option').first().click();
    
    const submitButton = page.getByRole('button', { name: /create case/i });
    await submitButton.click();
    
    const successToast = page.getByRole('alert');
    await expect(successToast).toBeVisible({ timeout: 5000 });
    
    const toastBox = await successToast.boundingBox();
    expect(toastBox).toBeTruthy();
    
    if (toastBox) {
      const viewportHeight = 667;
      expect(toastBox.y).toBeGreaterThan(viewportHeight - 200);
    }
  });
});
