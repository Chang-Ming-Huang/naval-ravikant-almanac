/**
 * Style Registry System - 風格註冊系統
 * 管理所有可用的風格並提供統一的 API
 */

class StyleRegistry {
  constructor() {
    this.styles = new Map();
    this.initialized = false;
  }

  /**
   * 註冊一個風格
   * @param {Object} styleConfig - 風格配置物件
   */
  register(styleConfig) {
    if (!styleConfig.id) {
      throw new Error('Style must have an id');
    }
    
    // 驗證必要欄位
    const requiredFields = ['id', 'name', 'dimensions', 'icon', 'url'];
    for (const field of requiredFields) {
      if (!styleConfig[field]) {
        console.warn(`Style ${styleConfig.id} is missing required field: ${field}`);
      }
    }

    this.styles.set(styleConfig.id, styleConfig);
    // console.log(`✓ Style registered: ${styleConfig.id} - ${styleConfig.name}`);
  }

  /**
   * 批量註冊風格
   * @param {Array} styleConfigs - 風格配置陣列
   */
  registerMultiple(styleConfigs) {
    styleConfigs.forEach(config => this.register(config));
  }

  /**
   * 獲取指定風格
   * @param {string} styleId - 風格 ID
   * @returns {Object|null} 風格配置物件
   */
  getStyle(styleId) {
    return this.styles.get(styleId) || null;
  }

  /**
   * 獲取所有風格
   * @returns {Array} 所有風格的陣列
   */
  getAllStyles() {
    return Array.from(this.styles.values());
  }

  /**
   * 獲取風格 ID 列表
   * @returns {Array} 風格 ID 陣列
   */
  getStyleIds() {
    return Array.from(this.styles.keys());
  }

  /**
   * 按分類篩選風格
   * @param {string} category - 分類名稱
   * @returns {Array} 符合分類的風格陣列
   */
  getStylesByCategory(category) {
    return this.getAllStyles().filter(style => style.category === category);
  }

  /**
   * 檢查風格是否存在
   * @param {string} styleId - 風格 ID
   * @returns {boolean} 是否存在
   */
  hasStyle(styleId) {
    return this.styles.has(styleId);
  }

  /**
   * 移除風格
   * @param {string} styleId - 風格 ID
   */
  unregister(styleId) {
    const removed = this.styles.delete(styleId);
    if (removed) {
      console.log(`✓ Style unregistered: ${styleId}`);
    }
    return removed;
  }

  /**
   * 清空所有風格
   */
  clear() {
    this.styles.clear();
    this.initialized = false;
    console.log('✓ All styles cleared');
  }

  /**
   * 生成風格的完整 CSS 類名
   * @param {string} styleId - 風格 ID
   * @returns {Object} CSS 類名物件
   */
  generateCSSClasses(styleId) {
    const style = this.getStyle(styleId);
    if (!style) {
      console.warn(`Style not found: ${styleId}`);
      return {};
    }

    const classes = {};
    
    // 合併所有維度的 Tailwind 類名
    style.dimensions.forEach(dimension => {
      if (dimension.tailwindClasses) {
        Object.assign(classes, dimension.tailwindClasses);
      }
    });

    return classes;
  }

  /**
   * 生成風格的完整 CSS 變數
   * @param {string} styleId - 風格 ID
   * @returns {Object} CSS 變數物件
   */
  generateCSSVars(styleId) {
    const style = this.getStyle(styleId);
    if (!style) {
      console.warn(`Style not found: ${styleId}`);
      return {};
    }

    const vars = {};
    
    // 合併所有維度的 CSS 變數
    style.dimensions.forEach(dimension => {
      if (dimension.cssVars) {
        Object.assign(vars, dimension.cssVars);
      }
    });

    return vars;
  }

  /**
   * 將 CSS 變數應用到 DOM
   * @param {string} styleId - 風格 ID
   * @param {HTMLElement} target - 目標元素 (預設為 document.documentElement)
   */
  applyCSSVars(styleId, target = document.documentElement) {
    const vars = this.generateCSSVars(styleId);
    
    Object.entries(vars).forEach(([property, value]) => {
      target.style.setProperty(property, value);
    });

    console.log(`✓ CSS variables applied for style: ${styleId}`);
  }

  /**
   * 獲取風格統計資訊
   * @returns {Object} 統計資訊
   */
  getStats() {
    const styles = this.getAllStyles();
    const categories = {};
    
    styles.forEach(style => {
      if (style.category) {
        categories[style.category] = (categories[style.category] || 0) + 1;
      }
    });

    return {
      total: styles.length,
      categories: categories,
      initialized: this.initialized
    };
  }

  /**
   * 初始化風格註冊系統
   * @returns {Promise} 初始化 Promise
   */
  async init() {
    if (this.initialized) {
      // console.log('Style registry already initialized');
      return;
    }

    try {
      // 這裡會載入所有風格配置
      // 現階段先標記為已初始化，具體風格會在其他地方註冊
      this.initialized = true;
      // console.log('✓ Style registry initialized');
    } catch (error) {
      console.error('Failed to initialize style registry:', error);
      throw error;
    }
  }
}

// 創建全域單例
const styleRegistry = new StyleRegistry();

// 匯出單例和類別
export default styleRegistry;
export { StyleRegistry };

// 如果在瀏覽器環境中，也將其掛載到 window 對象上
if (typeof window !== 'undefined') {
  window.styleRegistry = styleRegistry;
}