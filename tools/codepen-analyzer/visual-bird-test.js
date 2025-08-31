const { chromium } = require('playwright');
const path = require('path');

async function visualBirdTest() {
    console.log('👁️ 可視化鳥群測試...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    // 測試 Zen Garden Birds
    const page = await context.newPage();
    const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', 'zen_garden_birds.html');
    
    console.log('🧘 測試 Zen Garden Birds...');
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(3000);
    
    // 添加視覺調試邊框，讓鳥群更容易看到
    await page.addStyleTag({
        content: `
            .bird-wrapper {
                border: 2px solid red !important;
                background: rgba(255, 0, 0, 0.2) !important;
                min-width: 20px !important;
                min-height: 20px !important;
            }
            .bird {
                border: 1px solid blue !important;
                background: rgba(0, 0, 255, 0.2) !important;
            }
            body::after {
                content: "視窗邊界";
                position: fixed;
                top: 10px;
                left: 10px;
                background: yellow;
                padding: 5px;
                z-index: 9999;
            }
        `
    });
    
    // 檢查初始狀態
    const initialBirds = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollY: window.scrollY
        };
        
        return {
            viewport,
            birds: Array.from(birds).map((bird, i) => {
                const rect = bird.getBoundingClientRect();
                const inViewport = rect.top >= 0 && rect.top <= viewport.height && 
                                 rect.left >= 0 && rect.left <= viewport.width;
                return {
                    index: i,
                    x: rect.left,
                    y: rect.top,
                    inViewport,
                    visible: rect.width > 0 && rect.height > 0
                };
            })
        };
    });
    
    console.log(`視窗: ${initialBirds.viewport.width}x${initialBirds.viewport.height}, 滾動: ${initialBirds.viewport.scrollY}`);
    console.log('初始鳥群狀態:');
    initialBirds.birds.forEach(bird => {
        const status = bird.inViewport ? '✅ 視窗內' : '❌ 視窗外';
        console.log(`  鳥 ${bird.index}: (${bird.x.toFixed(0)}, ${bird.y.toFixed(0)}) ${status} ${bird.visible ? '可見' : '隱藏'}`);
    });
    
    const visibleBirds = initialBirds.birds.filter(b => b.inViewport);
    console.log(`\n🎯 視窗內鳥群數量: ${visibleBirds.length}/${initialBirds.birds.length}\n`);
    
    if (visibleBirds.length === 0) {
        console.log('⚠️ 沒有鳥群在視窗內！嘗試滾動頁面...');
        
        // 滾動到頁面中間
        await page.evaluate(() => {
            const middleY = document.body.scrollHeight / 2;
            window.scrollTo(0, middleY);
        });
        
        await page.waitForTimeout(2000);
        
        const afterScrollBirds = await page.evaluate(() => {
            const birds = document.querySelectorAll('.bird-wrapper');
            return Array.from(birds).map((bird, i) => {
                const rect = bird.getBoundingClientRect();
                const inViewport = rect.top >= 0 && rect.top <= window.innerHeight && 
                                 rect.left >= 0 && rect.left <= window.innerWidth;
                return {
                    index: i,
                    x: rect.left,
                    y: rect.top,
                    inViewport
                };
            });
        });
        
        console.log('滾動後鳥群狀態:');
        afterScrollBirds.forEach(bird => {
            const status = bird.inViewport ? '✅ 視窗內' : '❌ 視窗外';
            console.log(`  鳥 ${bird.index}: (${bird.x.toFixed(0)}, ${bird.y.toFixed(0)}) ${status}`);
        });
        
        const visibleAfterScroll = afterScrollBirds.filter(b => b.inViewport);
        console.log(`\n🎯 滾動後視窗內鳥群數量: ${visibleAfterScroll.length}/${afterScrollBirds.length}`);
    }
    
    // 保持頁面開啟15秒供觀察
    console.log('\n⏰ 頁面將保持開啟15秒供觀察...');
    await page.waitForTimeout(15000);
    
    await browser.close();
    console.log('✨ 測試完成！');
}

visualBirdTest().catch(console.error);