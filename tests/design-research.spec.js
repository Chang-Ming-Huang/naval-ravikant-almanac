// Design Research Test - Playwright MCP Integration Demo
import { test, expect } from '@playwright/test';

test.describe('網頁設計研究示範', () => {
  test('Awwwards 網站分析 - 獲獎設計研究', async ({ page }) => {
    // 訪問 Awwwards 以研究最新的獲獎設計趨勢
    await page.goto('https://www.awwwards.com/websites/');

    // 等待頁面加載
    await expect(page).toHaveTitle(/Awwwards/);

    // 分析首頁的設計元素
    console.log('🎨 開始分析 Awwwards 設計趨勢...');

    // 檢查當前流行的設計卡片結構
    const designCards = await page.locator('.js-link-item').count();
    console.log(`📊 發現 ${designCards} 個設計案例`);

    // 截圖保存當前的設計趨勢頁面
    await page.screenshot({ path: 'tests/screenshots/awwwards-trends.png', fullPage: true });

    // 分析第一個獲獎作品的詳細資訊
    if (designCards > 0) {
      const firstCard = page.locator('.js-link-item').first();
      const title = await firstCard.locator('.content h3').textContent();
      const description = await firstCard.locator('.content p').textContent();

      console.log(`🏆 特色作品: ${title}`);
      console.log(`📝 描述: ${description}`);

      // 點擊查看詳細設計
      await firstCard.click();
      await page.waitForLoadState('networkidle');

      // 截圖設計詳情頁面
      await page.screenshot({ path: 'tests/screenshots/featured-design-detail.png', fullPage: true });
    }
  });

  test('本地原型頁面品質檢測', async ({ page }) => {
    // 測試我們自己的設計原型品質
    await page.goto('http://localhost:3000');

    // 檢查頁面載入和基本結構
    await expect(page).toHaveTitle(/多維度網站風格系統/);

    console.log('🏠 分析本地原型頁面...');

    // 檢查風格卡片數量
    const styleCards = await page.locator('.style-card').count();
    console.log(`🎭 發現 ${styleCards} 個風格選項`);

    // 分析視覺品質要素
    const visualElements = {
      hasProperSpacing: await page.locator('.style-card').first().evaluate(el => {
        const padding = window.getComputedStyle(el).padding;
        return padding !== '0px';
      }),
      hasCustomColors: await page.evaluate(() => {
        const styles = window.getComputedStyle(document.documentElement);
        return styles.getPropertyValue('--primary') !== '';
      }),
      hasTransitions: await page.locator('.style-card').first().evaluate(el => {
        const transition = window.getComputedStyle(el).transition;
        return transition !== 'all 0s ease 0s';
      })
    };

    console.log('✅ 視覺品質檢查:', visualElements);

    // 截圖主頁面進行設計品質評估
    await page.screenshot({ path: 'tests/screenshots/homepage-quality-check.png', fullPage: true });

    // 測試響應式設計
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: 'tests/screenshots/responsive-tablet.png', fullPage: true });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'tests/screenshots/responsive-mobile.png', fullPage: true });
  });

  test('設計靈感收集 - Dribbble 趨勢分析', async ({ page }) => {
    // 研究 Dribbble 上的最新設計趨勢
    await page.goto('https://dribbble.com/shots/popular');

    console.log('🎨 收集 Dribbble 設計靈感...');

    // 等待設計作品載入
    await page.waitForSelector('.shot-thumbnail');

    // 分析熱門設計的視覺特徵
    const popularShots = await page.locator('.shot-thumbnail').count();
    console.log(`📊 發現 ${popularShots} 個熱門設計`);

    // 截圖當前趋势页面
    await page.screenshot({ path: 'tests/screenshots/dribbble-trends.png', fullPage: true });

    // 分析色彩趨勢 (模擬 - 實際應用中會更詳細)
    const colorTrends = await page.evaluate(() => {
      const shots = document.querySelectorAll('.shot-thumbnail img');
      return {
        totalShots: shots.length,
        colorAnalysis: '需要進階圖像分析功能來提取主要色彩'
      };
    });

    console.log('🌈 色彩趨勢分析:', colorTrends);
  });
});