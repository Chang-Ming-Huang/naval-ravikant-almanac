const { chromium } = require('playwright');

async function inspectPage() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('🔍 開始檢查 AI 創意自由實驗室頁面...');
        
        // 監聽頁面錯誤
        page.on('pageerror', (error) => {
            console.error('❌ 頁面 JavaScript 錯誤:', error.message);
        });
        
        page.on('console', (msg) => {
            const type = msg.type();
            const text = msg.text();
            if (type === 'error') {
                console.error('❌ 控制台錯誤:', text);
            } else if (type === 'warning') {
                console.warn('⚠️  控制台警告:', text);
            } else {
                console.log(`📝 控制台 ${type}:`, text);
            }
        });
        
        // 前往頁面
        console.log('🚀 導航到 http://localhost:3001/');
        await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
        
        // 檢查頁面基本元素
        console.log('\n📊 檢查頁面基本結構...');
        
        // 檢查標題
        const title = await page.textContent('h1');
        console.log('📖 頁面標題:', title);
        
        // 檢查是否有明顯的 UI 問題
        const formExists = await page.locator('#creativeForm').count();
        console.log('📝 創意表單存在:', formExists > 0 ? '是' : '否');
        
        const galleryExists = await page.locator('#styleGallery').count();
        console.log('🎨 風格畫廊存在:', galleryExists > 0 ? '是' : '否');
        
        // 檢查畫廊內容
        if (galleryExists > 0) {
            const galleryItems = await page.locator('#styleGallery .creative-card').count();
            console.log('🖼️  畫廊項目數量:', galleryItems);
            
            if (galleryItems === 0) {
                console.error('❌ 畫廊沒有任何項目！');
                
                // 檢查 JavaScript 是否正確執行
                const jsExecuted = await page.evaluate(() => {
                    return typeof window.CreativeArtGenerator !== 'undefined';
                });
                console.log('⚙️  CreativeArtGenerator 類別載入:', jsExecuted ? '是' : '否');
                
                // 檢查 DOMContentLoaded 是否觸發
                const domLoaded = await page.evaluate(() => {
                    return document.readyState === 'complete';
                });
                console.log('📄 DOM 載入完成:', domLoaded ? '是' : '否');
            }
        }
        
        // 檢查 CSS 是否正確載入
        const bodyBg = await page.evaluate(() => {
            const body = document.body;
            return window.getComputedStyle(body).background;
        });
        console.log('🎨 背景樣式:', bodyBg.substring(0, 50) + '...');
        
        // 檢查 Tailwind 是否載入
        const tailwindLoaded = await page.evaluate(() => {
            const testEl = document.createElement('div');
            testEl.className = 'text-white';
            document.body.appendChild(testEl);
            const color = window.getComputedStyle(testEl).color;
            document.body.removeChild(testEl);
            return color === 'rgb(255, 255, 255)';
        });
        console.log('🎭 Tailwind CSS 載入:', tailwindLoaded ? '是' : '否');
        
        // 截圖保存
        await page.screenshot({ path: 'test/page-screenshot.png', fullPage: true });
        console.log('📸 已保存頁面截圖: test/page-screenshot.png');
        
        // 嘗試執行基本功能測試
        console.log('\n🧪 測試基本功能...');
        
        // 測試表單填寫
        if (formExists > 0) {
            await page.fill('input[name="styleName"]', '測試風格');
            await page.selectOption('select[name="approach"]', 'consciousness-bending');
            await page.fill('textarea[name="styleDescription"]', '這是一個測試描述');
            console.log('✏️  表單填寫成功');
        }
        
        // 等待一會兒觀察
        console.log('\n⏳ 等待 5 秒鐘觀察頁面行為...');
        await page.waitForTimeout(5000);
        
        console.log('\n✅ 檢查完成！請查看截圖和上述日誌分析問題。');
        
    } catch (error) {
        console.error('❌ 檢查過程中發生錯誤:', error);
        
        // 即使出錯也嘗試截圖
        try {
            await page.screenshot({ path: 'test/error-screenshot.png' });
            console.log('📸 已保存錯誤截圖: test/error-screenshot.png');
        } catch (screenshotError) {
            console.error('截圖失敗:', screenshotError);
        }
    } finally {
        await browser.close();
    }
}

// 執行檢查
console.log('🎯 啟動 AI 創意自由實驗室頁面檢查工具');
inspectPage().catch(console.error);