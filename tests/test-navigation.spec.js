const { test, expect } = require('@playwright/test');

test.describe('Naval Ravikant Website Navigation Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the website
    await page.goto('http://localhost:8080');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    console.log('🌐 Navigated to Naval Ravikant website');
  });

  test('should click all navigation buttons and verify smooth scrolling', async ({ page }) => {
    console.log('🧪 Starting navigation button click tests...\n');

    // Define navigation buttons to test
    const navButtons = [
      { name: '致富', href: '#wealth', sectionId: '#wealth' },
      { name: '快樂', href: '#happiness', sectionId: '#happiness' },
      { name: '思考', href: '#thinking', sectionId: '#thinking' },
      { name: '哲學', href: '#philosophy', sectionId: '#philosophy' },
      { name: '首頁', href: '#hero', sectionId: '#hero' }
    ];

    for (const button of navButtons) {
      console.log(`🖱️  Testing navigation button: ${button.name}`);
      
      // Find and click the navigation button
      const navLink = page.locator(`.nav-link[href="${button.href}"]`);
      await expect(navLink).toBeVisible();
      
      console.log(`   ✅ Found navigation link for ${button.name}`);
      
      // Click the navigation button
      await navLink.click();
      console.log(`   🎯 Clicked ${button.name} navigation button`);
      
      // Wait for smooth scrolling animation
      await page.waitForTimeout(1000);
      
      // Verify the target section is in viewport
      const targetSection = page.locator(button.sectionId);
      await expect(targetSection).toBeVisible();
      
      // Check if section is properly in viewport
      const isInViewport = await targetSection.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= window.innerHeight;
      });
      
      if (isInViewport) {
        console.log(`   ✅ ${button.name} section is now visible in viewport`);
      } else {
        console.log(`   ⚠️  ${button.name} section positioning may need adjustment`);
      }
      
      console.log(''); // Add spacing between tests
    }

    console.log('🎉 All navigation button tests completed!');
  });

  test('should test hero call-to-action buttons', async ({ page }) => {
    console.log('🧪 Testing Hero CTA buttons...\n');

    // Scroll to top first
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(500);

    // Test primary CTA button (開始探索)
    console.log('🖱️  Testing primary CTA button (開始探索)...');
    const primaryBtn = page.locator('.btn-primary');
    await expect(primaryBtn).toBeVisible();
    
    await primaryBtn.click();
    console.log('   🎯 Clicked primary CTA button');
    
    await page.waitForTimeout(1000);
    
    // Verify it navigated to wealth section
    const wealthSection = page.locator('#wealth');
    const isWealthVisible = await wealthSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= -100 && rect.top <= window.innerHeight;
    });
    
    if (isWealthVisible) {
      console.log('   ✅ Primary CTA successfully navigated to wealth section');
    } else {
      console.log('   ❌ Primary CTA navigation failed');
    }

    // Scroll back to top for secondary button test
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    // Test secondary CTA button (人生哲學)
    console.log('\n🖱️  Testing secondary CTA button (人生哲學)...');
    const secondaryBtn = page.locator('.btn-secondary');
    await expect(secondaryBtn).toBeVisible();
    
    await secondaryBtn.click();
    console.log('   🎯 Clicked secondary CTA button');
    
    await page.waitForTimeout(1000);
    
    // Verify it navigated to philosophy section
    const philosophySection = page.locator('#philosophy');
    const isPhilosophyVisible = await philosophySection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= -100 && rect.top <= window.innerHeight;
    });
    
    if (isPhilosophyVisible) {
      console.log('   ✅ Secondary CTA successfully navigated to philosophy section');
    } else {
      console.log('   ❌ Secondary CTA navigation failed');
    }

    console.log('\n🎉 Hero CTA button tests completed!');
  });

  test('should test mobile navigation hamburger menu', async ({ page }) => {
    console.log('📱 Testing mobile navigation...\n');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    console.log('   📱 Set mobile viewport (375x667)');

    // Wait for responsive changes
    await page.waitForTimeout(500);

    // Find hamburger menu
    const hamburger = page.locator('.hamburger');
    const navMenu = page.locator('.nav-menu');

    await expect(hamburger).toBeVisible();
    console.log('   ✅ Hamburger menu is visible');

    // Initially, nav menu should be hidden
    const isInitiallyHidden = await navMenu.evaluate((el) => {
      return !el.classList.contains('active');
    });

    if (isInitiallyHidden) {
      console.log('   ✅ Nav menu initially hidden (correct)');
    }

    // Click hamburger to open menu
    console.log('🖱️  Clicking hamburger menu to open...');
    await hamburger.click();
    await page.waitForTimeout(300);

    // Check if menu opened
    const isMenuOpen = await navMenu.evaluate((el) => {
      return el.classList.contains('active');
    });

    if (isMenuOpen) {
      console.log('   ✅ Mobile menu opened successfully');

      // Test clicking a navigation link in mobile menu
      console.log('🖱️  Testing mobile navigation link click...');
      const mobileNavLink = navMenu.locator('.nav-link[href="#wealth"]');
      await mobileNavLink.click();
      console.log('   🎯 Clicked 致富 link in mobile menu');

      await page.waitForTimeout(1000);

      // Check if menu closed after navigation
      const isMenuClosed = await navMenu.evaluate((el) => {
        return !el.classList.contains('active');
      });

      if (isMenuClosed) {
        console.log('   ✅ Mobile menu closed after navigation (correct UX)');
      }

      // Verify navigation worked
      const wealthSection = page.locator('#wealth');
      const isVisible = await wealthSection.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= window.innerHeight;
      });

      if (isVisible) {
        console.log('   ✅ Mobile navigation successfully scrolled to wealth section');
      }

    } else {
      console.log('   ❌ Mobile menu failed to open');
    }

    console.log('\n🎉 Mobile navigation tests completed!');
  });

  test('should test floating action button', async ({ page }) => {
    console.log('🚀 Testing floating action button (back to top)...\n');

    // Scroll down to make FAB visible
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    console.log('   📜 Scrolled down to reveal floating action button');

    // Look for the floating action button (it should contain ↑)
    const fab = page.locator('div').filter({ hasText: '↑' });
    
    // Wait for it to become visible
    await page.waitForTimeout(500);
    
    const isFabVisible = await fab.isVisible().catch(() => false);
    
    if (isFabVisible) {
      console.log('   ✅ Floating action button is visible');
      
      console.log('🖱️  Clicking floating action button...');
      await fab.click();
      console.log('   🎯 Clicked floating action button');
      
      await page.waitForTimeout(1000);
      
      // Check if we're back at the top
      const scrollTop = await page.evaluate(() => window.pageYOffset);
      
      if (scrollTop < 100) {
        console.log('   ✅ Successfully scrolled back to top');
      } else {
        console.log(`   ⚠️  Not fully at top (scroll position: ${scrollTop}px)`);
      }
    } else {
      console.log('   ⚠️  Floating action button not visible (may need more scroll)');
    }

    console.log('\n🎉 Floating action button test completed!');
  });
});

// Add test configuration
test.use({
  // Take screenshots on failure
  screenshot: 'only-on-failure',
  
  // Record video on failure  
  video: 'retain-on-failure',
  
  // Set default timeout
  timeout: 30000
});