const { chromium } = require('playwright');
const path = require('path');

async function debugScrollBirds() {
    console.log('🔍 深度調試滾動鳥群...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', 'scroll_birds_original.html');
    
    console.log('📖 載入頁面...');
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(5000); // 等待更長時間
    
    // 詳細調試資訊
    const debugInfo = await page.evaluate(() => {
        return {
            // DOM 結構
            sections: document.querySelectorAll('section').length,
            boxes: document.querySelectorAll('.box').length,
            birds: document.querySelectorAll('.bird-wrapper').length,
            contentWrapperHTML: document.querySelector('.content-wrapper')?.innerHTML.substring(0, 500),
            
            // 檢查 box 生成
            firstSection: document.querySelector('section')?.innerHTML.substring(0, 200),
            
            // JavaScript 是否載入
            boxesArray: typeof boxes !== 'undefined' ? 'boxes defined' : 'boxes undefined',
            birdsArray: typeof birds !== 'undefined' ? 'birds defined' : 'birds undefined',
            
            // 滾動位置
            scrollY: window.scrollY,
            viewportHeight: window.innerHeight,
            docHeight: document.body.scrollHeight,
            
            // 鳥群狀態
            birdElements: Array.from(document.querySelectorAll('.bird-wrapper')).map((bird, i) => {
                const rect = bird.getBoundingClientRect();
                return {
                    id: i,
                    className: bird.className,
                    x: Math.round(rect.left),
                    y: Math.round(rect.top),
                    style: bird.style.transform
                };
            })
        };
    });
    
    console.log('🏗️  DOM 結構:');
    console.log(`   Sections: ${debugInfo.sections}`);
    console.log(`   Boxes: ${debugInfo.boxes}`);
    console.log(`   Birds: ${debugInfo.birds}`);
    
    console.log('\n📄 內容生成:');
    console.log(`   Content wrapper: ${debugInfo.contentWrapperHTML ? '有內容' : '空的'}`);
    console.log(`   First section: ${debugInfo.firstSection || '無'}`);
    
    console.log('\n⚙️  JavaScript 狀態:');
    console.log(`   Boxes array: ${debugInfo.boxesArray}`);
    console.log(`   Birds array: ${debugInfo.birdsArray}`);
    
    console.log('\n📍 頁面狀態:');
    console.log(`   Scroll Y: ${debugInfo.scrollY}`);
    console.log(`   Viewport Height: ${debugInfo.viewportHeight}`);
    console.log(`   Document Height: ${debugInfo.docHeight}`);
    
    console.log('\n🐦 鳥群詳細狀態:');
    debugInfo.birdElements.forEach(bird => {
        console.log(`   鳥 ${bird.id}: className="${bird.className}" pos=(${bird.x}, ${bird.y}) transform="${bird.style}"`);
    });
    
    // 手動滾動到頂部查看
    console.log('\n⬆️  滾動到頂部查看...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(3000);
    
    const topInfo = await page.evaluate(() => {
        return {
            scrollY: window.scrollY,
            boxes: document.querySelectorAll('.box').length,
            visibleBirds: Array.from(document.querySelectorAll('.bird-wrapper')).filter(bird => {
                const rect = bird.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight && 
                       rect.left >= 0 && rect.left <= window.innerWidth;
            }).length
        };
    });
    
    console.log(`📍 頂部狀態: 滾動=${topInfo.scrollY}, 箱子=${topInfo.boxes}, 可見鳥=${topInfo.visibleBirds}`);
    
    // 保持開啟供觀察
    console.log('\n⏰ 頁面保持開啟20秒供觀察...');
    await page.waitForTimeout(20000);
    
    await browser.close();
    console.log('✨ 調試完成！');
}

debugScrollBirds().catch(console.error);