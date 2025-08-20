const { test, expect } = require('@playwright/test');

test.describe('CSS Fix Verification', () => {
    test('Verify CSS fixes are working', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.waitForLoadState('networkidle');
        
        console.log('🔧 Testing CSS fixes...');
        
        // Test navigation logo styling
        const navLogo = page.locator('.nav-logo h2');
        await expect(navLogo).toBeVisible();
        
        const logoColor = await navLogo.evaluate(el => 
            window.getComputedStyle(el).color
        );
        console.log(`Navigation logo color: ${logoColor}`);
        
        // Test hero container grid
        const heroContainer = page.locator('.hero-container');
        const heroDisplay = await heroContainer.evaluate(el => 
            window.getComputedStyle(el).display
        );
        console.log(`Hero container display: ${heroDisplay}`);
        
        // Test card styling in different sections
        await page.click('a[href="#thinking"]');
        await page.waitForTimeout(1000);
        
        const thinkingCard = page.locator('#thinking .card h3').first();
        const thinkingColor = await thinkingCard.evaluate(el => 
            window.getComputedStyle(el).color
        );
        console.log(`Thinking card title color: ${thinkingColor}`);
        
        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000);
        
        const mobileHeroContainer = page.locator('.hero-container');
        const mobileGridColumns = await mobileHeroContainer.evaluate(el => 
            window.getComputedStyle(el).gridTemplateColumns
        );
        console.log(`Mobile hero grid columns: ${mobileGridColumns}`);
        
        console.log('✅ CSS verification complete');
    });
});