// 通用 CodePen 分析器 - 供用戶直接使用
const { extractCodePenContent, analyzeDesignStyle } = require('./codepen-extractor');

async function analyzeCodePen(url) {
  console.log('\n🎯 開始分析 CodePen:', url);
  console.log('=' . repeat(60));
  
  const extractedData = await extractCodePenContent(url);
  
  if (!extractedData.success) {
    console.error('💔 提取失敗:', extractedData.error);
    return null;
  }
  
  // 基本信息
  console.log('\n📋 基本資訊:');
  console.log('  📝 標題:', extractedData.penInfo.title);
  console.log('  👤 作者:', extractedData.penInfo.author);
  console.log('  🌐 URL:', extractedData.penInfo.url);
  
  // 代碼統計
  console.log('\n📊 代碼統計:');
  console.log('  🌐 HTML:', extractedData.code.html.length, '字符');
  console.log('  🎨 CSS:', extractedData.code.css.length, '字符');  
  console.log('  ⚡ JS:', extractedData.code.js.length, '字符');
  
  // 設計分析
  const styleAnalysis = analyzeDesignStyle(extractedData);
  console.log('\n🔍 設計分析:');
  console.log('  🎨 設計元素:', styleAnalysis.designElements.join(', '));
  
  // 詳細的設計特徵分析
  const detailedAnalysis = performDetailedAnalysis(extractedData.code);
  console.log('\n🎭 詳細設計特徵:');
  Object.entries(detailedAnalysis).forEach(([key, value]) => {
    console.log(`  ${getEmoji(key)} ${key}:`, value);
  });
  
  // 整合建議
  console.log('\n💡 整合建議:');
  const integrationSuggestions = generateIntegrationSuggestions(extractedData, detailedAnalysis);
  integrationSuggestions.forEach((suggestion, i) => {
    console.log(`  ${i + 1}. ${suggestion}`);
  });
  
  // 如果您想要完整代碼，設定這個標志為 true
  const showFullCode = true;
  if (showFullCode) {
    console.log('\n📝 完整代碼:');
    if (extractedData.code.html.trim()) {
      console.log('\n🌐 HTML:');
      console.log(extractedData.code.html);
    }
    if (extractedData.code.css.trim()) {
      console.log('\n🎨 CSS:');
      console.log(extractedData.code.css);
    }
    if (extractedData.code.js.trim()) {
      console.log('\n⚡ JavaScript:');
      console.log(extractedData.code.js);
    }
  }
  
  return {
    ...extractedData,
    styleAnalysis,
    detailedAnalysis,
    integrationSuggestions
  };
}

function performDetailedAnalysis(code) {
  const analysis = {};
  
  if (code.css) {
    const css = code.css.toLowerCase();
    
    // 色彩分析
    const colorMatches = css.match(/#[0-9a-f]{3,6}|rgba?\([^)]+\)|hsla?\([^)]+\)/gi) || [];
    analysis['色彩搭配'] = `${colorMatches.length} 種顏色`;
    
    // 動畫複雜度
    const animations = css.match(/@keyframes|animation:|transform:|transition:/gi) || [];
    analysis['動畫複雜度'] = animations.length > 20 ? '高' : animations.length > 5 ? '中' : '低';
    
    // 佈局方式
    const layoutTypes = [];
    if (css.includes('grid')) layoutTypes.push('Grid');
    if (css.includes('flex')) layoutTypes.push('Flexbox');
    if (css.includes('position: absolute') || css.includes('position: fixed')) layoutTypes.push('絕對定位');
    analysis['佈局方式'] = layoutTypes.join(', ') || '標準流';
    
    // 響應式設計
    const responsiveFeatures = [];
    if (css.includes('@media')) responsiveFeatures.push('媒體查詢');
    if (css.includes('clamp(')) responsiveFeatures.push('流暢尺寸');
    if (css.includes('vw') || css.includes('vh')) responsiveFeatures.push('視窗單位');
    analysis['響應式特性'] = responsiveFeatures.join(', ') || '無';
    
    // CSS 現代化程度
    const modernFeatures = [];
    if (css.includes('var(--')) modernFeatures.push('CSS變數');
    if (css.includes('backdrop-filter')) modernFeatures.push('背景濾鏡');
    if (css.includes('clip-path')) modernFeatures.push('裁切路徑');
    if (css.includes('filter:')) modernFeatures.push('濾鏡效果');
    analysis['現代CSS特性'] = modernFeatures.join(', ') || '基礎';
  }
  
  if (code.js) {
    const js = code.js;
    
    // JavaScript 複雜度
    const jsComplexity = js.length > 5000 ? '高' : js.length > 1000 ? '中' : '低';
    analysis['JS複雜度'] = jsComplexity;
    
    // 互動性
    const interactions = [];
    if (js.includes('addEventListener')) interactions.push('事件監聽');
    if (js.includes('scroll')) interactions.push('滾動互動');
    if (js.includes('mouse') || js.includes('click')) interactions.push('滑鼠互動');
    if (js.includes('setTimeout') || js.includes('setInterval')) interactions.push('時間控制');
    analysis['互動特性'] = interactions.join(', ') || '靜態';
  }
  
  return analysis;
}

function generateIntegrationSuggestions(extractedData, detailedAnalysis) {
  const suggestions = [];
  const { code } = extractedData;
  
  // 基於代碼長度的建議
  if (code.css.length > 10000) {
    suggestions.push('🎨 CSS 代碼豐富，適合作為獨立的實驗性風格整合到 prototypes/');
  }
  
  if (code.js.length > 5000) {
    suggestions.push('⚡ JavaScript 邏輯複雜，可以提取核心概念用於創意配置器');
  }
  
  // 基於設計特徵的建議
  if (detailedAnalysis['動畫複雜度'] === '高') {
    suggestions.push('🎭 動畫效果豐富，可以提取關鍵動畫用於現有風格系統');
  }
  
  if (detailedAnalysis['響應式特性'] !== '無') {
    suggestions.push('📱 響應式設計良好，可以作為其他風格的參考範例');
  }
  
  if (detailedAnalysis['現代CSS特性'] !== '基礎') {
    suggestions.push('🔮 使用現代 CSS 特性，符合高級設計原則的要求');
  }
  
  // 通用建議
  suggestions.push('🧪 可以在創意實驗室中展示，供用戶靈感參考');
  suggestions.push('🎯 提取設計理念融入維度驅動系統的新組合');
  
  return suggestions;
}

function getEmoji(key) {
  const emojiMap = {
    '色彩搭配': '🎨',
    '動畫複雜度': '🎭', 
    '佈局方式': '📐',
    '響應式特性': '📱',
    '現代CSS特性': '🔮',
    'JS複雜度': '⚡',
    '互動特性': '🖱️'
  };
  return emojiMap[key] || '🔹';
}

// 主執行函數
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('\n❌ 請提供 CodePen URL');
    console.log('使用方式: node analyze-codepen.js [CodePen URL]');
    console.log('範例: node analyze-codepen.js https://codepen.io/Ma5a/pen/yyYEoZo');
    return;
  }
  
  if (!url.includes('codepen.io')) {
    console.log('\n⚠️  請確認這是一個有效的 CodePen URL');
    return;
  }
  
  try {
    await analyzeCodePen(url);
    console.log('\n✅ 分析完成！');
    console.log('\n💡 提示: 如果需要查看完整代碼，請編輯此檔案將 showFullCode 設為 true');
  } catch (error) {
    console.error('\n❌ 分析過程中發生錯誤:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeCodePen };