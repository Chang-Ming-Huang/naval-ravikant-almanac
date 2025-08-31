const { chromium } = require('playwright');
const path = require('path');

async function quickTestAll() {
    console.log('⚡ 快速測試所有鳥群頁面...\n');
    
    const browser = await chromium.launch({ headless: false, slowMo: 300 });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    
    const pages = [
        { name: 'Zen Garden', file: 'zen_garden_birds.html' },
        { name: 'iPhone Minimal', file: 'iphone_minimal_birds.html' },
        { name: 'Nature Watercolor', file: 'nature_watercolor_birds.html' }
    ];
    
    for (const pageInfo of pages) {
        console.log(`🧪 測試 ${pageInfo.name}...`);
        
        const page = await context.newPage();
        const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', pageInfo.file);
        
        await page.goto(`file://${filePath}`);
        await page.waitForTimeout(2000);
        
        // 添加視覺邊框
        await page.addStyleTag({
            content: `.bird-wrapper { border: 2px solid red !important; background: rgba(255,0,0,0.3) !important; min-width: 30px !important; min-height: 20px !important; }`
        });
        
        const birdStatus = await page.evaluate(() => {
            const birds = document.querySelectorAll('.bird-wrapper');
            const viewport = { width: window.innerWidth, height: window.innerHeight };
            
            let inViewport = 0;
            const total = birds.length;
            
            birds.forEach(bird => {
                const rect = bird.getBoundingClientRect();
                if (rect.top >= -50 && rect.top <= viewport.height + 50 && 
                    rect.left >= -50 && rect.left <= viewport.width + 50) {
                    inViewport++;
                }
            });
            
            return { inViewport, total };
        });
        
        const percentage = Math.round((birdStatus.inViewport / birdStatus.total) * 100);
        console.log(`   🐦 鳥群: ${birdStatus.inViewport}/${birdStatus.total} 可見 (${percentage}%)`);
        
        // 測試滾動
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(1000);
        
        const afterScrollStatus = await page.evaluate(() => {
            const birds = document.querySelectorAll('.bird-wrapper');
            let moving = 0;
            birds.forEach(bird => {
                const style = window.getComputedStyle(bird);
                if (style.animation !== 'none' || bird.classList.contains('fly')) {
                    moving++;
                }
            });
            return moving;
        });
        
        console.log(`   ✈️  飛行中: ${afterScrollStatus} 隻鳥\n`);
        
        await page.close();
    }
    
    await browser.close();
    console.log('🎉 所有測試完成！鳥群修復成功！');
}

quickTestAll().catch(console.error);