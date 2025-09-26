/**
 * Styles Index - 統一管理和註冊所有風格
 */

import styleRegistry from '../core/style-registry.js';
import zenStyle from './zen.js';
import luxuryStyle from './luxury.js';
import techStyle from './tech.js';
import retroStyle from './retro.js';
import academicStyle from './academic.js';
import corporateStyle from './corporate.js';
import undergroundStyle from './underground.js';
import playfulStyle from './playful.js';
import modernStyle from './modern.js';
import editorialStyle from './editorial.js';
import businessStyle from './business.js';
import creativeStyle from './creative.js';
import gamingStyle from './gaming.js';
import professionalStyle from './professional.js';
import executiveStyle from './executive.js';
import galleryStyle from './gallery.js';

/**
 * 初始化並註冊所有風格
 */
export async function initializeStyles() {
  try {
    // 初始化風格註冊系統
    await styleRegistry.init();
    
    // 註冊所有現有的風格
    const styles = [
      zenStyle,
      luxuryStyle,
      techStyle,
      retroStyle,
      academicStyle,
      corporateStyle,
      undergroundStyle,
      playfulStyle,
      modernStyle,
      editorialStyle,
      businessStyle,
      creativeStyle,
      gamingStyle,
      professionalStyle,
      executiveStyle,
      galleryStyle
    ];
    
    styleRegistry.registerMultiple(styles);
    
    // 輸出註冊統計
    const stats = styleRegistry.getStats();
    console.log(`✅ Styles initialized: ${stats.total} styles registered`);
    console.log('Categories:', stats.categories);
    
    return styleRegistry;
  } catch (error) {
    console.error('❌ Failed to initialize styles:', error);
    throw error;
  }
}

/**
 * 獲取所有可用風格 (用於 index.html)
 */
export function getAllStyles() {
  return styleRegistry.getAllStyles();
}

/**
 * 獲取指定風格配置
 */
export function getStyle(styleId) {
  return styleRegistry.getStyle(styleId);
}

/**
 * 按分類獲取風格
 */
export function getStylesByCategory(category) {
  return styleRegistry.getStylesByCategory(category);
}

/**
 * 應用風格的 CSS 變數到頁面
 */
export function applyStyleVars(styleId) {
  return styleRegistry.applyCSSVars(styleId);
}

/**
 * 生成風格的 CSS 類名
 */
export function generateStyleClasses(styleId) {
  return styleRegistry.generateCSSClasses(styleId);
}

// 預設匯出風格註冊器
export default styleRegistry;

// 自動初始化 (如果在瀏覽器環境中)
if (typeof window !== 'undefined') {
  // 當 DOM 載入完成時自動初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStyles);
  } else {
    // 如果 DOM 已經載入完成，立即初始化
    initializeStyles().catch(console.error);
  }
  
  // 將主要函數掛載到 window 對象上，方便其他腳本使用
  window.styleSystem = {
    getAllStyles,
    getStyle,
    getStylesByCategory,
    applyStyleVars,
    generateStyleClasses,
    registry: styleRegistry
  };
}