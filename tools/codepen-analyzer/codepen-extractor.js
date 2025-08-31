const { chromium } = require('playwright');

async function extractCodePenContent(url) {
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
  
  await page.setExtraHTTPHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive'
  });
  
  try {
    console.log('🔄 Loading CodePen:', url);
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    // 等待頁面完全載入
    await page.waitForTimeout(5000);
    
    console.log('📄 Page loaded:', await page.title());
    
    // 提取基本信息
    const penInfo = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        author: document.querySelector('.pen-owner-link, [data-test-id="pen-owner"]')?.textContent?.trim() || 'Unknown'
      };
    });
    
    console.log('👤 Author:', penInfo.author);
    
    // 多種策略提取代碼內容
    const codeContent = await page.evaluate(() => {
      const results = { html: '', css: '', js: '' };
      
      // 策略 1: 查找 CodeMirror 編輯器
      const codeMirrors = document.querySelectorAll('.CodeMirror');
      console.log('Found', codeMirrors.length, 'CodeMirror editors');
      
      codeMirrors.forEach((cm, index) => {
        const editor = cm.CodeMirror;
        if (editor) {
          const content = editor.getValue();
          const wrapper = cm.closest('[data-type], .editor-wrapper, .box-html, .box-css, .box-js');
          
          if (wrapper) {
            const type = wrapper.getAttribute('data-type') || 
                        (wrapper.className.includes('html') ? 'html' : 
                         wrapper.className.includes('css') ? 'css' : 
                         wrapper.className.includes('js') ? 'js' : '');
            
            if (type && results[type] === '') {
              results[type] = content;
              console.log('Extracted', type, 'content:', content.length, 'characters');
            }
          }
        }
      });
      
      // 策略 2: 查找預填充的 textarea 或 input
      if (!results.html || !results.css || !results.js) {
        const textareas = document.querySelectorAll('textarea, pre[contenteditable]');
        textareas.forEach(textarea => {
          const content = textarea.value || textarea.textContent || '';
          if (content.trim().length > 10) {
            const wrapper = textarea.closest('[data-type], .editor-wrapper, .box-html, .box-css, .box-js');
            if (wrapper) {
              const type = wrapper.getAttribute('data-type') || 
                          (wrapper.className.includes('html') ? 'html' : 
                           wrapper.className.includes('css') ? 'css' : 
                           wrapper.className.includes('js') ? 'js' : '');
              
              if (type && results[type] === '') {
                results[type] = content;
                console.log('Extracted from textarea', type, ':', content.length, 'characters');
              }
            }
          }
        });
      }
      
      // 策略 3: 查找隱藏的代碼容器
      if (!results.html || !results.css || !results.js) {
        ['html', 'css', 'js'].forEach(type => {
          if (results[type] === '') {
            const selectors = [
              `#${type}-editor .CodeMirror`,
              `[data-type="${type}"] .CodeMirror`,
              `.editor-${type} .CodeMirror`,
              `.box-${type} .CodeMirror`,
              `#${type}`,
              `[data-lang="${type}"]`,
              `.language-${type}`
            ];
            
            for (const selector of selectors) {
              const element = document.querySelector(selector);
              if (element) {
                const content = element.CodeMirror?.getValue() || 
                               element.textContent || 
                               element.innerText || '';
                if (content.trim().length > 0) {
                  results[type] = content.trim();
                  console.log('Found', type, 'via selector:', selector);
                  break;
                }
              }
            }
          }
        });
      }
      
      return results;
    });
    
    // 分析預覽效果
    const previewAnalysis = await page.evaluate(() => {
      const preview = document.querySelector('#result, .result, .preview, iframe[title*="preview"]');
      const analysis = {
        hasPreview: !!preview,
        backgroundColor: '',
        colors: [],
        animations: false,
        responsiveDesign: false
      };
      
      if (preview) {
        try {
          // 嘗試分析預覽內容
          const computedStyle = window.getComputedStyle(document.body);
          analysis.backgroundColor = computedStyle.backgroundColor;
          
          // 檢查是否有動畫
          const animatedElements = document.querySelectorAll('*');
          for (let el of animatedElements) {
            const style = window.getComputedStyle(el);
            if (style.animation !== 'none' || style.transform !== 'none') {
              analysis.animations = true;
              break;
            }
          }
        } catch (e) {
          console.log('Preview analysis error:', e.message);
        }
      }
      
      return analysis;
    });
    
    // 編譯結果
    const result = {
      success: true,
      penInfo,
      code: codeContent,
      preview: previewAnalysis,
      extractedAt: new Date().toISOString()
    };
    
    console.log('✅ Extraction completed!');
    console.log('📊 Results:');
    console.log('  HTML:', result.code.html.length, 'characters');
    console.log('  CSS:', result.code.css.length, 'characters');
    console.log('  JS:', result.code.js.length, 'characters');
    
    return result;
    
  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    return {
      success: false,
      error: error.message,
      penInfo: null,
      code: { html: '', css: '', js: '' },
      preview: null
    };
  } finally {
    await browser.close();
  }
}

// 分析設計風格
function analyzeDesignStyle(extractedData) {
  if (!extractedData.success) {
    return { analysis: 'Extraction failed', suggestions: [] };
  }
  
  const { code, penInfo } = extractedData;
  const analysis = {
    title: penInfo.title,
    author: penInfo.author,
    codeLength: {
      html: code.html.length,
      css: code.css.length,
      js: code.js.length
    },
    designElements: [],
    suggestedIntegration: []
  };
  
  // CSS 分析
  if (code.css) {
    const css = code.css.toLowerCase();
    
    // 色彩分析
    const colors = css.match(/#[0-9a-f]{3,6}|rgba?\([^)]+\)|hsla?\([^)]+\)/gi) || [];
    analysis.designElements.push(`使用了 ${colors.length} 種顏色`);
    
    // 動畫檢測
    if (css.includes('animation') || css.includes('@keyframes') || css.includes('transform')) {
      analysis.designElements.push('包含動畫效果');
    }
    
    // 響應式設計
    if (css.includes('@media') || css.includes('clamp(') || css.includes('vw') || css.includes('vh')) {
      analysis.designElements.push('具有響應式設計');
    }
    
    // 現代 CSS 特性
    if (css.includes('grid') || css.includes('flexbox') || css.includes('flex')) {
      analysis.designElements.push('使用現代 CSS 佈局');
    }
  }
  
  // 整合建議
  analysis.suggestedIntegration = [
    '可以作為新的實驗性風格整合到 prototypes/',
    '適合用於創意配置器的靈感來源',
    '可以提取色彩搭配用於現有風格系統'
  ];
  
  return analysis;
}

// 主函數
async function main() {
  const url = process.argv[2] || 'https://codepen.io/Ma5a/pen/yyYEoZo';
  
  console.log('🎯 Starting CodePen extraction for:', url);
  const extractedData = await extractCodePenContent(url);
  
  if (extractedData.success) {
    console.log('\n📝 CODE EXTRACTION RESULTS:');
    console.log('=' .repeat(50));
    
    if (extractedData.code.html) {
      console.log('\n🌐 HTML CODE:');
      console.log('-'.repeat(30));
      console.log(extractedData.code.html);
    }
    
    if (extractedData.code.css) {
      console.log('\n🎨 CSS CODE:');
      console.log('-'.repeat(30));
      console.log(extractedData.code.css);
    }
    
    if (extractedData.code.js) {
      console.log('\n⚡ JAVASCRIPT CODE:');
      console.log('-'.repeat(30));
      console.log(extractedData.code.js);
    }
    
    console.log('\n🔍 DESIGN ANALYSIS:');
    console.log('-'.repeat(30));
    const styleAnalysis = analyzeDesignStyle(extractedData);
    console.log(JSON.stringify(styleAnalysis, null, 2));
    
  } else {
    console.log('💔 Extraction failed:', extractedData.error);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { extractCodePenContent, analyzeDesignStyle };