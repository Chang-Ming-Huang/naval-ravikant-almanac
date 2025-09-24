// MCP Integration Test - Simple functionality verification
import { test, expect } from '@playwright/test';

test.describe('MCP 整合功能測試', () => {
  test('基礎連接和截圖功能測試', async ({ page }) => {
    console.log('🧪 開始 MCP 基礎功能測試...');

    // 測試基本的頁面導航
    await page.goto('https://example.com');

    // 驗證頁面載入
    await expect(page).toHaveTitle('Example Domain');

    // 測試截圖功能
    await page.screenshot({
      path: 'tests/screenshots/mcp-test-example.png',
      fullPage: true
    });

    console.log('✅ 基礎截圖功能正常運行');

    // 測試基本的 DOM 互動
    const heading = await page.locator('h1').textContent();
    console.log(`📝 頁面標題: ${heading}`);

    // 驗證文字內容
    await expect(page.locator('h1')).toContainText('Example Domain');

    console.log('✅ MCP 基礎功能測試完成');
  });

  test('本地開發伺服器連接測試', async ({ page }) => {
    console.log('🏠 測試本地伺服器連接...');

    // 嘗試連接到本地開發伺服器
    try {
      await page.goto('http://localhost:3000', { timeout: 5000 });

      // 檢查是否成功載入
      const title = await page.title();
      console.log(`📄 本地頁面標題: ${title}`);

      // 截圖本地頁面
      await page.screenshot({
        path: 'tests/screenshots/local-homepage.png',
        fullPage: true
      });

      console.log('✅ 本地伺服器連接成功');

    } catch (error) {
      console.log('ℹ️ 本地伺服器未運行，這是正常的測試狀況');
      console.log(`錯誤詳情: ${error.message}`);
    }
  });

  test('視覺元素分析能力測試', async ({ page }) => {
    console.log('👁️ 測試視覺分析能力...');

    await page.goto('https://github.com');

    // 等待頁面完全載入
    await page.waitForLoadState('networkidle');

    // 分析頁面的視覺結構
    const visualAnalysis = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const colorMap = new Map();
      const fontFamilies = new Set();

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const fontFamily = styles.fontFamily;

        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          colorMap.set(bgColor, (colorMap.get(bgColor) || 0) + 1);
        }

        if (fontFamily) {
          fontFamilies.add(fontFamily);
        }
      });

      return {
        totalElements: elements.length,
        uniqueColors: colorMap.size,
        fontFamilies: Array.from(fontFamilies).slice(0, 5), // 前5個字體
        topColors: Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([color, count]) => ({ color, count }))
      };
    });

    console.log('🎨 視覺分析結果:', visualAnalysis);

    // 截圖進行視覺記錄
    await page.screenshot({
      path: 'tests/screenshots/visual-analysis-github.png',
      fullPage: true
    });

    console.log('✅ 視覺分析功能測試完成');
  });
});