const { chromium } = require('playwright');
const path = require('path');

async function screenshotBirds() {
    console.log('📸 截圖檢查鳥群表情...\n');
    
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
    await page.waitForTimeout(3000);
    
    // 滾動到頂部查看鳥群
    console.log('⬆️  滾動到頂部...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);
    
    // 添加視覺邊框和標記來突出鳥群
    await page.addStyleTag({
        content: `
            .bird-wrapper { 
                border: 3px solid red !important; 
                background: rgba(255,0,0,0.2) !important;
            }
            .head {
                border: 2px solid blue !important;
                background-color: rgba(0,0,255,0.3) !important;
            }
            .bird {
                border: 1px solid yellow !important;
            }
            body::before {
                content: "鳥群視覺測試 - 紅框=鳥群容器, 藍框=頭部";
                position: fixed;
                top: 10px;
                left: 10px;
                background: yellow;
                padding: 10px;
                z-index: 9999;
                font-size: 14px;
                border: 2px solid black;
            }
        `
    });
    
    await page.waitForTimeout(1000);
    
    // 截圖1: 整體頁面
    console.log('📸 截圖1: 整體頁面視圖');
    await page.screenshot({ 
        path: '/mnt/c/Users/TIM_PC/Desktop/book/tools/codepen-analyzer/bird-screenshot-1-overview.png',
        fullPage: false
    });
    
    // 尋找鳥群並放大截圖
    const birdPositions = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        return Array.from(birds).map((bird, i) => {
            const rect = bird.getBoundingClientRect();
            const inViewport = rect.top >= 0 && rect.top <= window.innerHeight && 
                             rect.left >= 0 && rect.left <= window.innerWidth;
            return {
                id: i,
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                inViewport,
                className: bird.className
            };
        }).filter(bird => bird.inViewport);
    });
    
    console.log('\n🐦 可見鳥群狀態:');
    birdPositions.forEach(bird => {
        console.log(`   鳥 ${bird.id}: (${Math.round(bird.x)}, ${Math.round(bird.y)}) ${bird.width}x${bird.height} - ${bird.className}`);
    });
    
    if (birdPositions.length > 0) {
        // 截圖2: 放大第一隻鳥
        const firstBird = birdPositions[0];
        console.log(`\n📸 截圖2: 放大鳥 ${firstBird.id}`);
        
        await page.screenshot({ 
            path: '/mnt/c/Users/TIM_PC/Desktop/book/tools/codepen-analyzer/bird-screenshot-2-closeup.png',
            clip: {
                x: Math.max(0, firstBird.x - 50),
                y: Math.max(0, firstBird.y - 50), 
                width: 200,
                height: 150
            }
        });
        
        // 截圖3: 顯示所有可見鳥群的詳細狀態
        await page.evaluate(() => {
            // 為每隻鳥添加ID標籤
            document.querySelectorAll('.bird-wrapper').forEach((bird, i) => {
                const rect = bird.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight) {
                    const label = document.createElement('div');
                    label.style.cssText = `
                        position: fixed;
                        left: ${rect.left + rect.width + 5}px;
                        top: ${rect.top}px;
                        background: black;
                        color: white;
                        padding: 2px 5px;
                        font-size: 12px;
                        z-index: 10000;
                        border: 1px solid white;
                    `;
                    label.textContent = `Bird ${i}: ${bird.className.split(' ').slice(1).join(' ')}`;
                    document.body.appendChild(label);
                }
            });
        });
        
        await page.waitForTimeout(500);
        
        console.log('📸 截圖3: 帶標籤的鳥群詳情');
        await page.screenshot({ 
            path: '/mnt/c/Users/TIM_PC/Desktop/book/tools/codepen-analyzer/bird-screenshot-3-labeled.png',
            fullPage: false
        });
    }
    
    // 檢查像素藝術是否正確載入
    const pixelArtCheck = await page.evaluate(() => {
        const heads = document.querySelectorAll('.head');
        return Array.from(heads).map((head, i) => {
            const style = window.getComputedStyle(head);
            return {
                id: i,
                backgroundImage: style.backgroundImage.substring(0, 50) + '...',
                backgroundPosition: style.backgroundPosition,
                backgroundSize: style.backgroundSize,
                width: style.width,
                height: style.height,
                visible: style.display !== 'none' && style.opacity !== '0'
            };
        });
    });
    
    console.log('\n🎨 像素藝術載入狀態:');
    pixelArtCheck.forEach(head => {
        console.log(`   頭部 ${head.id}: 圖片=${head.backgroundImage.includes('data:image') ? '✅ 載入' : '❌ 未載入'} 位置=${head.backgroundPosition} 大小=${head.backgroundSize} 可見=${head.visible}`);
    });
    
    // 等待並檢查表情變化
    console.log('\n⏳ 等待5秒檢查表情變化...');
    await page.waitForTimeout(5000);
    
    console.log('📸 截圖4: 5秒後的表情狀態');
    await page.screenshot({ 
        path: '/mnt/c/Users/TIM_PC/Desktop/book/tools/codepen-analyzer/bird-screenshot-4-after-wait.png',
        fullPage: false
    });
    
    // 最終狀態檢查
    const finalCheck = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird-wrapper');
        return Array.from(birds).map((bird, i) => {
            const head = bird.querySelector('.head');
            const headStyle = head ? window.getComputedStyle(head) : null;
            return {
                id: i,
                className: bird.className,
                hasHead: !!head,
                headBackgroundImage: headStyle?.backgroundImage?.includes('data:image') || false,
                headOpacity: headStyle?.opacity || '0'
            };
        });
    });
    
    console.log('\n🔍 最終檢查結果:');
    finalCheck.forEach(bird => {
        const status = bird.hasHead && bird.headBackgroundImage ? '✅' : '❌';
        console.log(`   鳥 ${bird.id}: ${status} 頭部=${bird.hasHead} 圖片=${bird.headBackgroundImage} 透明度=${bird.headOpacity} 類別="${bird.className}"`);
    });
    
    await browser.close();
    
    console.log('\n📸 截圖完成！檢查以下檔案:');
    console.log('   - bird-screenshot-1-overview.png (整體視圖)');
    console.log('   - bird-screenshot-2-closeup.png (特寫)');  
    console.log('   - bird-screenshot-3-labeled.png (標籤詳情)');
    console.log('   - bird-screenshot-4-after-wait.png (等待後狀態)');
}

screenshotBirds().catch(console.error);