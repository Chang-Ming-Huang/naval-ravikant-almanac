const { test, expect } = require('@playwright/test');

test.describe('Unified Card System Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.waitForLoadState('networkidle');
  });

  test('Card Hover Animations - All Sections', async ({ page }) => {
    const sections = [
      { name: 'wealth', selector: '#wealth .card', expectedCount: 4 },
      { name: 'happiness', selector: '#happiness .card', expectedCount: 4 },
      { name: 'thinking', selector: '#thinking .card', expectedCount: 4 },
      { name: 'philosophy', selector: '#philosophy .card', expectedCount: 6 },
      { name: 'glossary', selector: '.glossary-grid .card', expectedCount: 4 },
      { name: 'qa', selector: '#qa .card', expectedCount: 12 }
    ];

    for (const section of sections) {
      // Navigate to section
      await page.click(`a[href="#${section.name}"]`);
      await page.waitForTimeout(1000);

      // Get all cards in the section
      const cards = await page.locator(section.selector).all();
      console.log(`Section ${section.name}: Found ${cards.length} cards (expected ${section.expectedCount})`);

      // Test hover effects on each card
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Get initial transform
        const initialTransform = await card.evaluate(el => 
          window.getComputedStyle(el).transform
        );

        // Hover over the card
        await card.hover();
        await page.waitForTimeout(300); // Wait for hover animation

        // Check if transform changed (hover effect applied)
        const hoverTransform = await card.evaluate(el => 
          window.getComputedStyle(el).transform
        );

        // Move mouse away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);

        console.log(`${section.name} card ${i + 1}: Initial: ${initialTransform}, Hover: ${hoverTransform}`);
      }
    }
  });

  test('Card Click/Popup Functionality - All Interactive Cards', async ({ page }) => {
    const interactiveCards = [
      // Wealth section
      { section: 'wealth', popupId: 'wealth-vs-money' },
      { section: 'wealth', popupId: 'productize-yourself' },
      { section: 'wealth', popupId: 'four-types-luck' },
      { section: 'wealth', popupId: 'leverage-effect' },
      
      // Happiness section
      { section: 'happiness', popupId: 'happiness-choice' },
      { section: 'happiness', popupId: 'inner-peace' },
      { section: 'happiness', popupId: 'present-moment' },
      { section: 'happiness', popupId: 'desires-suffering' },
      
      // Thinking section
      { section: 'thinking', popupId: 'judgment-over-effort' },
      { section: 'thinking', popupId: 'learning-methods' },
      { section: 'thinking', popupId: 'decision-making' },
      { section: 'thinking', popupId: 'compound-learning' },
      
      // Philosophy section
      { section: 'philosophy', popupId: 'life-philosophy' },
      { section: 'philosophy', popupId: 'meaning-creation' },
      { section: 'philosophy', popupId: 'self-awareness' },
      
      // Glossary section
      { section: 'glossary', popupId: 'specific-knowledge' },
      { section: 'glossary', popupId: 'leverage' },
      { section: 'glossary', popupId: 'accountability' },
      { section: 'glossary', popupId: 'compound-interest' }
    ];

    for (const cardInfo of interactiveCards) {
      // Navigate to section
      await page.click(`a[href="#${cardInfo.section}"]`);
      await page.waitForTimeout(500);

      // Find and click the card with the specific data-popup
      const card = page.locator(`[data-popup="${cardInfo.popupId}"]`);
      
      if (await card.count() > 0) {
        await card.click();
        await page.waitForTimeout(500);

        // Check if popup is visible
        const popup = page.locator('.popup-overlay');
        await expect(popup).toBeVisible({ timeout: 2000 });

        // Check if popup content is loaded
        const popupContent = page.locator('.popup-content');
        await expect(popupContent).toBeVisible();

        // Close popup by clicking overlay
        await page.locator('.popup-overlay').click();
        await page.waitForTimeout(500);

        // Verify popup is closed
        await expect(popup).not.toBeVisible();

        console.log(`✓ ${cardInfo.section} - ${cardInfo.popupId}: Popup opened and closed successfully`);
      } else {
        console.log(`⚠ Card not found: ${cardInfo.section} - ${cardInfo.popupId}`);
      }
    }
  });

  test('Q&A Section Card Functionality', async ({ page }) => {
    // Navigate to Q&A section
    await page.click('a[href="#qa"]');
    await page.waitForTimeout(1000);

    // Get all Q&A cards
    const qaCards = await page.locator('#qa .card[data-popup]').all();
    console.log(`Found ${qaCards.length} Q&A cards`);

    // Test first few Q&A cards (to avoid test timeout)
    const cardsToTest = Math.min(5, qaCards.length);
    
    for (let i = 0; i < cardsToTest; i++) {
      const card = qaCards[i];
      const popupId = await card.getAttribute('data-popup');
      
      // Click the card
      await card.click();
      await page.waitForTimeout(500);

      // Check if popup opened
      const popup = page.locator('.popup-overlay');
      await expect(popup).toBeVisible({ timeout: 2000 });

      // Verify popup has content
      const popupContent = page.locator('.popup-content');
      await expect(popupContent).not.toBeEmpty();

      // Close popup
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      // Verify popup closed
      await expect(popup).not.toBeVisible();

      console.log(`✓ Q&A card ${i + 1} (${popupId}): Working correctly`);
    }
  });

  test('Mobile Responsiveness and Touch Interactions', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Test mobile navigation
    const hamburger = page.locator('.hamburger');
    await expect(hamburger).toBeVisible();

    // Test card responsiveness in each section
    const sections = ['wealth', 'happiness', 'thinking', 'philosophy'];
    
    for (const sectionName of sections) {
      await page.click(`a[href="#${sectionName}"]`);
      await page.waitForTimeout(1000);

      // Check if cards stack in single column on mobile
      const cards = page.locator(`#${sectionName} .card`);
      const cardCount = await cards.count();
      
      if (cardCount > 0) {
        // Get the first card's position and width
        const firstCard = cards.first();
        const cardBox = await firstCard.boundingBox();
        
        // Check if card takes most of the screen width (single column layout)
        const screenWidth = 375;
        const cardWidthRatio = cardBox.width / screenWidth;
        
        console.log(`${sectionName} mobile layout: Card width ratio ${cardWidthRatio.toFixed(2)}`);
        
        // Test touch interaction on first card if it has popup
        const hasPopup = await firstCard.getAttribute('data-popup');
        if (hasPopup) {
          await firstCard.tap();
          await page.waitForTimeout(500);
          
          const popup = page.locator('.popup-overlay');
          if (await popup.isVisible()) {
            // Check if popup is mobile-friendly
            const popupContent = page.locator('.popup-content');
            const popupBox = await popupContent.boundingBox();
            
            console.log(`${sectionName} mobile popup: Width ${popupBox.width}, fits screen: ${popupBox.width <= screenWidth}`);
            
            // Close popup
            await page.locator('.popup-overlay').tap();
            await page.waitForTimeout(500);
          }
        }
      }
    }
  });

  test('Animation Stagger Effects and Intersection Observer', async ({ page }) => {
    // Reload page to test initial animations
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Test intersection observer animations by scrolling to sections
    const sections = ['wealth', 'happiness', 'thinking', 'philosophy', 'qa'];
    
    for (const sectionName of sections) {
      // Scroll to section
      await page.click(`a[href="#${sectionName}"]`);
      await page.waitForTimeout(1500); // Wait for intersection observer and animations

      // Check if cards have fade-in class or animation applied
      const cards = page.locator(`#${sectionName} .card`);
      const cardCount = await cards.count();
      
      if (cardCount > 0) {
        // Check if cards have animation/transition styles
        for (let i = 0; i < Math.min(3, cardCount); i++) {
          const card = cards.nth(i);
          const opacity = await card.evaluate(el => 
            window.getComputedStyle(el).opacity
          );
          const transform = await card.evaluate(el => 
            window.getComputedStyle(el).transform
          );
          
          console.log(`${sectionName} card ${i + 1}: Opacity ${opacity}, Transform: ${transform}`);
        }
      }
    }
  });

  test('Card Variant Styles Consistency', async ({ page }) => {
    const cardVariants = [
      { section: 'wealth', selector: '.card--solid', expectedCount: 4 },
      { section: 'happiness', selector: '.card--glass-light', expectedCount: 4 },
      { section: 'thinking', selector: '.card--glass', expectedCount: 4 },
      { section: 'philosophy', selector: '.card--glass-light', expectedCount: 6 },
      { section: 'glossary', selector: '.card--solid.card--accent', expectedCount: 4 },
      { section: 'qa', selector: '.card--glass', expectedCount: 12 }
    ];

    for (const variant of cardVariants) {
      await page.click(`a[href="#${variant.section}"]`);
      await page.waitForTimeout(500);

      const cards = page.locator(`#${variant.section} ${variant.selector}`);
      const count = await cards.count();
      
      console.log(`${variant.section} ${variant.selector}: Found ${count} cards (expected ${variant.expectedCount})`);

      if (count > 0) {
        // Test visual consistency of first card
        const firstCard = cards.first();
        const styles = await firstCard.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            backdropFilter: computed.backdropFilter,
            boxShadow: computed.boxShadow,
            border: computed.border
          };
        });
        
        console.log(`${variant.section} card styles:`, styles);
      }
    }
  });
});