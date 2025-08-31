const { chromium } = require('playwright');
const path = require('path');

async function debugBirdPositions() {
    console.log('🔍 調試鳥群位置問題...\n');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    
    // 測試 Zen Garden Birds
    const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', 'zen_garden_birds.html');
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(3000);
    
    // 獲取詳細的調試信息
    const debugInfo = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        const verses = document.querySelectorAll('.zen-verse');
        const windowInfo = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollY: window.scrollY,
            bodyHeight: document.body.scrollHeight
        };
        
        const verseInfo = Array.from(verses).map((verse, i) => {
            const rect = verse.getBoundingClientRect();
            return {
                index: i,
                top: rect.top,
                bottom: rect.bottom,
                scrollTop: rect.top + window.scrollY,
                scrollBottom: rect.bottom + window.scrollY,
                centerY: rect.top + window.scrollY + rect.height / 2
            };
        });
        
        const birdInfo = Array.from(birds).map((bird, i) => {
            const rect = bird.getBoundingClientRect();
            const style = window.getComputedStyle(bird);
            return {
                index: i,
                screenX: rect.left,
                screenY: rect.top,
                scrollX: rect.left + window.scrollX,
                scrollY: rect.top + window.scrollY,
                transform: style.transform,
                display: style.display,
                opacity: style.opacity,
                zIndex: style.zIndex
            };
        });
        
        return { windowInfo, verseInfo, birdInfo };
    });
    
    console.log('📊 窗口信息:');
    console.log(`   寬度: ${debugInfo.windowInfo.innerWidth}px`);
    console.log(`   高度: ${debugInfo.windowInfo.innerHeight}px`);  
    console.log(`   滾動: ${debugInfo.windowInfo.scrollY}px`);
    console.log(`   頁面高度: ${debugInfo.windowInfo.bodyHeight}px\n`);
    
    console.log('📝 詩句區域位置:');
    debugInfo.verseInfo.forEach(verse => {
        console.log(`   詩句 ${verse.index}: 螢幕 ${verse.top.toFixed(0)}~${verse.bottom.toFixed(0)}, 滾動 ${verse.scrollTop.toFixed(0)}~${verse.scrollBottom.toFixed(0)}, 中心 ${verse.centerY.toFixed(0)}`);
    });
    
    console.log('\n🐦 鳥群位置:');
    debugInfo.birdInfo.forEach(bird => {
        const inViewport = bird.screenY >= 0 && bird.screenY <= debugInfo.windowInfo.innerHeight;
        console.log(`   鳥 ${bird.index}: 螢幕Y ${bird.screenY.toFixed(0)}, 滾動Y ${bird.scrollY.toFixed(0)}, 視窗內=${inViewport}`);
    });
    
    // 測試滾動到第一個詩句
    console.log('\n🖱️ 滾動到第一個詩句...');
    if (debugInfo.verseInfo.length > 0) {
        const firstVerse = debugInfo.verseInfo[0];
        await page.evaluate((scrollTo) => {
            window.scrollTo(0, scrollTo - window.innerHeight / 2);
        }, firstVerse.centerY);
        
        await page.waitForTimeout(2000);
        
        const afterScrollInfo = await page.evaluate(() => {
            const birds = document.querySelectorAll('.bird-wrapper');
            return Array.from(birds).map((bird, i) => {
                const rect = bird.getBoundingClientRect();
                return {
                    index: i,
                    screenY: rect.top,
                    inViewport: rect.top >= 0 && rect.top <= window.innerHeight
                };
            });
        });
        
        console.log('滾動後鳥群位置:');
        afterScrollInfo.forEach(bird => {
            console.log(`   鳥 ${bird.index}: 螢幕Y ${bird.screenY.toFixed(0)}, 視窗內=${bird.inViewport}`);
        });
    }
    
    await page.waitForTimeout(5000); // 保持頁面開啟5秒供觀察
    await browser.close();
}

debugBirdPositions().catch(console.error);