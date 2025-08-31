const { chromium } = require('playwright');

async function testCodePen() {
  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  // 設定額外的 headers
  await page.setExtraHTTPHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive'
  });
  
  try {
    console.log('🔄 Navigating to CodePen...');
    await page.goto('https://codepen.io/Ma5a/pen/yyYEoZo', { 
      waitUntil: 'domcontentloaded',  // 改為較寬鬆的等待條件
      timeout: 60000  // 增加超時時間
    });
    
    // 等待頁面完全載入
    await page.waitForTimeout(3000);
    
    console.log('✅ Page loaded successfully!');
    console.log('📄 Page title:', await page.title());
    console.log('🌐 Current URL:', page.url());
    
    // 檢查是否能找到 CodePen 的編輯器面板
    const htmlPanel = await page.$('#html-editor, .editor-html, [data-type="html"]');
    const cssPanel = await page.$('#css-editor, .editor-css, [data-type="css"]');
    const jsPanel = await page.$('#js-editor, .editor-js, [data-type="js"]');
    
    console.log('🔍 Editor panels found:');
    console.log('  HTML panel:', htmlPanel ? '✅' : '❌');
    console.log('  CSS panel:', cssPanel ? '✅' : '❌');  
    console.log('  JS panel:', jsPanel ? '✅' : '❌');
    
    // 檢查頁面內容
    const bodyContent = await page.content();
    console.log('📊 Page content length:', bodyContent.length);
    
    // 查找可能的代碼容器
    const codeEditors = await page.$$('.CodeMirror, .monaco-editor, pre');
    console.log('📝 Found', codeEditors.length, 'potential code editors');
    
    // 嘗試獲取一些基本信息
    const penTitle = await page.$eval('h1, .pen-title, [data-test-id="pen-title"]', el => el?.textContent || '').catch(() => 'Title not found');
    console.log('🎨 Pen title:', penTitle);
    
    return { success: true, url: page.url(), title: await page.title() };
    
  } catch (error) {
    console.error('❌ Error accessing CodePen:', error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

testCodePen().then(result => {
  if (result.success) {
    console.log('🎉 CodePen access test completed successfully!');
  } else {
    console.log('💔 CodePen access failed:', result.error);
  }
}).catch(error => {
  console.error('🚨 Script execution failed:', error);
});