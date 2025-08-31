const { chromium } = require('playwright');
const path = require('path');

async function testBirdPages() {
    console.log('🧪 開始測試鳥群頁面...\n');
    
    const browser = await chromium.launch({ 
        headless: false, // 設為 false 可以看到瀏覽器
        slowMo: 1000 // 減慢操作速度以便觀察
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const pages = [
        {
            name: 'Zen Garden Birds',
            file: 'zen_garden_birds.html',
            expectedElements: ['.bird-wrapper', '.zen-title', '.zen-verse']
        },
        {
            name: 'iPhone Minimal Birds', 
            file: 'iphone_minimal_birds.html',
            expectedElements: ['.bird-wrapper', '.dynamic-island', '.ios-card']
        },
        {
            name: 'Nature Watercolor Birds',
            file: 'nature_watercolor_birds.html', 
            expectedElements: ['.bird-wrapper', '.nature-poem', '#watercolor-canvas']
        }
    ];
    
    for (const pageInfo of pages) {
        console.log(`📖 測試頁面: ${pageInfo.name}`);
        console.log('=' .repeat(50));
        
        const page = await context.newPage();
        const filePath = path.join('/mnt/c/Users/TIM_PC/Desktop/book/prototypes', pageInfo.file);
        
        try {
            // 載入頁面
            await page.goto(`file://${filePath}`);
            await page.waitForTimeout(2000); // 等待2秒讓頁面完全載入
            
            console.log('✅ 頁面載入成功');
            
            // 檢查預期元素是否存在
            for (const selector of pageInfo.expectedElements) {
                const element = await page.$(selector);
                if (element) {
                    console.log(`✅ 找到元素: ${selector}`);
                } else {
                    console.log(`❌ 未找到元素: ${selector}`);
                }
            }
            
            // 檢查鳥群數量
            const birdCount = await page.$$eval('.bird-wrapper', elements => elements.length);
            console.log(`🐦 鳥群數量: ${birdCount}`);
            
            if (birdCount === 0) {
                console.log('❌ 警告: 沒有找到任何鳥群元素！');
                
                // 檢查 JavaScript 錯誤
                const jsErrors = [];
                page.on('pageerror', error => {
                    jsErrors.push(error.message);
                });
                
                // 重新載入頁面檢查錯誤
                await page.reload();
                await page.waitForTimeout(1000);
                
                if (jsErrors.length > 0) {
                    console.log('🚨 JavaScript 錯誤:');
                    jsErrors.forEach(error => console.log(`   - ${error}`));
                }
            }
            
            // 測試滾動行為
            console.log('🖱️ 測試滾動行為...');
            await page.mouse.move(640, 360);
            await page.mouse.click(640, 360);
            
            // 滾動頁面
            for (let i = 0; i < 5; i++) {
                await page.mouse.wheel(0, 200);
                await page.waitForTimeout(500);
                
                const currentBirdCount = await page.$$eval('.bird-wrapper', elements => {
                    return elements.filter(el => {
                        const style = window.getComputedStyle(el);
                        return style.display !== 'none' && style.opacity !== '0';
                    }).length;
                });
                
                console.log(`   滾動 ${i + 1}: 可見鳥群數量 ${currentBirdCount}`);
            }
            
            // 檢查鳥群位置
            const birdPositions = await page.$$eval('.bird-wrapper', elements => {
                return elements.map((el, index) => {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    return {
                        index,
                        x: rect.left,
                        y: rect.top,
                        visible: style.display !== 'none' && style.opacity !== '0',
                        transform: style.transform
                    };
                });
            });
            
            console.log('🎯 鳥群位置信息:');
            birdPositions.forEach(bird => {
                console.log(`   鳥 ${bird.index}: x=${bird.x.toFixed(0)}, y=${bird.y.toFixed(0)}, 可見=${bird.visible}, transform=${bird.transform}`);
            });
            
        } catch (error) {
            console.log(`❌ 測試失敗: ${error.message}`);
        }
        
        await page.close();
        console.log('\n');
    }
    
    await browser.close();
    console.log('🎉 測試完成！');
}

// 執行測試
testBirdPages().catch(console.error);