const { chromium } = require('playwright');
const path = require('path');

async function debugCSS() {
    console.log('🔍 調試 CSS 計算值...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', 'scroll_birds_original.html');
    
    await page.goto(`file://${filePath}`);
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);
    
    // 調試 CSS 變數和計算值
    const cssDebug = await page.evaluate(() => {
        const birds = document.querySelectorAll('.bird');
        const wrappers = document.querySelectorAll('.bird-wrapper');
        
        return {
            totalBirds: birds.length,
            totalWrappers: wrappers.length,
            firstBirdDetails: birds[0] ? {
                // CSS 變數
                cssVariables: {
                    m: window.getComputedStyle(birds[0]).getPropertyValue('--m'),
                    w: window.getComputedStyle(birds[0]).getPropertyValue('--w'), 
                    h: window.getComputedStyle(birds[0]).getPropertyValue('--h')
                },
                // 計算後的樣式
                computedStyle: {
                    width: window.getComputedStyle(birds[0]).width,
                    height: window.getComputedStyle(birds[0]).height,
                    marginTop: window.getComputedStyle(birds[0]).marginTop,
                    marginLeft: window.getComputedStyle(birds[0]).marginLeft
                },
                // 實際位置
                boundingRect: birds[0].getBoundingClientRect(),
                // HTML 結構
                innerHTML: birds[0].innerHTML.substring(0, 200)
            } : null,
            firstWrapperDetails: wrappers[0] ? {
                computedStyle: {
                    width: window.getComputedStyle(wrappers[0]).width,
                    height: window.getComputedStyle(wrappers[0]).height,
                    transform: window.getComputedStyle(wrappers[0]).transform
                },
                boundingRect: wrappers[0].getBoundingClientRect(),
                className: wrappers[0].className
            } : null,
            headDetails: birds[0] ? {
                head: birds[0].querySelector('.head') ? {
                    cssVariables: {
                        m: window.getComputedStyle(birds[0].querySelector('.head')).getPropertyValue('--m'),
                        w: window.getComputedStyle(birds[0].querySelector('.head')).getPropertyValue('--w'),
                        h: window.getComputedStyle(birds[0].querySelector('.head')).getPropertyValue('--h')
                    },
                    computedStyle: {
                        width: window.getComputedStyle(birds[0].querySelector('.head')).width,
                        height: window.getComputedStyle(birds[0].querySelector('.head')).height,
                        backgroundImage: window.getComputedStyle(birds[0].querySelector('.head')).backgroundImage.substring(0, 50) + '...',
                        backgroundSize: window.getComputedStyle(birds[0].querySelector('.head')).backgroundSize,
                        backgroundPosition: window.getComputedStyle(birds[0].querySelector('.head')).backgroundPosition
                    },
                    boundingRect: birds[0].querySelector('.head').getBoundingClientRect()
                } : 'no head found'
            } : null
        };
    });
    
    console.log('🐦 鳥群基本資訊:');
    console.log(`   總鳥數: ${cssDebug.totalBirds}`);
    console.log(`   總容器數: ${cssDebug.totalWrappers}`);
    
    if (cssDebug.firstBirdDetails) {
        console.log('\n🎯 第一隻鳥詳細資訊:');
        console.log('   CSS 變數:');
        console.log(`     --m: "${cssDebug.firstBirdDetails.cssVariables.m}"`);
        console.log(`     --w: "${cssDebug.firstBirdDetails.cssVariables.w}"`);  
        console.log(`     --h: "${cssDebug.firstBirdDetails.cssVariables.h}"`);
        
        console.log('   計算後樣式:');
        console.log(`     width: ${cssDebug.firstBirdDetails.computedStyle.width}`);
        console.log(`     height: ${cssDebug.firstBirdDetails.computedStyle.height}`);
        console.log(`     marginTop: ${cssDebug.firstBirdDetails.computedStyle.marginTop}`);
        console.log(`     marginLeft: ${cssDebug.firstBirdDetails.computedStyle.marginLeft}`);
        
        console.log('   實際邊界:');
        const rect = cssDebug.firstBirdDetails.boundingRect;
        console.log(`     位置: (${Math.round(rect.x)}, ${Math.round(rect.y)})`);
        console.log(`     尺寸: ${Math.round(rect.width)} x ${Math.round(rect.height)}`);
    }
    
    if (cssDebug.firstWrapperDetails) {
        console.log('\n📦 第一個容器詳細資訊:');
        console.log('   計算後樣式:');
        console.log(`     width: ${cssDebug.firstWrapperDetails.computedStyle.width}`);
        console.log(`     height: ${cssDebug.firstWrapperDetails.computedStyle.height}`);
        console.log(`     transform: ${cssDebug.firstWrapperDetails.computedStyle.transform}`);
        
        console.log('   實際邊界:');
        const rect = cssDebug.firstWrapperDetails.boundingRect;
        console.log(`     位置: (${Math.round(rect.x)}, ${Math.round(rect.y)})`);
        console.log(`     尺寸: ${Math.round(rect.width)} x ${Math.round(rect.height)}`);
        console.log(`     類別: ${cssDebug.firstWrapperDetails.className}`);
    }
    
    if (cssDebug.headDetails && cssDebug.headDetails.head) {
        console.log('\n🎭 頭部詳細資訊:');
        console.log('   CSS 變數:');
        console.log(`     --m: "${cssDebug.headDetails.head.cssVariables.m}"`);
        console.log(`     --w: "${cssDebug.headDetails.head.cssVariables.w}"`);
        console.log(`     --h: "${cssDebug.headDetails.head.cssVariables.h}"`);
        
        console.log('   計算後樣式:');
        console.log(`     width: ${cssDebug.headDetails.head.computedStyle.width}`);
        console.log(`     height: ${cssDebug.headDetails.head.computedStyle.height}`);
        console.log(`     backgroundSize: ${cssDebug.headDetails.head.computedStyle.backgroundSize}`);
        console.log(`     backgroundPosition: ${cssDebug.headDetails.head.computedStyle.backgroundPosition}`);
        
        console.log('   實際邊界:');
        const rect = cssDebug.headDetails.head.boundingRect;
        console.log(`     位置: (${Math.round(rect.x)}, ${Math.round(rect.y)})`);
        console.log(`     尺寸: ${Math.round(rect.width)} x ${Math.round(rect.height)}`);
    }
    
    // 手動設置更大的尺寸來測試
    console.log('\n🔧 手動測試更大尺寸...');
    await page.addStyleTag({
        content: `
            .bird {
                --m: 4 !important;
            }
            .tail {
                --m: 4 !important;
            }
        `
    });
    
    await page.waitForTimeout(1000);
    
    const afterChange = await page.evaluate(() => {
        const bird = document.querySelector('.bird');
        const wrapper = document.querySelector('.bird-wrapper');
        if (bird && wrapper) {
            return {
                birdRect: bird.getBoundingClientRect(),
                wrapperRect: wrapper.getBoundingClientRect(),
                birdWidth: window.getComputedStyle(bird).width,
                birdHeight: window.getComputedStyle(bird).height
            };
        }
        return null;
    });
    
    if (afterChange) {
        console.log('   修改後的尺寸:');
        console.log(`     鳥: ${Math.round(afterChange.birdRect.width)} x ${Math.round(afterChange.birdRect.height)}`);
        console.log(`     容器: ${Math.round(afterChange.wrapperRect.width)} x ${Math.round(afterChange.wrapperRect.height)}`);
        console.log(`     CSS width: ${afterChange.birdWidth}`);
        console.log(`     CSS height: ${afterChange.birdHeight}`);
    }
    
    console.log('\n📸 最終測試截圖...');
    await page.screenshot({ 
        path: '/mnt/c/Users/TIM_PC/Desktop/book/tools/codepen-analyzer/css-debug-screenshot.png',
        fullPage: false
    });
    
    await browser.close();
    console.log('✨ CSS 調試完成！');
}

debugCSS().catch(console.error);