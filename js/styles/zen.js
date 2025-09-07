/**
 * Zen Style Configuration
 * 組合: [明亮, 正式, 寬鬆, 平面] - 極簡優雅的風格
 */

import { Light } from '../dimensions/colors.js';
import { Formal } from '../dimensions/typography.js';
import { Loose } from '../dimensions/spacing.js';
import { Flat } from '../dimensions/effects.js';

export default {
  id: 'zen',
  name: 'Zen 極簡風格',
  description: '極簡主義設計，溫暖米色調，專注內容閱讀體驗',
  icon: '🧘',
  category: 'minimal',
  
  // 四個維度的組合
  dimensions: [Light, Formal, Loose, Flat],
  
  // 頁面 URL
  url: 'pages/zen.html',
  buttonText: '體驗 Zen 風格 →',
  
  // 特殊的顏色配置 (覆蓋維度預設值)
  customColors: {
    primary: '#f59e0b',      // zen-gold
    primaryLight: '#fbbf24', // zen-gold-light  
    accent: '#f59e0b',
    gradientFrom: 'from-yellow-50',
    gradientTo: 'to-yellow-100'
  },
  
  // 卡片專用樣式配置
  cardStyle: {
    background: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    hover: 'hover:shadow-xl hover:-translate-y-2',
    transition: 'transition-all duration-300',
    border: 'border border-yellow-200/50',
    iconBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  },
  
  // 按鈕樣式配置
  buttonStyle: {
    primary: 'bg-yellow-500 text-white hover:bg-yellow-600',
    secondary: 'bg-transparent border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
  },

  // Google Fonts (從 Typography 維度繼承並可擴展)
  additionalFonts: [],
  
  // 這個風格的維度特性描述
  characteristics: {
    brightness: 'light',   // 明亮
    typography: 'formal',  // 正式 
    spacing: 'loose',      // 寬鬆
    effects: 'flat'        // 平面
  }
};