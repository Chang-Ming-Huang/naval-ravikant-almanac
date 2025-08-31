const { chromium } = require('playwright');
const path = require('path');

async function testScrollBirds() {
    console.log('🔄 測試滾動鳥群頁面...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', 'scroll_birds_original.html');
    
    console.log('📖 載入滾動鳥群頁面...');
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(3000);
    
    // 檢查鳥群狀態
    const birdStatus = await page.evaluate(() => {
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
                    x: Math.round(rect.left),
                    y: Math.round(rect.top),
                    inViewport,
                    visible: rect.width > 0 && rect.height > 0
                };
            }),
            totalSections: document.querySelectorAll('section').length,
            totalPerches: document.querySelectorAll('.perch').length
        };
    });
    
    console.log(`🏗️  頁面結構: ${birdStatus.totalSections} 個區段, ${birdStatus.totalPerches} 個棲息點`);
    console.log(`📺 視窗: ${birdStatus.viewport.width}x${birdStatus.viewport.height}, 滾動: ${birdStatus.viewport.scrollY}`);
    console.log('🐦 鳥群初始狀態:');
    
    let visibleCount = 0;
    birdStatus.birds.forEach(bird => {
        const status = bird.inViewport ? '✅ 視窗內' : '❌ 視窗外';
        if (bird.inViewport) visibleCount++;
        console.log(`  鳥 ${bird.index}: (${bird.x}, ${bird.y}) ${status} ${bird.visible ? '可見' : '隱藏'}`);
    });
    
    console.log(`\n🎯 視窗內鳥群數量: ${visibleCount}/${birdStatus.birds.length}\n`);
    
    // 測試滾動效果
    console.log('⬇️  測試向下滾動...');
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(2000);
    
    // 檢查滾動後狀態
    const afterScrollStatus = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        let flying = 0;
        birds.forEach(bird => {
            if (bird.classList.contains('fly')) {
                flying++;
            }
        });
        return {
            flying,
            scrollY: window.scrollY
        };
    });
    
    console.log(`📍 滾動後位置: ${afterScrollStatus.scrollY}px`);
    console.log(`✈️  飛行中的鳥: ${afterScrollStatus.flying} 隻\n`);
    
    // 測試向上滾動
    console.log('⬆️  測試向上滾動...');
    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(2000);
    
    const upScrollStatus = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        let flying = 0;
        birds.forEach(bird => {
            if (bird.classList.contains('fly')) {
                flying++;
            }
        });
        return {
            flying,
            scrollY: window.scrollY
        };
    });
    
    console.log(`📍 向上滾動後位置: ${upScrollStatus.scrollY}px`);
    console.log(`✈️  飛行中的鳥: ${upScrollStatus.flying} 隻\n`);
    
    // 保持頁面開啟15秒供觀察
    console.log('⏰ 頁面將保持開啟15秒供觀察...');
    await page.waitForTimeout(15000);
    
    await browser.close();
    console.log('✨ 滾動鳥群測試完成！');
}

testScrollBirds().catch(console.error);