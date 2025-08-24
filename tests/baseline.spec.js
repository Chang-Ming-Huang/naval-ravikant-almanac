// tests/baseline.spec.js
import { test, expect } from '@playwright/test';

test.describe('Manual Inspection for Final Pages', () => {
  test('should open tech.html for manual visual inspection', async ({ page }) => {
    // Navigate to the Tech page
    await page.goto('/pages/tech.html');
    await page.waitForSelector('h1');
    const mainTitle = page.locator('h1');
    await expect(mainTitle).toBeVisible();

    console.log(`

⏸️ Test paused for TECH page inspection. Check the browser window. Press "Resume" to continue to the next test. ⏸️

`);
    await page.pause();
  });

  test('should open retro.html for manual visual inspection', async ({ page }) => {
    // Navigate to the Retro page
    await page.goto('/pages/retro.html');
    await page.waitForSelector('h1');
    const mainTitle = page.locator('h1');
    await expect(mainTitle).toBeVisible();

    console.log(`

⏸️ Test paused for RETRO page inspection. Check the browser window. Press "Resume" to finish. ⏸️

`);
    await page.pause();
  });
});
