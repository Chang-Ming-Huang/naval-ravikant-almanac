const { test, expect } = require('@playwright/test');

test.describe('Naval Ravikant Almanac Website', () => {
  
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/納瓦爾寶典/);
    
    // Check if the main hero title is visible
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.hero-title')).toContainText('納瓦爾寶典');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const navLinks = [
      { text: '致富', section: '#wealth' },
      { text: '快樂', section: '#happiness' },
      { text: '思考', section: '#thinking' },
      { text: '哲學', section: '#philosophy' }
    ];

    for (const link of navLinks) {
      // Click the navigation link
      await page.click(`text=${link.text}`);
      
      // Wait a bit for smooth scrolling
      await page.waitForTimeout(1000);
      
      // Check if the corresponding section is in viewport
      await expect(page.locator(link.section)).toBeInViewport();
    }
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.nav-menu')).toBeVisible();
    await expect(page.locator('.hamburger')).not.toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.hamburger')).toBeVisible();
    
    // Test mobile navigation
    await page.click('.hamburger');
    await expect(page.locator('.nav-menu.active')).toBeVisible();
  });

  test('should have interactive cards', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to wealth section
    await page.locator('#wealth').scrollIntoViewIfNeeded();
    
    // Find cards and test hover effects
    const cards = page.locator('.card');
    const firstCard = cards.first();
    
    // Hover over the card
    await firstCard.hover();
    
    // Check if card has hover effect (this is a basic check)
    const cardStyle = await firstCard.getAttribute('style');
    // Note: In real tests, you might want to check computed styles or use visual regression testing
  });

  test('should have working call-to-action buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test primary CTA button
    await page.click('.btn-primary');
    await page.waitForTimeout(1000);
    await expect(page.locator('#wealth')).toBeInViewport();
    
    // Go back to top
    await page.goto('/');
    
    // Test secondary CTA button
    await page.click('.btn-secondary');
    await page.waitForTimeout(1000);
    await expect(page.locator('#philosophy')).toBeInViewport();
  });

  test('should have all sections with content', async ({ page }) => {
    await page.goto('/');
    
    const sections = [
      { id: '#wealth', title: '關於致富' },
      { id: '#happiness', title: '關於快樂' },
      { id: '#thinking', title: '關於思考力' },
      { id: '#philosophy', title: '人生哲學與實踐' }
    ];

    for (const section of sections) {
      await page.locator(section.id).scrollIntoViewIfNeeded();
      
      // Check if section title exists
      await expect(page.locator(`${section.id} .section-title`)).toContainText(section.title);
      
      // Check if section has content
      await expect(page.locator(section.id)).not.toBeEmpty();
    }
  });

  test('should have floating action button', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down to make FAB visible
    await page.locator('#wealth').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // FAB should be visible when scrolled down
    const fab = page.locator('div').filter({ hasText: /^↑$/ }).first();
    await expect(fab).toBeVisible();
    
    // Click FAB to scroll to top
    await fab.click();
    await page.waitForTimeout(1000);
    
    // Should be back at top
    await expect(page.locator('.hero')).toBeInViewport();
  });

  test('should load all CSS and JS files', async ({ page }) => {
    await page.goto('/');
    
    // Check if styles are loaded (look for specific styled elements)
    const hero = page.locator('.hero');
    await expect(hero).toHaveCSS('background', /linear-gradient/);
    
    // Check if JavaScript is working by testing popup functionality
    // Click on a card with data-popup attribute
    const firstPopupCard = page.locator('[data-popup]').first();
    if (await firstPopupCard.count() > 0) {
      await firstPopupCard.click();
      
      // Check if popup appears
      const popup = page.locator('#popup-overlay');
      await expect(popup).toHaveClass(/active/);
      
      // Close popup
      const closeButton = page.locator('.popup-close');
      await closeButton.click();
      await expect(popup).not.toHaveClass(/active/);
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check viewport meta tag for mobile responsiveness
    const viewportMeta = page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    
    // Check charset
    const charsetMeta = page.locator('meta[charset]');
    await expect(charsetMeta).toHaveAttribute('charset', 'UTF-8');
  });

});